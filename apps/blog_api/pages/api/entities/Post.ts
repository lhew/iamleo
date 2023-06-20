import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID, ArgsType, InputType } from "type-graphql";

@Entity({ name: "post" })
@ObjectType()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  slug!: string;

  @Field(() => String)
  @Column()
  thumbnail: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => String)
  @Column()
  published: boolean;

  @Field(() => Date)
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date;
}

@ArgsType()
export class PostArgs {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  published: boolean;
}

@InputType({ description: "New post data" })
export class AddPostInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  content: string;

  @Field(() => Boolean)
  published: boolean;
}

@InputType({ description: "Update post data" })
export class UpdatePostInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  content: string;

  @Field(() => Boolean)
  published: boolean;
}

@InputType({ description: "Delete post data" })
export class DeletePostInput {
  @Field(() => ID)
  id!: number;
}
