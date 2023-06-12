import { Button, Header } from "@iamleo/ui";
import Splash from "./components/splash";
import Bio from "./components/bio";
import BlogPosts from "./components/blogposts";
import Footer from "./components/footer";

export default function Page() {
  return (
    <>
      <Splash />
      <Bio />
      <BlogPosts />
      <Footer />
    </>
  );
}
