import { createRef, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import draftToMarkdown from "draftjs-to-markdown";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function createPost() {
  const postTitleRef = useRef("");

  const postThumbnailRef = useRef(null);

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  // const onEditorStateChange = (e) => {
  //   setEditorState(e);
  // };

  const submit = async () => {
    const apiBaseUrl = "http://localhost:1337";

    const postTitle = postTitleRef.current.value;

    const postThumbnail = postThumbnailRef.current.files[0];

    const formData = new FormData();
    formData.append("files", postThumbnail);
    try {
      const uploadRes = await axios.post(`${apiBaseUrl}/upload`, formData, {
        headers: {
          Authorization:
            "Bearer 75d6251a970ae2df91155ef73012b391bae96e1a721dec76144bdabddc95c2aada9d4ea4d07f19b3bf49f4e5a6cc0a4a657b4be1b0b07a3351a834c1be075803bbe335c790887983e46bd85486ce7d0c3363457e3eaa218f0791cabf5fd72bca10f760e4d41032ef3ef16a61a03bd2ce0fe3a7e4649efe894f7efb07702a362e",
        },
      });
      console.log(uploadRes);
      const imageId = uploadRes.data[0].id;

      const postContent = draftToMarkdown(
        convertToRaw(editorState.getCurrentContent())
      );

      const res = await axios.post(
        `${apiBaseUrl}/api/blogs`,
        {
          data: {
            title: postTitle,
            content: postContent,
            thumbnail: imageId,
          },
        },
        {
          headers: {
            Authorization:
              "Bearer 75d6251a970ae2df91155ef73012b391bae96e1a721dec76144bdabddc95c2aada9d4ea4d07f19b3bf49f4e5a6cc0a4a657b4be1b0b07a3351a834c1be075803bbe335c790887983e46bd85486ce7d0c3363457e3eaa218f0791cabf5fd72bca10f760e4d41032ef3ef16a61a03bd2ce0fe3a7e4649efe894f7efb07702a362e",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-post px-4 py-8">
      <p>This is the create post page!</p>
      <FormControl>
        <FormLabel>Post Title</FormLabel>
        <Input type="text" ref={postTitleRef} />
      </FormControl>
      <FormControl>
        <FormLabel>Thumbnail</FormLabel>
        <Input type="file" ref={postThumbnailRef} />
      </FormControl>
      {/* <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      /> */}
      <button onClick={submit}>Submit</button>
    </div>
  );
}
