import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AddPostInput, Post, UpdatePostInput } from "../entities/Post";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../data-source";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(
    @Arg("limit", { nullable: true }) limit?: number,
    @Arg("offset", { nullable: true }) offset?: number
  ) {
    const postsRepo = AppDataSource.getRepository(Post);
    const defaultOrder: FindOneOptions<Post>["order"] = { updatedAt: "DESC" };

    if (limit) {
      const posts = await postsRepo.find({
        take: limit,
        skip: offset || 0,
        order: defaultOrder,
      });
      return posts || [];
    }
    const posts = await postsRepo.find({
      order: defaultOrder,
    });
    return posts || [];
  }

  @Query(() => Post)
  async post(@Arg("id") id: number) {
    try {
      const postsRepo = AppDataSource.getRepository(Post);
      const post = await postsRepo.findOne({ where: { id } });
      return post;
    } catch (e) {
      throw new Error("Post not found");
    }
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
  async updatePost(
    @Arg("id") id: number,
    @Arg("data")
    postData: UpdatePostInput
  ) {
    const post = await AppDataSource.manager.findOne(Post, { where: { id } });

    if (!post) {
      throw new Error("Post not found");
    }

    try {
      await AppDataSource.manager.update(Post, { id }, postData);
      return await AppDataSource.manager.findOne(Post, { where: { id } });
    } catch (e) {
      console.log({ postData }, e);
      throw new Error("Error updating post: ", e);
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
