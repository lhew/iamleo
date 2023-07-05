import React, { useCallback, useMemo } from "react";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import classNames from "classnames";
import {
  Transforms,
  createEditor,
  Node,
  Element as SlateElement,
  Descendant,
  Editor,
} from "slate";
import { withHistory } from "slate-history";

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <button
      className={classNames("w-12 inline-block  btn btn-secondary", {
        "opacity-60": isMarkActive(editor, format),
      })}
      onMouseDown={(event) => {
        event.preventDefault();
        console.log("caralho");
        toggleMark(editor, format);
      }}
    >
      {children}
    </button>
  );
};

const TEXT_ALIGN_TYPES = ["left", "center", "right"];
const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const BlockButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <button
      className={classNames("w-12 inline-block  btn btn-secondary", {
        "opacity-60": isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
        ),
      })}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {children}
    </button>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul
          style={style}
          {...attributes}
          className={classNames(attributes.className, "list-disc")}
        >
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1
          style={style}
          {...attributes}
          className={classNames(attributes.className, "text-5xl")}
        >
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2
          style={style}
          {...attributes}
          className={classNames(attributes.className, "text-4xl")}
        >
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3
          style={style}
          {...attributes}
          className={classNames(attributes.className, "text-3xl")}
        >
          {children}
        </h3>
      );

    case "heading-four":
      return (
        <h4
          style={style}
          {...attributes}
          className={classNames(attributes.className, "text-2xl")}
        >
          {children}
        </h4>
      );

    case "heading-five":
      return (
        <h5
          style={style}
          {...attributes}
          className={classNames(attributes.className, "text-xl")}
        >
          {children}
        </h5>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol
          style={style}
          {...attributes}
          className={classNames(attributes.className, "list-decimal")}
        >
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export const TextEditor = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div className="flex gap-2">
        <MarkButton format="bold">
          <strong>B</strong>
        </MarkButton>
        <MarkButton format="italic">
          <em>I</em>
        </MarkButton>
        <MarkButton format="underline">
          <u>U</u>
        </MarkButton>
        <MarkButton format="code">
          <code>x</code>
        </MarkButton>
        <BlockButton format="heading-one">H1</BlockButton>
        <BlockButton format="heading-two">H2</BlockButton>
        <BlockButton format="heading-three">H3</BlockButton>
        <BlockButton format="heading-four">H4</BlockButton>
        <BlockButton format="heading-five">H5</BlockButton>
        <BlockButton format="paragraph">P</BlockButton>
        <BlockButton format="block-quote">{'"'}</BlockButton>
        <BlockButton format="numbered-list">OL</BlockButton>
        <BlockButton format="bulleted-list">UL</BlockButton>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter a title…"
        spellCheck
        autoFocus
      />
      <button className="btn btn-secondary">Save</button>
    </Slate>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];
