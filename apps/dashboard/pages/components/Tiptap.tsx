import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import classNames from "classnames";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
  LuStrikethrough,
  LuCornerDownLeft,
  LuList,
  LuCode,
  LuBold,
  LuItalic,
  LuEraser,
  LuSeparatorHorizontal,
  LuRemoveFormatting,
  LuUndo,
  LuRedo,
  LuListOrdered,
  LuUnlink,
  LuLink,
  LuQuote,
} from "react-icons/lu";
import Link from "@tiptap/extension-link";
import { useCallback } from "react";

const MenuBar = ({ editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="gap-2">
      <button
        type="button"
        title="bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={classNames(
          editor.isActive("bold") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuBold />
      </button>
      <button
        type="button"
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={classNames(
          editor.isActive("italic") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuItalic />
      </button>
      <button
        type="button"
        title="Strike through"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={classNames(
          editor.isActive("strike") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuStrikethrough />
      </button>
      <button
        type="button"
        title="code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={classNames(
          editor.isActive("code") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuCode />
      </button>
      <button
        type="button"
        title="Clear marks"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="inline-block m-1 btn btn-small btn-secondary"
      >
        <LuRemoveFormatting />
      </button>
      <button
        type="button"
        title="Clear nodes"
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="inline-block m-1 btn btn-small btn-secondary"
      >
        <LuEraser />
      </button>

      <button
        type="button"
        title="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={classNames(
          editor.isActive("heading", { level: 1 }) ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuHeading1 />
      </button>
      <button
        type="button"
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={classNames(
          editor.isActive("heading", { level: 2 }) ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuHeading2 />
      </button>
      <button
        type="button"
        title="Heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={classNames(
          editor.isActive("heading", { level: 3 }) ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuHeading3 />
      </button>
      <button
        type="button"
        title="Heading 4"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={classNames(
          editor.isActive("heading", { level: 4 }) ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuHeading4 />
      </button>
      <button
        type="button"
        title="Heading 5"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={classNames(
          editor.isActive("heading", { level: 5 }) ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuHeading5 />
      </button>
      <button
        type="button"
        title="Heading 6"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={classNames(
          editor.isActive("heading", { level: 6 }) ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuHeading6 />
      </button>
      <button
        type="button"
        title="Unordered List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={classNames(
          editor.isActive("bulletList") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuList />
      </button>
      <button
        type="button"
        title="Ordered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={classNames(
          editor.isActive("orderedList") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuListOrdered />
      </button>
      <button
        type="button"
        title="Add link"
        onClick={setLink}
        className={classNames(
          editor.isActive("link") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuLink />
      </button>

      <button
        type="button"
        title="Remove link"
        onClick={() => editor.chain().focus().unsetLink().run()}
        className={classNames(
          !editor.isActive("link") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuUnlink />
      </button>

      <button
        type="button"
        title="Code Block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={classNames(
          editor.isActive("codeBlock") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuCode />
      </button>
      <button
        type="button"
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={classNames(
          editor.isActive("blockquote") ? "btn-disabled" : "",
          "btn btn-small btn-secondary inline-block m-1"
        )}
      >
        <LuQuote />
      </button>
      <button
        type="button"
        title="Set horizontal rule"
        className={classNames("btn btn-small btn-secondary inline-block m-1")}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <LuSeparatorHorizontal />
      </button>
      <button
        type="button"
        title="Hard break"
        className={classNames("btn btn-small btn-secondary inline-block m-1")}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <LuCornerDownLeft />
      </button>
      <button
        type="button"
        title="Undo"
        className={classNames("btn btn-small btn-secondary inline-block m-1")}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <LuUndo />
      </button>
      <button
        type="button"
        title="Redo"
        className={classNames("btn btn-small btn-secondary inline-block m-1")}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <LuRedo />
      </button>
    </div>
  );
};

const Tiptap = ({ content, onSubmit }) => {
  const editor = useEditor({
    injectCSS: false,
    content,
    extensions: [
      Link.configure({}),
      TextStyle.configure({
        HTMLAttributes: {
          types: [ListItem.name],
        },
      }),
      ListItem.configure({}),
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <hr className="my-5" />
      <div className="blog-post">
        <EditorContent editor={editor} />
        <button
          className="mt-2 btn btn-primary"
          onClick={() => {
            onSubmit(editor && editor.getHTML());
          }}
        >
          {content ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};
export default Tiptap;
