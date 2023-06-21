import Splash from "../pages/components/splash";
import Bio from "../pages/components/bio";
import BlogPosts from "../pages/components/blogposts";
import Footer from "../pages/components/footer";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../graphql";
import "@iamleo/tailwind/global.css";

export async function getStaticProps() {
  try {
    const response = await client.query({
      query: gql`
        query ($limit: Float) {
          posts(limit: $limit) {
            content
            createdAt
            published
            title
            slug
          }
        }
      `,
      variables: {
        limit: 3,
      },
    });

    return {
      props: {
        posts: response.data.posts,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default function Page(props) {
  console.log(props);
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
      <BlogPosts posts={props.posts} />
      <Footer />
    </>
  );
}
