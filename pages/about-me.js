import { motion } from "framer-motion";
import React from "react";

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
  //

  const list2Delay = 0.5 + techStacks.data.length*0.3;

  const list = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3,
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
        delayChildren: list2Delay,
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="detail px-4 py-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h1>Something interesting about me~~</h1>
      <p>Hi, I am Raymond, a frontend developer who is working on his way to become a fullstack developer.</p>
      <br></br>
      <p>Academic Qualifications:</p>
      <p>2012-2016</p>
      <p>University of Hong Kong: Bachelor of Science (Majoring in Physics)</p>
      <br></br>
      <p>Working Experience:</p>
      <p>2016 Jul - 2019 Feb</p>
      <p>Multiable Company - Senior System Support Executive</p>
      <p>2019 Mar - 2020 Jul</p>
      <p>Goldenway Company - System Analyst</p>
      <p>2020 Aug - Now</p>
      <p>Reel Fintech Limited - Frontend Developer</p>
      <br></br>
      <p>Technologies I know:</p>
      <motion.ul
        className="tech-stack-list grid grid-cols-3 gap-4 place-items-center"
        variants={list}
        initial="hidden"
        animate="visible"
      >
        {techStacks.data.map((stack) => (
          <motion.li key={stack.id} className="tech-stack-item" variants={teckStack}>
            <p className="text-center">{stack.attributes.name}</p>
            <div className="logo shadow-2xl rounded-full w-40 h-40 overflow-hidden grid place-items-center">
              <img
                className="w-3/5 hover:scale-150 duration-500"
                src={apiBaseUrl + stack.attributes.logo.data.attributes.url}
              />
            </div>
          </motion.li>
        ))}
      </motion.ul>

      <p className="mt-12">Softwares I am familiar with:</p>
      <motion.ul
        className="software-list grid grid-cols-3 gap-4 place-items-center"
        variants={list2}
        initial="hidden"
        animate="visible"
      >
        {softwareList.data.map((software) => (
          <motion.li key={software.id} className="software-item" variants={teckStack}>
            <p className="text-center">{software.attributes.name}</p>
            <div className="logo shadow-2xl rounded-full w-40 h-40 overflow-hidden grid place-items-center">
              <img
                className="w-3/5 hover:scale-150 duration-500"
                src={apiBaseUrl + software.attributes.logo.data.attributes.url}
              />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export async function getStaticProps() {
  const apiBaseUrl = "http://localhost:1337";
  const res = await fetch(`${apiBaseUrl}/api/Skills?populate=*`, {
    headers: {
      Authorization:
        "Bearer 97b096bd56ef183d13f73ef83431a7f7dcd98641d92335b442bf94a3f907087bf5b7be79da0100e24b74261aeb68311cf49f403eb34e8a69f3176d6395f5f6843f56920d247e539d4d9afdc0db14b4a34530f36a70aef7c185eb0bf2bec190317954f6f8d6cc844a8204f56f58ff1e3fbd1c4d3e4c8ca2f9bf4a1cc629f0345b",
    },
  });
  const techStacks = await res.json();

  const res2 = await fetch(`${apiBaseUrl}/api/Softwares?populate=*`, {
    headers: {
      Authorization:
        "Bearer 97b096bd56ef183d13f73ef83431a7f7dcd98641d92335b442bf94a3f907087bf5b7be79da0100e24b74261aeb68311cf49f403eb34e8a69f3176d6395f5f6843f56920d247e539d4d9afdc0db14b4a34530f36a70aef7c185eb0bf2bec190317954f6f8d6cc844a8204f56f58ff1e3fbd1c4d3e4c8ca2f9bf4a1cc629f0345b",
    },
  });
  const softwareList = await res2.json();

  return {
    props: {
      apiBaseUrl,
      techStacks,
      softwareList
    },
  };
}
