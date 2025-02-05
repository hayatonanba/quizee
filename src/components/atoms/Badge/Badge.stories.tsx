import type { Meta, StoryObj } from '@storybook/react';
import Badge from "./Badge";

type T = typeof Badge;

export default {
    title: 'atoms/Badge',
    component: Badge,
    tags: ["autodocs"]
} satisfies Meta<T>;

export const Public: StoryObj<T> = {
  args: {
    varient: "public"
  }
};

export const Private: StoryObj<T> = {
  args: {
    varient: "private"
  }
}

