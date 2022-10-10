import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Text,
  Box,
  Flex,
  Center,
  VStack,
  Divider,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
} from "@chakra-ui/react";

import { MdCheckCircle } from "react-icons/md";

export default function AboutMe({ apiBaseUrl, techStacks, softwareList }) {
  // Add photo
  // Utilize the strapi CMS as much as possible, so that we can easily add content to the page later on
  // Java: Spring, Maven, Kafka
  // Python: Django Matplotlib, Numpy, Crypto/Blockchain
  // Docker, Kubernetes
  // HTML, CSS (SASS/SCSS), JS
  // Node Express MongoDB GraphQL
  // SQL: Microsoft SQL Server, MySQL, MongoDB and Postgres SQL
  // Git GitHub, GitLab
  // Linux and Putty
  // Animation or page loading / scrolling effects? Maybe even add some interactive elements
  // Three.js? <= is that a bit unnecessary?

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const list = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const teckStack = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const list2 = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        // delayChildren: list2Delay,
        delayChildren: 1,
        staggerChildren: 0.1,
      },
    },
  };

  const workingExp = [
    {
      period: "2016 Jul - 2019 Feb",
      desc: "Multiable Company - Senior System Support Executive",
    },
    {
      period: "2019 Mar - 2020 Jul",
      desc: "Goldenway Company - System Analyst",
    },
    {
      period: "2020 Aug - Now",
      desc: "Reel Fintech Limited - Frontend Developer",
    },
  ];

  const personalities = [
    "A team-worker, can work under pressure and fast-paced environment",
    "A fast learner🧑🏻‍💻, obedient, creative, friendly",
    "Fascinated with technology, gadgets📱 and cars🚗!",
    "A Coffee Lover!!",
  ];

  const showStackDetail = (stack) => {
    if (stack.attributes.name === "Java") {
      setModalTitle("Java sub skillset");
      setModalBody(<>Sthing in here!!!</>);
      onOpen();
    }
  };

  return (
    <>
      <motion.div
        layout
        className="px-4 pt-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Heading>Something interesting about me~~</Heading>
        <Text>
          Hi, I am Raymond, a frontend developer who is working on his way to
          become a fullstack developer.
        </Text>
        <Box className="profile-pic-container absolute rounded-full h-[200px] w-[200px] overflow-hidden right-12 top-24">
          <Image
            src="/static/images/profile_pic.jpg"
            alt="profile-pic"
            width={200}
            height={266}
            priority
          />
        </Box>
        <Heading className="my-12 text-center text-5xl">
          Academic Qualifications:
        </Heading>
        <Flex className="flex flex-col items-center">
          <Text>2012-2016</Text>
          <Text className="ml-4">
            University of Hong Kong: Bachelor of Science (Majoring in Physics)
          </Text>
        </Flex>

        <Center h="100vh">
          <VStack>
            <Heading className="my-12 text-center text-5xl">
              Working Experience:
            </Heading>
            <Flex className="flex flex-col">
              {workingExp.map((exp, index) => (
                <Flex className="flex flex-col items-center" key={index}>
                  <Text>{exp.period}</Text>
                  <Text>{exp.desc}</Text>
                  {index < workingExp.length - 1 && (
                    <Divider
                      orientation="vertical"
                      minH="100px"
                      borderLeftWidth="3px"
                    />
                  )}
                </Flex>
              ))}
            </Flex>
          </VStack>
        </Center>

        <Box height="100vh">
          <Heading textAlign="center">""Technologies I know:</Heading>
          <Flex h="100%" alignItems="center">
            <motion.ul
              layout
              className="tech-stack-list grid grid-cols-3 gap-40 place-items-center w-full"
              variants={list}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {techStacks.data.map((stack) => (
                <motion.li
                  layout
                  key={stack.id}
                  className="tech-stack-item"
                  variants={teckStack}
                >
                  <Text className="text-center">{stack.attributes.name}</Text>
                  <Box
                    className="logo shadow-2xl dark:shadow-cyan-900 dark:bg-gray-900 rounded-[50%] w-40 h-40 overflow-hidden grid place-items-center hover:rounded-3xl transition-all duration-500 ease-in-out cursor-pointer"
                    onClick={() => showStackDetail(stack)}
                  >
                    <img
                      className="w-3/5 hover:scale-150 duration-500"
                      src={
                        apiBaseUrl + stack.attributes.logo.data.attributes.url
                      }
                    />
                  </Box>
                </motion.li>
              ))}
            </motion.ul>
          </Flex>
        </Box>

        <Box height="100vh">
          <Heading className="mt-12">Softwares I am familiar with:</Heading>
          <Flex h="100%" alignItems="center">
            <motion.ul
              layout
              className="software-list grid grid-cols-3 gap-4 place-items-center w-full"
              variants={list2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {softwareList.data.map((software) => (
                <motion.li
                  layout
                  key={software.id}
                  className="software-item"
                  variants={teckStack}
                >
                  <Text className="text-center">
                    {software.attributes.name}
                  </Text>
                  <Box className="logo shadow-2xl dark:shadow-cyan-900 dark:bg-gray-900 rounded-[50%] w-40 h-40 overflow-hidden grid place-items-center hover:rounded-3xl transition-all duration-500 ease-in-out">
                    <img
                      className="w-3/5 hover:scale-150 duration-500"
                      src={
                        apiBaseUrl +
                        software.attributes.logo.data.attributes.url
                      }
                    />
                  </Box>
                </motion.li>
              ))}
            </motion.ul>
          </Flex>
        </Box>

        <Box height="100vh">
          <Heading pt="4" mb="8">
            I am ...
          </Heading>
          <List>
            {personalities.map((pers) => (
              <ListItem fontSize="1.5rem" py="4">
                <ListIcon as={MdCheckCircle} color="green.500" />
                {pers}
              </ListItem>
            ))}
          </List>
          <Box className="mt-4">
            <Heading mb="8">Coffee gear wishlist:</Heading>
            <SimpleGrid className="gears-list" columns="2" spacing="10" placeItems="center">
              <Box className="item1">
                <Text>Grinder: Niche Zero</Text>
                <Image
                  src="/static/images/niche_zero_white.webp"
                  alt="profile-pic"
                  width={300}
                  height={300}
                />
              </Box>
              <Box className="item2">
                <Text>Espresso Maker: Profitec Pro 500</Text>
                <Image
                  src="/static/images/pro_500.jpeg"
                  alt="profile-pic"
                  width={320}
                  height={206}
                />
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </motion.div>
      <Modal onClose={onClose} isOpen={isOpen} size={"xl"} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getStaticProps() {
  const apiBaseUrl = "http://localhost:1337";
  const res = await fetch(`${apiBaseUrl}/api/Skills?populate=*`, {
    headers: {
      Authorization:
        "Bearer 75d6251a970ae2df91155ef73012b391bae96e1a721dec76144bdabddc95c2aada9d4ea4d07f19b3bf49f4e5a6cc0a4a657b4be1b0b07a3351a834c1be075803bbe335c790887983e46bd85486ce7d0c3363457e3eaa218f0791cabf5fd72bca10f760e4d41032ef3ef16a61a03bd2ce0fe3a7e4649efe894f7efb07702a362e",
    },
  });
  const techStacks = await res.json();

  const res2 = await fetch(`${apiBaseUrl}/api/Softwares?populate=*`, {
    headers: {
      Authorization:
        "Bearer 75d6251a970ae2df91155ef73012b391bae96e1a721dec76144bdabddc95c2aada9d4ea4d07f19b3bf49f4e5a6cc0a4a657b4be1b0b07a3351a834c1be075803bbe335c790887983e46bd85486ce7d0c3363457e3eaa218f0791cabf5fd72bca10f760e4d41032ef3ef16a61a03bd2ce0fe3a7e4649efe894f7efb07702a362e",
    },
  });
  const softwareList = await res2.json();

  return {
    props: {
      apiBaseUrl,
      techStacks,
      softwareList,
    },
  };
}
