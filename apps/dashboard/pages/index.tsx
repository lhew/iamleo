import "@iamleo/tailwind/global.css";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../graphql";
import Link from "next/link";

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
            id
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

      <main className="max-w-5xl mx-auto my-2">
        <div className="p-8 mx-auto my-2 rounded">
          <div className="overflow-x-auto">
            <h1 className="mb-10 text-2xl font-bold">All posts</h1>
            <div className="p-4 card bg-base-200">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {props.posts.map((post) => (
                    <tr key={post.slug}>
                      <td width="100%">
                        <Link href={"/posts/" + post.id}>{post.title}</Link>
                      </td>

                      <td>
                        <Link href={"/posts/" + post.id}>
                          {post.published ? (
                            <div className="p-2 badge-xs badge badge-accent">
                              <span className="text-xs">Published</span>
                            </div>
                          ) : (
                            <div className="p-2 badge-xs badge badge-outline badge-accent">
                              Draft
                            </div>
                          )}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* {<Tiptap />} */}
        </div>
      </main>
    </>
  );
}
