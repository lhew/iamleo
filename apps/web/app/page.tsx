import { Button, Header } from "@iamleo/ui";
import Splash from "./components/splash";
import Bio from "./components/bio";
import BlogPosts from "./components/blogposts";
import Footer from "./components/footer";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Leonardo Almeida | Front-end Developer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Leonardo Almeida" />
        <meta
          name="description"
          content="This is the portfolio of Leonardo Almeida, Brazilian Front-end developer based in Amsterdam, the Netherlands"
        />
      </Head>
      <Splash />
      <Bio />
      <BlogPosts />
      <Footer />
    </>
  );
}
