import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Box, Image, Text } from "@chakra-ui/react";

export default function BlogDetail({ apiBaseUrl, post }) {
  const comments = post.data.attributes.comments.data;

  return (
    <motion.div
      layout
      className="detail py-4 px-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Image
        className="thumbnail rounded-xl h-96 w-full object-cover"
        src={apiBaseUrl + post.data.attributes.thumbnail.data?.attributes.url}
        fallbackSrc="https://via.placeholder.com/150"
      ></Image>
      <p className="text-4xl font-bold mt-4">{post.data.attributes.title}</p>
      <ReactMarkdown
        className="mt-4"
        children={post.data.attributes.content}
        escapedhtml={false}
      />
      <Box className="comments">
        <Text>Comments:</Text>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Box key={comment.id}>
              <Text>{comment.attributes.content}</Text>
              <Text>Published at: {comment.attributes.publishedAt}</Text>
              <Text>
                Published by: {comment.attributes.user.data.attributes.username}
              </Text>
              
              {comment.attributes.child_comments.data.length > 0 && comment.attributes.child_comments.data.map(child_comment =>(
                <Box key={child_comment.id}>
                  <Text>{child_comment.attributes.content}</Text>
                  <Text>
                    Published at: {child_comment.attributes.publishedAt}
                  </Text>
                  <Text>
                    Published by:
                    {child_comment.attributes.user.data.attributes.username}
                  </Text>
                </Box>
              ))}
            </Box>
          ))}
        {comments.length == 0 && <Text>No comments yet!</Text>}
      </Box>
    </motion.div>
  );
}

export async function getStaticProps({ params }) {
  const apiBaseUrl = "http://localhost:1337";
  const res = await fetch(
    `${apiBaseUrl}/api/blogs/${params.id}?populate[0]=thumbnail&populate[1]=comments&populate[2]=comments.child_comments&populate[3]=comments.user&populate[4]=comments.child_comments.user`,
    {
      headers: {
        Authorization:
          "Bearer 75d6251a970ae2df91155ef73012b391bae96e1a721dec76144bdabddc95c2aada9d4ea4d07f19b3bf49f4e5a6cc0a4a657b4be1b0b07a3351a834c1be075803bbe335c790887983e46bd85486ce7d0c3363457e3eaa218f0791cabf5fd72bca10f760e4d41032ef3ef16a61a03bd2ce0fe3a7e4649efe894f7efb07702a362e",
      },
    }
  );
  const post = await res.json();

  return {
    props: {
      apiBaseUrl,
      post,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/blogs?populate=*", {
    headers: {
      Authorization:
        "Bearer 31aa07d5c4e57eaea338c3091acd9c1d5d1bd046374c5a1f2841d154c56ff8baab69fa8257a9501b868c3d87372cf37589a97f66178030fbc39dc3efd834c5e6c22df6a5e8623d0e93a411efee874429100b86927ac09b7eafa42b3d5254df639303e321e842d8b862c540d2865e64f6780791900a21891a7c2e312edd7e34c1",
    },
  });
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  // const paths = posts.data.map((post) => ({
  //   params: { id: post.data.id },
  // }))

  const paths = [{ params: { id: "1" } }, { params: { id: "2" } }];

  return { paths, fallback: "blocking" };
}
