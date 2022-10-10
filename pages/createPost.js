import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function createPost() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (e) => {
    setEditorState(e);
  };

  const submit = () => {
    console.log(convertToHTML(editorState.getCurrentContent()));
  }

  return (
    <div className="create-post px-4 py-8">
      <p>This is the create post page!</p>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
