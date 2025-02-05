import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ChangeEvent, Ref } from "react";

type FieldProps = {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  ref: Ref<HTMLInputElement>;
};

type Props = {
  handleCheckBoxChange: () => void;
  handleRemoveOption: () => void;
  placeholder: string;
  field?: FieldProps;
  option: OptionType;
  isRemovable: boolean;
};

type OptionType = {
  id: number;
  text: string;
  isCorrect: boolean
};

export default function ChoiceInput({
  field,
  handleCheckBoxChange,
  handleRemoveOption,
  placeholder,
  option,
  isRemovable,
}: Props) {
  return (
    <div className="flex items-center rounded-xl border border-black">
      <div className="grid h-[40px] w-[45px] place-content-center border-black border-r">
        <input
          checked={option.isCorrect}
          onChange={handleCheckBoxChange}
          type="checkbox"
          className="m-2 size-[15px] border-black border-l"
        />
      </div>
      <input
        {...field}
        type="text"
        className="flex-1 rounded-xl p-2 focus:outline-none"
        placeholder={placeholder}
      />
      <div className="grid h-[40px] w-[45px] place-content-center">
        {isRemovable && !option.isCorrect && (<button
          type="button"
          onClick={handleRemoveOption}
          className="ml-2 rounded p-1"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>)}
      </div>
    </div>
  );
}
