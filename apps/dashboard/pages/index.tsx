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
        limit: 10,
      },
      context: {
        headers: {
          Host: null,
        },
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
        <title>Splash</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="text-6xl font-bold">Dashboard</h1>
      <pre>{JSON.stringify(props.posts)}</pre>
    </>
  );
}
