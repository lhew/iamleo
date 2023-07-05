import "@iamleo/tailwind/global.css";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../../graphql";
import Link from "next/link";
import Tiptap from "../components/Tiptap";

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    console.log({ params });
    const response = await client.query({
      query: gql`
        query ($postId: Float!) {
          post(id: $postId) {
            id
            slug
            title
            thumbnail
            content
            published
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        postId: parseInt(params.id, 10),
      },
      context: {
        headers: {
          Host: null,
        },
      },
    });

    console.log({ response: response.data.post });

    return {
      props: {
        post: response.data.post,
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
  const submitContent = async (content) => {
    client.mutate({
      mutation: gql`
        mutation ($data: AddPostInput!, $updatePostId: Float!) {
          updatePost(data: $data, id: $updatePostId) {
            id
            slug
            title
            thumbnail
            content
            published
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        data: {
          title: props.post.title,
          content,
          published: props.post.published,
        },
        updatePostId: props.post.id,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Edit post</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="max-w-5xl mx-auto my-2">
        <div className="p-8 mx-auto my-2 rounded">
          <div className="overflow-x-auto">
            <a href="/" className="text-xs">
              Back to dashboard
            </a>
            <h1 className="mb-10 text-2xl font-bold">Edit post</h1>

            <div className="p-4 mb-2 card bg-base-200">
              <label htmlFor="title">
                <input
                  type="text"
                  id="title"
                  title="Post title"
                  placeholder="Post title"
                  className="w-full text-xl bg-transparent input"
                  defaultValue={props.post?.title}
                />
              </label>
            </div>
            <div className="p-4 card bg-base-200">
              <Tiptap
                content={props.post?.content}
                onSubmit={async (content) => {
                  console.log({ content });
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
