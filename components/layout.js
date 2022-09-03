import Navbar from "./navbar";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{ children }</main>
    </>
  );
}
