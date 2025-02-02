import type { Meta, StoryObj } from '@storybook/react';
import QuizBuilder from "./QuizBuilder";
import { useQuizStore } from '@/store/useQuizStore';

type T = typeof QuizBuilder;

export default {
    title: 'organisms/QuizBuilder',
    component: QuizBuilder,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render:() => {

    const Form = useQuizStore().newForm()

    return (
      <div className='w-3/5'>
        <QuizBuilder Form={Form}/>
      </div>
    )
  }
};
