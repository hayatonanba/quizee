import type { Meta, StoryObj } from "@storybook/react";
import ChoiceButton from "./ChoiceButton";

type T = typeof ChoiceButton;

export default {
  title: "molecules/ChoiceButton",
  component: ChoiceButton,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: () => {
    return (
      <div className="w-1/3">
        <ChoiceButton
          isLoading={true}
          text="モホロビチッチ不連続面"
          onClickFn={() => alert("正解")}
        />
      </div>
    );
  },
};
