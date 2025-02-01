import type { Meta, StoryObj } from "@storybook/react";
import HomeButtons from "./HomeButtons";

type T = typeof HomeButtons;

export default {
  title: "molecules/HomeButtons",
  component: HomeButtons,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
