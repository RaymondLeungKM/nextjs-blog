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

          <div className="posts-list grid lg:grid-cols-2 gap-8 grid-cols-1 place-items-center">
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
                      className="post cursor-pointer auto-rows-auto w-[80vw] sm:w-[60vw] lg:w-[30vw] lg:max-w-[30rem] duration-300"
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
        "Bearer 31aa07d5c4e57eaea338c3091acd9c1d5d1bd046374c5a1f2841d154c56ff8baab69fa8257a9501b868c3d87372cf37589a97f66178030fbc39dc3efd834c5e6c22df6a5e8623d0e93a411efee874429100b86927ac09b7eafa42b3d5254df639303e321e842d8b862c540d2865e64f6780791900a21891a7c2e312edd7e34c1",
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
