import type { Meta, StoryObj } from '@storybook/react';
import SettingButton from "./SettingButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

type T = typeof SettingButton;

export default {
    title: 'molecules/SettingButton',
    component: SettingButton,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: () => {
    return (
      <SettingButton link = "/setting">
        <FontAwesomeIcon icon={faGear} />
        <span>ユーザー設定</span>
      </SettingButton>
    )
  }
};
