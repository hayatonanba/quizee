import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

type T = typeof Button;

export default {
  title: "atoms/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: () => {
    return (
      <Button type="button" onClickFn={() => alert("Login!!")} size="md">
        ログイン
      </Button>
    );
  },
};

export const SmallButton: StoryObj<T> = {
  render: () => {
    return (
      <Button type="button" onClickFn={() => alert("Create!!")} size="sm">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPencil} />
          作問する
        </div>
      </Button>
    );
  },
};
