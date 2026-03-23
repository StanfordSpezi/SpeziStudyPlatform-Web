//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button, Separator } from "@stanfordspezi/spezi-web-design-system";
import { EditorContent, useEditor, type Storage } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Minus,
} from "lucide-react";
import { useEffect, type ComponentProps } from "react";
import { Markdown } from "tiptap-markdown";
import { cn } from "@/utils/cn";

interface ToggleProps extends Omit<
  ComponentProps<typeof Button>,
  "variant" | "size" | "onClick"
> {
  pressed?: boolean;
  onPressedChange?: () => void;
}

const Toggle = ({
  pressed,
  onPressedChange,
  className,
  ...props
}: ToggleProps) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={onPressedChange}
      className={cn(
        "[&_svg]:size-4 [&_svg]:opacity-80",
        pressed && "bg-fill-tertiary",
        className,
      )}
      {...props}
    />
  );
};

interface MarkdownStorage extends Storage {
  markdown: { getMarkdown: () => string };
}

interface MarkdownEditorProps extends Omit<ComponentProps<"div">, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

export const MarkdownEditor = ({
  value,
  onChange,
  className,
  ...props
}: MarkdownEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: value,
    onUpdate: ({ editor }) => {
      const storage = editor.storage as MarkdownStorage;
      const markdown = storage.markdown.getMarkdown();
      onChange?.(markdown);
    },
    editorProps: {
      attributes: {
        class: cn(
          "min-h-44 p-4 outline-none whitespace-pre-wrap",
          "[&_strong]:font-semibold",
          "[&_ul]:list-disc [&_ul]:my-1 [&_ul]:pl-4",
          "[&_ol]:list-decimal [&_ol]:my-1 [&_ol]:pl-4",
          "[&_li]:marker:text-text-tertiary",
          "[&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:mb-1 [&_h1]:text-text",
          "[&_h2]:text-xl [&_h2]:font-medium [&_h2]:mb-1",
          "[&_h3]:text-lg [&_h3]:mb-1",
        ),
      },
    },
  });

  useEffect(() => {
    if (editor.isEmpty) {
      editor.commands.setContent(value ?? "");
    }
  }, [value, editor]);

  return (
    <div
      className={cn(
        "border-border bg-fill-secondary flex min-h-20 w-full flex-col rounded-md border text-sm",
        "placeholder:text-text-tertiary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Ring offset styles
        "has-[.ProseMirror:focus]:ring-offset-surface has-[.ProseMirror:focus]:ring-ring has-[.ProseMirror:focus]:ring-2 has-[.ProseMirror:focus]:ring-offset-2",
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-1 border-b p-2">
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Bold />
        </Toggle>

        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <Italic />
        </Toggle>

        <Toggle
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </Toggle>

        <Toggle
          pressed={editor.isActive("code")}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
        >
          <Code />
        </Toggle>
        <Separator orientation="vertical" className="h-6" />
        <Toggle
          pressed={editor.isActive("heading", { level: 1 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 />
        </Toggle>

        <Toggle
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 />
        </Toggle>

        <Toggle
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 />
        </Toggle>
        <Separator orientation="vertical" className="h-6" />
        <Toggle
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List />
        </Toggle>

        <Toggle
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered />
        </Toggle>
        <Separator orientation="vertical" className="h-6" />
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="size-4 opacity-80" />
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};
