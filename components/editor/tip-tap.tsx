"use client";

import "@/app/builder/style.css";
import { useEditor, EditorContent } from "@tiptap/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Toolbar from "@/components/editor/toolbar";
import Heading from "@tiptap/extension-heading";

export default function Tiptap() {
    const form = useForm({
        mode: "onChange",
        defaultValues: {
            title: "Blog Title",
            content: "Hello World 🌎️",
        },
    });
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            Color,
            TextStyle,
            Underline,
            Highlight,
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
        ],
        editorProps: {
            attributes: {
                class: "w-screen h-64 mx-auto my-2 rounded border border-gray-300 focus:outline-none  p-2",
            },
        },
        content: "Hello World! 🌎️",
    });

    if (!editor) {
        return null;
    }

    return (
        <>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </>
    );
}
