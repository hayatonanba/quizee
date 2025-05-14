import type { Meta, StoryObj } from '@storybook/react';
import SettingText from "./SettingText";

type T = typeof SettingText;

export default {
    title: 'molecules/SettingText',
    component: SettingText,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  args: {
    inputName: "表示名",
    placeholder: "user_name"
  }
};
