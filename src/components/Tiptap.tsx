import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaStrikethrough,
} from 'react-icons/fa';

const buttons = [
  {
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    icon: <FaBold />,
    tag: 'bold',
  },
  {
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    icon: <FaItalic />,
    tag: 'italic',
  },
  {
    action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    icon: <FaStrikethrough />,
    tag: 'strike',
  },
  {
    action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    icon: <FaListUl />,
    tag: 'ul',
  },
  {
    action: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
    icon: <FaListOl />,
    tag: 'ol',
  },
];

type Props = {
  content: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const Tiptap = ({ content, setText }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      setText(editor.getHTML());
    },
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-white text-black"
        >
          {buttons.map((button) => (
            <button
              onClick={() => button.action(editor)}
              className={`p-2 hover:bg-[#f1f1f1] ${
                editor.isActive(button.tag) ? 'is-active' : ''
              }`}
            >
              {button.icon}
            </button>
          ))}
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="unreset  p-1" />
    </>
  );
};

export default Tiptap;
