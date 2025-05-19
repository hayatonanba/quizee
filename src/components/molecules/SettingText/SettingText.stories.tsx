import type { Meta, StoryObj } from '@storybook/react';
import SettingText from "./SettingText";

type T = typeof SettingText;

export default {
    title: 'molecules/SettingText',
    component: SettingText,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: () => {
    return(
    <div className='w-[500px]'>
      <SettingText 
        inputName='表示名'
        placeholder='nababa'
      />
    </div>
    )
  }
};
