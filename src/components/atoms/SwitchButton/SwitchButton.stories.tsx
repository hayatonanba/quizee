import type { Meta, StoryObj } from "@storybook/react";
import { SwitchButton } from "./SwitchButton";
import { useState } from "react";

type T = typeof SwitchButton;

export default {
  title: "atoms/SwitchButton",
  component: SwitchButton,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
    };

    return <SwitchButton handleToggle={handleToggle} isChecked={isChecked} />;
  },
};
