import type { Meta, StoryObj } from '@storybook/react';
import QuizCard from "./QuizCard";

type T = typeof QuizCard;

export default {
  title: 'organisms/QuizCard',
  component: QuizCard,
  tags: ["autodocs"]
} satisfies Meta<T>;

export const Public: StoryObj<T> = {
  render: () => {

    const quiz = {
      question: "ガリレオ衛星とはイオ・エウロパ・ガニメデと何？",
      choices: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false }
      ],
      updatedAt: "2025/01/24"
    }

    const handleSubmit = () => {
      alert("削除")
    }

    return (
      <div className='w-[600px]'>
        <QuizCard
          question={quiz.question}
          choices={quiz.choices}
          isPublic={true}
          updatedAt={quiz.updatedAt}
          handleSubmit={handleSubmit}
        />
      </div>
    )
  }
};

export const Private = {
  render: () => {

    const quiz = {
      question: "ガリレオ衛星とはイオ・エウロパ・ガニメデと何？",
      choices: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false }
      ],
      updatedAt: "2025/01/24"
    }

    const handleSubmit = () => {
      alert("削除")
    }

    return (
      <div className='w-[600px]'>
        <QuizCard
          question={quiz.question}
          choices={quiz.choices}
          isPublic={false}
          updatedAt={quiz.updatedAt}
          handleSubmit={handleSubmit}
        />
      </div>
    )
  }
}
