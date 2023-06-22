import type { Meta, StoryObj } from "@storybook/react";

import SplashComponent from "@iamleo/web/pages/components/splash";

const meta: Meta<typeof SplashComponent> = {
  title: "Web/Components",
  component: SplashComponent,
};

export default meta;
type Story = StoryObj<typeof SplashComponent>;

export const Splash: Story = {};
