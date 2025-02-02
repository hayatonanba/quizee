import type { Meta, StoryObj } from "@storybook/react";
import StreakBubbleWithIcon from "./StreakBubbleWithIcon";

type T = typeof StreakBubbleWithIcon;

export default {
  title: "organisms/StreakBubbleWithIcon",
  component: StreakBubbleWithIcon,
  tags: ["autodocs"],
} satisfies Meta<T>;

export const ZeroToFour: StoryObj<T> = {
  args: {
    streakCount: 0,
  },
};

export const FiveToNine: StoryObj<T> = {
  args: {
    streakCount: 5,
  },
};

export const TenToFourtyNine: StoryObj<T> = {
  args: {
    streakCount: 10,
  },
};

export const FiftyToNintyNine: StoryObj<T> = {
  args: {
    streakCount: 50,
  },
};

export const OneHundredOver: StoryObj<T> = {
  args: {
    streakCount: 100,
  },
};
