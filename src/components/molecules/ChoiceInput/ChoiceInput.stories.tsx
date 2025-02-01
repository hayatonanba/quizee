import type { Meta, StoryObj } from "@storybook/react";
import ChoiceInput from "./ChoiceInput";
import { useState } from "react";

type T = typeof ChoiceInput;

export default {
  title: "molecules/ChoiceInput",
  component: ChoiceInput,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className="w-1/3">
        <ChoiceInput
          isChecked={isChecked}
          handleCheckBoxChange={() => setIsChecked(!isChecked)}
          placeholder="１つ目の選択肢"
        />
      </div>
    );
  },
};
