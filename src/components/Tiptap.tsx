import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Props = {
  content: string;
};

const Tiptap = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="space-x-2 bg-white text-black"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            strike
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleList('bullet_list', 'list_item')
                .run()
            }
            className={editor.isActive('ul') ? 'is-active' : ''}
          >
            ul
          </button>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        className="unreset bg-white text-black p-1"
      />
    </>
  );
};

export default Tiptap;
