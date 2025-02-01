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
      { text: "33550336", onClickFn: () => alert("正解") },
      { text: "33550337", onClickFn: () => alert("不正解") },
      { text: "33551336", onClickFn: () => alert("不正解") },
      { text: "33551236", onClickFn: () => alert("不正解") },
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
