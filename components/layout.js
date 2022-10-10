import dynamic from "next/dynamic";
const DynamicNavbar = dynamic(() => import("./navbar"), {
  ssr: false,
});

import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicNavbar />
      <main>{children}</main>
    </>
  );
}
