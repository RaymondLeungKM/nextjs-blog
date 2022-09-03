import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";

export default function Home({ apiBaseUrl, posts }) {
  const router = useRouter();

  const toPostDetail = (id) => {
    router.push(`/post/${id}`);
  };

  return (
    <div className="home py-4 px-8">
      <div className="page-content">
        <div className="posts-section">
          <h2 className="text-4xl mb-4 font-bold">Posts</h2>
          <motion.div
            className="posts-list grid grid-cols-2 gap-8 sm:grid-cols-1"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
          >
            {posts.data.map((post) => (
              <div
                className="post cursor-pointer auto-rows-auto w-full"
                key={post.id}
                onClick={() => toPostDetail(post.id)}
              >
                <h3 className="title text-lg font-bold mb-2">
                  {post.attributes.title}
                </h3>
                <p className="content mb-2 truncate">
                  {post.attributes.content}
                </p>
                <div className="thumbnail rounded-xl h-96 w-full object-cover overflow-hidden">
                  <img
                    className="w-full h-full hover:scale-150 duration-500"
                    src={
                      apiBaseUrl + post.attributes.thumbnail.data.attributes.url
                    }
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const apiBaseUrl = "http://localhost:1337";
  const res = await fetch(`${apiBaseUrl}/api/blogs?populate=*`, {
    headers: {
      Authorization:
        "Bearer 97b096bd56ef183d13f73ef83431a7f7dcd98641d92335b442bf94a3f907087bf5b7be79da0100e24b74261aeb68311cf49f403eb34e8a69f3176d6395f5f6843f56920d247e539d4d9afdc0db14b4a34530f36a70aef7c185eb0bf2bec190317954f6f8d6cc844a8204f56f58ff1e3fbd1c4d3e4c8ca2f9bf4a1cc629f0345b",
    },
  });
  const posts = await res.json();

  return {
    props: {
      apiBaseUrl,
      posts,
    },
  };
}
