import type { Preview } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { Config } from "../src/config/vw/Config";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Config />
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;
