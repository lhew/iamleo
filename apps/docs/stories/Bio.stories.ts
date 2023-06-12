import type { Meta, StoryObj } from "@storybook/react";

import BioComponent from "@iamleo/web/app/components/bio";

const meta: Meta<typeof BioComponent> = {
  title: "Web/Components",
  component: BioComponent,
};

export default meta;
type Story = StoryObj<typeof BioComponent>;

export const Bio: Story = {};
