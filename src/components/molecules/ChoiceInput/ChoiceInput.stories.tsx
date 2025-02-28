import type { Meta, StoryObj } from "@storybook/react";
import ChoiceInput from "./ChoiceInput";
import { useState } from "react";

type T = typeof ChoiceInput;

export default {
  title: "molecules/ChoiceInput",
  component: ChoiceInput,
  tags: ["autodocs"]
} satisfies Meta<T>;

export const ThreeOrMoreChoices: StoryObj<T> = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className="w-1/3">
        <ChoiceInput
          choice={{ isCorrect: isChecked, text: "" }}
          isRemovable={true}
          handleCheckBoxChange={() => setIsChecked(!isChecked)}
          handleRemoveOption={() => alert("Delete!!")}
          placeholder="１つ目の選択肢"
        />
      </div>
    );
  },
};

export const TwoOrFewerChoices: StoryObj<T> = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className="w-1/3">
        <ChoiceInput
          choice={{ isCorrect: isChecked, text: "" }}
          isRemovable={false}
          handleCheckBoxChange={() => setIsChecked(!isChecked)}
          handleRemoveOption={() => alert("Delete!!")}
          placeholder="１つ目の選択肢"
        />
      </div>
    )
  }
}
