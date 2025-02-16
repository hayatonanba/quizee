import type { Meta, StoryObj } from "@storybook/react";
import PagenationButton from "./Pagenation";

type T = typeof PagenationButton;

export default {
  title: "molecules/PagenationButton",
  component: PagenationButton,
} satisfies Meta<T>;

export const First: StoryObj<T> = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};

export const Default: StoryObj<T> = {
  args: {
    currentPage: 3,
    totalPages: 5,
  },
};

export const Final: StoryObj<T> = {
  args: {
    currentPage: 5,
    totalPages: 5,
  },
};
