import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function BlogDetail({ apiBaseUrl, post }) {
  return (
    <motion.div
      layout
      className="detail py-4 px-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <img
        className="thumbnail rounded-xl h-96 w-full object-cover"
        src={apiBaseUrl + post.data.attributes.thumbnail.data.attributes.url}
      />
      <p className="text-4xl font-bold mt-4">{post.data.attributes.title}</p>
      <ReactMarkdown
        className="mt-4"
        children={post.data.attributes.content}
        escapedhtml={false}
      />
    </motion.div>
  );
}

export async function getStaticProps({ params }) {
  const apiBaseUrl = "http://localhost:1337";
  const res = await fetch(`${apiBaseUrl}/api/blogs/${params.id}?populate=*`, {
    headers: {
      Authorization:
        "Bearer 75d6251a970ae2df91155ef73012b391bae96e1a721dec76144bdabddc95c2aada9d4ea4d07f19b3bf49f4e5a6cc0a4a657b4be1b0b07a3351a834c1be075803bbe335c790887983e46bd85486ce7d0c3363457e3eaa218f0791cabf5fd72bca10f760e4d41032ef3ef16a61a03bd2ce0fe3a7e4649efe894f7efb07702a362e",
    },
  });
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
        "Bearer 97b096bd56ef183d13f73ef83431a7f7dcd98641d92335b442bf94a3f907087bf5b7be79da0100e24b74261aeb68311cf49f403eb34e8a69f3176d6395f5f6843f56920d247e539d4d9afdc0db14b4a34530f36a70aef7c185eb0bf2bec190317954f6f8d6cc844a8204f56f58ff1e3fbd1c4d3e4c8ca2f9bf4a1cc629f0345b",
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
