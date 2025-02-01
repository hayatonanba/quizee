import { ChangeEvent, Ref } from "react";

type FieldProps = {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  ref: Ref<HTMLInputElement>;
};

type Props = {
  isChecked: boolean;
  handleCheckBoxChange: () => void;
  placeholder: string;
  field?: FieldProps;
};

export default function ChoiceInput({
  field,
  isChecked,
  handleCheckBoxChange,
  placeholder,
}: Props) {
  return (
    <div className={`flex items-center mb-2 border border-black rounded-xl`}>
      <div className="w-[45px] h-[40px] grid place-content-center border-black border-r">
        <input
          checked={isChecked}
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
    </div>
  );
}
