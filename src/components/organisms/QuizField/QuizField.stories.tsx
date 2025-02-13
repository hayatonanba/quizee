import type { Meta, StoryObj } from "@storybook/react";
import QuizField from "./QuizField";

type T = typeof QuizField;

export default {
  title: "organisms/QuizField",
  component: QuizField,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: () => {
    const choiceList = [
      { id: 1, text: "33550336", isCorrect: true },
      { id: 2, text: "33550337", isCorrect: false },
      { id: 3, text: "33551336", isCorrect: false },
      { id: 4, text: "33551236", isCorrect: false },
    ];

    return (
      <QuizField
        choiceList={choiceList}
        question="5番目の完全数は？"
        author="y_ta"
      />
    );
  },
};
