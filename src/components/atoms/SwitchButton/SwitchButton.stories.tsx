import type { Meta, StoryObj } from "@storybook/react";
import SwitchButton from "./SwitchButton";
import { useState } from "react";

type T = typeof SwitchButton;

const SwitchButtonWrapper = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(prev => !prev);
  };

  return <SwitchButton handleToggle={handleToggle} isChecked={isChecked} />;
};

export default {
  title: "atoms/SwitchButton",
  component: SwitchButton,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: () => <SwitchButtonWrapper />,
};
