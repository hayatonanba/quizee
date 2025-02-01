import type { Meta, StoryObj } from "@storybook/react";
import MyListHeader from "./MyListHeader";

type T = typeof MyListHeader;

export default {
  title: "organisms/MyListHeader",
  component: MyListHeader,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  args:{link:"/home"}
};
