import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfiniteScroll } from "./InfiniteScroll";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "design-system/InfiniteScroll",
  component: InfiniteScroll,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof InfiniteScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Main: Story = {
  args: {},
};
