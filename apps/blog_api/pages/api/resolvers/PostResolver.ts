import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AddPostInput, Post } from "../entities/Post";
import { AppDataSource } from "../data-source";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts() {
    const postsRepo = AppDataSource.getRepository(Post);
    const posts = await postsRepo.find();
    return posts || [];
  }

  @Mutation(() => Post)
  async addPost(@Arg("data") postData: AddPostInput) {
    try {
      const postsRepo = AppDataSource.getRepository(Post);
      await postsRepo.save(postData);

      const newPost = await AppDataSource.manager.findOne(Post, {
        where: {},
        order: { id: "DESC" },
      });

      return newPost;
    } catch (e) {
      throw new Error("Error creating post: ");
    }
  }

  @Mutation(() => Post)
  async updatePost(@Arg("id") id: number, @Arg("data") postData: AddPostInput) {
    const post = await AppDataSource.manager.findOne(Post, { where: { id } });

    if (!post) {
      throw new Error("Post not found");
    }

    try {
      await AppDataSource.manager.save(postData);
      return post;
    } catch (e) {
      throw new Error("Error updating post");
    }
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number) {
    const post = await AppDataSource.manager.findOne(Post, { where: { id } });

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.published) {
      throw new Error("Cannot delete published post");
    }

    try {
      await AppDataSource.manager.delete(Post, { where: { id } });
      return true;
    } catch (e) {
      throw new Error("Error deleting post");
    }
  }
}
