"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ReactElement, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useToast } from "@/components/ui/use-toast";
import { BlogPosts } from "@prisma/client";
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";
import BlogTitle from "@/components/editor/blog-title";
import TipTap from "@/components/editor/tip-tap";

export default function BlogBuilder({ params }: { params: { id: string } }): ReactElement {
    const [mounted, setMounted] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();
    const { toast } = useToast();

    const TipTapClient = dynamic(() => import("@/components/editor/tip-tap"), { ssr: false });

    const FormSchema = z.object({
        blogTitle: z
            .string()
            .min(4, { message: "Title must be at least 4 characters" })
            .max(32, { message: "Title must be less than 32 characters" }),
        blogPost: z
            .string()
            .min(20, { message: "Blog post must be at least 20 characters" })
            .max(20000)
            .trim(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "all",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            blogTitle: "Add a title!",
            blogPost: "Hello World! 🌎️",
        },
    });

    useEffect(() => {
        async function fetchBlogById(blogId: string) {
            const res = await fetch(`/api/blogs/${blogId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return await res.json();
        }

        if (params.id && mounted) {
            fetchBlogById(params.id[0])
                .then((res) => {
                    const blogPost: BlogPosts = res.data as BlogPosts;
                    if (blogPost) {
                        form.setValue("blogTitle", res.blogTitle);
                        form.setValue("blogPost", res.blogPost);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast({
                        title: "Oops!",
                        description: "Something went wrong!",
                        variant: "destructive",
                    });
                });
        }

        return () => {
            setMounted(false);
        };
    }, [params.id, form, mounted, toast]);

    useEffect(() => {
        setMounted(true);
    }, []);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const sanitizedPost = DOMPurify.sanitize(data.blogPost, {
            USE_PROFILES: { html: true },
        });
        const response: Response = await fetch("/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                blogTitle: data.blogTitle,
                blogPost: sanitizedPost,
            }),
        });

        if (response.ok) {
            toast({
                title: "Success!",
                description: "You have successfully saved your blog 🚀",
                className: "bg-[#6cc070]",
            });
        } else if (response.status === 400 || response.status === 500 || response.status === 401) {
            toast({
                title: "Oops!",
                description: "Something went wrong!",
                variant: "destructive",
            });
        }

        router.push("/blogs");
    }

    function handleTitleClick(): void {
        const watcher: string = form.watch("blogTitle");

        if (watcher.length < 4) {
            return;
        }

        setEditable(!editable);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {editable ? (
                    <div className="sm:w-3/5 w-5/5 my-3 sm:mx-auto mx-4 flex h-fit">
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="blogTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter a blog title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="ml-2">
                            <Button variant={"outline"} onClick={handleTitleClick}>
                                <Check />
                            </Button>
                        </div>
                    </div>
                ) : null}
                {!editable ? (
                    <div
                        onClick={() => setEditable(true)}
                        className="sm:w-2/5 w-5/5 h-fit my-4 sm:mx-auto mx-4 cursor-pointer hover:outline outline-1 outline-offset-8 outline-zinc-800 rounded"
                    >
                        <BlogTitle blogTitle={form.getValues().blogTitle} />
                    </div>
                ) : null}
                <div className="w-5/5 sm:w-4/5 sm:mx-auto mx-2">
                    <FormField
                        control={form.control}
                        name="blogPost"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <TipTapClient
                                        blogPost={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-right" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-4/5 mx-auto flex justify-end items-center">
                    <Button
                        size={"lg"}
                        type="submit"
                        variant="secondary"
                        className="py-1 text-white hover:bg-green-400 hover:text-black"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
