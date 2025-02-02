import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, Ref } from "react";

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
    <div className={`flex items-center border border-black rounded-xl`}>
      <div className="w-[45px] h-[40px] grid place-content-center border-black border-r">
        <input
          checked={option.isCorrect}
          onChange={handleCheckBoxChange}
          type="checkbox"
          className="m-2 border-black border-l size-[15px]"
        />
      </div>
      <input
        {...field}
        type="text"
        className="flex-1  p-2 focus:outline-none rounded-xl"
        placeholder={placeholder}
      />
      <div className="w-[45px] h-[40px] grid place-content-center">
        {isRemovable && !option.isCorrect && (<button
          type="button"
          onClick={handleRemoveOption}
          className="ml-2 p-1 rounded"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>)}
      </div>
    </div>
  );
}
