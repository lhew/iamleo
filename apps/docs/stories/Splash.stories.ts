import type { Meta, StoryObj } from "@storybook/react";

import Splash from "@iamleo/web/app/components/splash";

const meta: Meta<typeof Splash> = {
  title: "Web/Components",
  component: Splash,
};

export default meta;
type Story = StoryObj<typeof Splash>;

export const Default: Story = {};
