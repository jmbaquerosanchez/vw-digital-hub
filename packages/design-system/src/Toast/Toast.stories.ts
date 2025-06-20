import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "./Toast";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "design-system/Toast",
  component: Toast,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Good: Story = {
  args: {
    variant: "good",
    message: "This is a good message",
    size: "large",
  },
};

export const Bad: Story = {
  args: {
    variant: "bad",
    message: "This is a bad message",
    size: "large",
  },
};
