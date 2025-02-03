import type { Meta, StoryObj } from '@storybook/react';
import QuizBuildHeader from "./QuizBuildHeader";
import { useQuizStore } from '@/store/useQuizStore';
import { useState } from 'react';

type T = typeof QuizBuildHeader;

export default {
  title: 'organisms/QuizBuildHeader',
  component: QuizBuildHeader,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: () => {

    const newForm = useQuizStore().newForm()
    const { handleSubmit } = newForm

    const onSubmit = () => {
      if (isChecked) {
        alert("公開する")
      } else {
        alert("保存する")
      }
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
    };

    return (
      <QuizBuildHeader onClickFn={handleSubmit(onSubmit)} isChecked={isChecked} handleToggle={handleToggle} />
    )
  }
};
