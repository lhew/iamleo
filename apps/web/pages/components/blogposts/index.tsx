export default function BlogPosts({ posts }) {
  console.log(posts);
  return (
    <section className="h-[100vh] min-h-screen flex flex-col items-center justify-center max-w-3xl mx-auto">
      <h2 className="text-[2em] sm:text-[3em] mb-6 font-bold text-center">
        Blog posts
      </h2>

      {posts?.map((post, i) => (
        <p key={i}>{post.title}</p>
      ))}
    </section>
  );
}
