import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type RichTextEditorProps = {
  content: string;
  onChange: (html: string) => void;
};

function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none min-h-[260px] leading-relaxed",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  return (
    <div className="border border-sand rounded-md px-4 py-3 min-h-75 focus-within:ring-2 focus-within:ring-moss">
      <EditorContent editor={editor} />
    </div>
  );
}

export default RichTextEditor;
