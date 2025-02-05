import type { Meta, StoryObj } from '@storybook/react';
import QuizCard, { type Props } from "./QuizCard";

type T = typeof QuizCard;

export default {
  title: 'organisms/QuizCard',
  component: QuizCard,
  tags: ["autodocs"]
} satisfies Meta<T>;

export const Public: StoryObj<T> = {
  render: () => {

    const quiz: Props["quiz"] = {
      question: "ガリレオ衛星とはイオ・エウロパ・ガニメデと何？",
      status: "public",
      choices: [
        { text: "" },
        { text: "" }
      ],
      updatedAt: "2025/01/24"
    }

    const handleSubmit = () => {
      alert("削除")
    }

    return (
      <div className='w-[600px]'>
        <QuizCard quiz={quiz} handleSubmit={handleSubmit} />
      </div>
    )
  }
};

export const Private = {
  render: () => {

    const quiz: Props["quiz"] = {
      question: "ガリレオ衛星とはイオ・エウロパ・ガニメデと何？",
      status: "private",
      choices: [
        { text: "" },
        { text: "" }
      ],
      updatedAt: "2025/01/24"
    }

    const handleSubmit = () => {
      alert("削除")
    }

    return (
      <div className='w-[600px]'>
        <QuizCard quiz={quiz} handleSubmit={handleSubmit} />
      </div>
    )
  }
}
