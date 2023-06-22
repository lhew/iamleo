import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../graphql";
import "@iamleo/tailwind/global.css";
import { TextEditor } from "./components/texteditor";

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
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="max-w-5xl p-8 mx-auto">
        <TextEditor />
      </main>
    </>
  );
}
