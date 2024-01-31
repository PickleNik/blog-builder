import { Button } from "@/components/ui/button";
import {
    FaCode,
    FaLink,
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaSubscript,
    FaSuperscript,
} from "react-icons/fa";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { MdFormatUnderlined } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { AiFillPicture } from "react-icons/ai";
import { useCallback } from "react";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

export default function Toolbar({ editor }: any) {
    const addImage = useCallback(() => {
        const url = window.prompt("URL");

        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        editor
            ?.chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    return (
        <div className="w-full h-12 flex flex-nowrap justify-center items-center">
            {/* HEADING 1 */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size="sm"
                        variant={"outline"}
                        aria-label="Toggle Heading 1"
                        className={
                            editor.isActive("heading", { level: 1 })
                                ? "is-active ml-1"
                                : "ml-1"
                        }
                        pressed={editor.isActive("heading")}
                        onPressedChange={() => {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 1 })
                                .run();
                        }}
                    >
                        <LuHeading1 />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Heading 1</TooltipContent>
            </Tooltip>
            {/* HEADING 2 */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Heading 2"
                        pressed={editor.isActive("heading", { level: 2 })}
                        className={
                            editor.isActive("heading", { level: 2 })
                                ? "is-active ml-1"
                                : "ml-1"
                        }
                        onPressedChange={() => {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run();
                        }}
                    >
                        <LuHeading2 />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Heading 2</TooltipContent>
            </Tooltip>
            {/* HEADING 3 */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Heading 3"
                        pressed={editor.isActive("heading", { level: 3 })}
                        className={
                            editor.isActive("heading", { level: 3 })
                                ? "is-active ml-1"
                                : "ml-1"
                        }
                        onPressedChange={() => {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run();
                        }}
                    >
                        <LuHeading3 />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Heading 3</TooltipContent>
            </Tooltip>
            {/* BOLD */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Bold"
                        className="ml-1"
                        pressed={editor.isActive("bold")}
                        onPressedChange={() => {
                            editor.chain().focus().toggleBold().run();
                        }}
                    >
                        <FaBold />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
            </Tooltip>
            {/* ITALIC */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Italic"
                        className="ml-1"
                        pressed={editor.isActive("italic")}
                        onPressedChange={() => {
                            editor.chain().focus().toggleItalic().run();
                        }}
                    >
                        <FaItalic />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
            </Tooltip>
            {/* UNDERLINE */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Underline"
                        className="ml-1"
                        pressed={editor.isActive("underline")}
                        onPressedChange={() => {
                            editor.chain().focus().toggleUnderline().run();
                        }}
                    >
                        <MdFormatUnderlined />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Underline</TooltipContent>
            </Tooltip>
            {/* STRIKETHROUGH */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Strikethrough"
                        className="ml-1"
                        pressed={editor.isActive("strike")}
                        onPressedChange={() => {
                            editor.chain().focus().toggleStrike().run();
                        }}
                    >
                        <FaStrikethrough />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Strikethrough</TooltipContent>
            </Tooltip>
            {/* BULLET LIST */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Bullet List"
                        className="ml-1"
                        pressed={editor.isActive("bulletList")}
                        onPressedChange={() => {
                            editor.chain().focus().toggleBulletList().run();
                        }}
                    >
                        <CiBoxList />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>
            {/* NUMBER LIST */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Number List"
                        className="ml-1"
                        pressed={editor.isActive("orderedList")}
                        onPressedChange={() => {
                            editor.chain().focus().toggleOrderedList().run();
                        }}
                    >
                        <MdFormatListNumbered />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Number List</TooltipContent>
            </Tooltip>
            {/* SUBSCRIPT */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Subscript"
                        className="ml-1"
                        pressed={editor.isActive("subscript")}
                        onPressedChange={() => {
                            editor.chain().focus().toggleSubscript().run();
                        }}
                    >
                        <FaSubscript />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Subscript</TooltipContent>
            </Tooltip>
            {/* SUPERSCRIPT */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Superscript"
                        className="ml-1"
                        pressed={editor.isActive("superscript")}
                        onPressedChange={() => {
                            editor.chain().focus().toggleSuperscript().run();
                        }}
                    >
                        <FaSuperscript />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Superscript</TooltipContent>
            </Tooltip>
            {/* LINK */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Link"
                        className="ml-1"
                        pressed={editor.isActive("link")}
                        onPressedChange={setLink}
                    >
                        <FaLink />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Insert Link</TooltipContent>
            </Tooltip>
            {/* IMAGE */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Toggle
                        size={"sm"}
                        variant={"outline"}
                        aria-label="Toggle Image"
                        className="ml-1"
                        onPressedChange={addImage}
                    >
                        <AiFillPicture />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Insert Image (from URL)</TooltipContent>
            </Tooltip>
        </div>
    );
}
