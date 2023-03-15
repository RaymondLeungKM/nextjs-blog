import { createRef, useEffect, useRef, useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import draftToMarkdown from "draftjs-to-markdown";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Button,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { set } from "immutable";
// import { Editor } from "react-draft-wysiwyg";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
// import draftToMarkdown from "draftjs-to-markdown";
// const draftToMarkdown = dynamic(
//   () => import("draftjs-to-markdown"),
//   { ssr: false }
// )

export default function createPost() {
  const router = useRouter();

  const toast = useToast();

  const postTitleRef = useRef("");

  const postThumbnailRef = useRef(null);
  const [postThumbnail, setPostThumbnail] = useState(null);
  const [imagePlaceholder, setImagePlaceholder] = useState("");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (e) => {
    setEditorState(e);
  };

  const handleUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPostThumbnail(undefined);
      return;
    }
    setPostThumbnail(e.target.files[0]);
  };

  const clearPostThumbnail = () => {
    postThumbnailRef.current.value = "";
    setImagePlaceholder(null);
    setPostThumbnail(undefined);
  }

  const submit = async () => {
    const apiBaseUrl = "http://localhost:1337";

    const postTitle = postTitleRef.current.value;

    // const postThumbnail = postThumbnailRef.current.files[0];

    const formData = new FormData();
    formData.append("files", postThumbnail);
    try {
      const uploadRes = await axios.post(`${apiBaseUrl}/api/upload`, formData, {
        headers: {
          Authorization:
            "Bearer 31aa07d5c4e57eaea338c3091acd9c1d5d1bd046374c5a1f2841d154c56ff8baab69fa8257a9501b868c3d87372cf37589a97f66178030fbc39dc3efd834c5e6c22df6a5e8623d0e93a411efee874429100b86927ac09b7eafa42b3d5254df639303e321e842d8b862c540d2865e64f6780791900a21891a7c2e312edd7e34c1",
        },
      });
      // console.log(uploadRes);

      if (uploadRes.status == 200) {
        const imageId = uploadRes.data[0].id;

        const draftToMarkdown = (await import("draftjs-to-markdown")).default;

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
                "Bearer 31aa07d5c4e57eaea338c3091acd9c1d5d1bd046374c5a1f2841d154c56ff8baab69fa8257a9501b868c3d87372cf37589a97f66178030fbc39dc3efd834c5e6c22df6a5e8623d0e93a411efee874429100b86927ac09b7eafa42b3d5254df639303e321e842d8b862c540d2865e64f6780791900a21891a7c2e312edd7e34c1",
            },
          }
        );

        if (res.status == 200) {
          // Add a toast message for notifying the user of successful post creation
          toast({
            title: "Post Created Successfully",
            description: "You have created the new post successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });

          // router.push("/blog");
          // console.log(res);
          router.push(`/post/${res.data.data.id}`);
        } else {
          throw new Error("Create new post failed");
        }
      } else {
        throw new Error("Upload Failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editorUploadImageCallBack = (file) => {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.
    
   // Make sure you have a uploadImages: [] as your default state
    let uploadedImages = this.state.uploadedImages;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }

    uploadedImages.push(imageObject);

    // this.setState(uploadedImages: uploadedImages)
    
    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imageObject.localSrc } });
      }
    );
  }

  useEffect(() => {
    if (postThumbnail) {
      // create the preview
      const objectUrl = URL.createObjectURL(postThumbnail);
      setImagePlaceholder(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [postThumbnail]);

  return (
    <div className="create-post px-4 py-8">
      <Heading>Create a New Post</Heading>
      <FormControl className="mt-4">
        <FormLabel>Post Title</FormLabel>
        <Input type="text" ref={postTitleRef} />
      </FormControl>
      <FormControl className="mt-4 image-upload">
        <FormLabel>Thumbnail</FormLabel>
        <Input type="file" onChange={handleUpload} ref={postThumbnailRef}></Input>
        <Image
          src={
            imagePlaceholder
              ? imagePlaceholder
              : "/static/images/image-placeholder.png"
          }
        ></Image>
        {postThumbnail ? <Button onClick={clearPostThumbnail}>Clear Post Thumbnail</Button>:<Text>Drag and drop your image here!</Text>}
      </FormControl>
      <Box className="mt-4">
        <Editor
          editorState={editorState}
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-editor"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            image: {
              uploadCallback: editorUploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            }
          }}
        />
        <Button onClick={submit}>Submit</Button>
      </Box>
    </div>
  );
}
