import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import QuizBuildHeader from "./QuizBuildHeader";
import { useQuizStore } from '@/store/useQuizStore';

type T = typeof QuizBuildHeader;

export default {
  title: 'organisms/QuizBuildHeader',
  component: QuizBuildHeader,
} satisfies Meta<T>;

const QuizBuildHeaderWrapper: React.FC = () => {
  const newForm = useQuizStore().useNewForm();
  const { handleSubmit } = newForm;

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(prev => !prev);
  };

  const onSubmit = () => {
    if (isChecked) {
      alert("公開する");
    } else {
      alert("保存する");
    }
  };

  return (
    <QuizBuildHeader
      onClickFn={handleSubmit(onSubmit)}
      isChecked={isChecked}
      handleToggle={handleToggle}
    />
  );
};

export const Default: StoryObj<T> = {
  render: () => <QuizBuildHeaderWrapper />,
};
