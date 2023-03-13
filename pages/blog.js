import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heading,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Home({ apiBaseUrl, posts }) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [filtererdPosts, setFilteredPosts] = useState(posts);

  const toPostDetail = (id) => {
    router.push(`/post/${id}`);
  };

  useEffect(() => {
    console.log(filtererdPosts);
    const newFilteredPosts = posts.filter((post) => {
      return (
        post.attributes.title.includes(query) ||
        post.attributes.content.includes(query)
      );
    });
    console.log("newFilteredPosts=", newFilteredPosts);
    setFilteredPosts(newFilteredPosts);
  }, [query, setFilteredPosts]);

  return (
    <div className="home">
      <div className="page-content">
        <div className="posts-section">
          <Heading className="text-4xl mb-4 font-bold">Posts</Heading>
          <InputGroup mb="8">
            <Input
              placeholder="Search for a post..."
              onInput={(e) => setQuery(e.target.value)}
            />
            <InputRightElement children={<SearchIcon color="green.500" />} />
          </InputGroup>

          <div className="posts-list grid lg:grid-cols-2 gap-8 sm:grid-cols-1 place-items-center">
            <AnimatePresence>
              {filtererdPosts.length > 0 &&
                filtererdPosts.map((post) => (
                  <Box
                    key={post.id}
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="lg"
                    _dark={{
                      boxShadow:
                        "0 10px 15px -3px rgba(255, 255, 255, 0.1),0 4px 6px -2px rgba(255, 255, 255, 0.05);",
                    }}
                  >
                    <motion.div
                      layout
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="post cursor-pointer auto-rows-auto w-[80vw] max-w-[30rem] duration-300"
                      onClick={() => toPostDetail(post.id)}
                    >
                      <div className="thumbnail h-60 w-full object-cover overflow-hidden">
                        <Image
                          className="w-full h-full hover:scale-125 duration-300"
                          src={
                            apiBaseUrl +
                            post.attributes.thumbnail.data?.attributes.url
                          }
                          fallbackSrc="https://via.placeholder.com/150"
                        ></Image>
                      </div>
                      <div className="post-card-body p-4">
                        <h3 className="title text-lg font-bold mb-2">
                          {post.attributes.title}
                        </h3>
                        <p className="content mb-2 truncate">
                          {post.attributes.content}
                        </p>
                      </div>
                    </motion.div>
                  </Box>
                ))}
            </AnimatePresence>
          </div>
          {filtererdPosts.length == 0 && <p>No posts found!</p>}
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
        "Bearer 75d6251a970ae2df91155ef73012b391bae96e1a721dec76144bdabddc95c2aada9d4ea4d07f19b3bf49f4e5a6cc0a4a657b4be1b0b07a3351a834c1be075803bbe335c790887983e46bd85486ce7d0c3363457e3eaa218f0791cabf5fd72bca10f760e4d41032ef3ef16a61a03bd2ce0fe3a7e4649efe894f7efb07702a362e",
    },
  });

  console.log(res);
  const response = await res.json();
  const posts = response.data;

  return {
    props: {
      apiBaseUrl,
      posts,
    },
  };
}
