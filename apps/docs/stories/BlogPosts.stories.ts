import type { Meta, StoryObj } from "@storybook/react";

import BlogComponent from "@iamleo/web/pages/components/blogposts";

const meta: Meta<typeof BlogComponent> = {
  title: "Web/Components",
  component: BlogComponent,
};

export default meta;
type Story = StoryObj<typeof BlogComponent>;

export const BlogPosts: Story = {};
