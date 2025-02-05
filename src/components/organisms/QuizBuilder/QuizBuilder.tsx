import { ChoiceInput } from "@/components/molecules/ChoiceInput";
import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import { Button } from "../../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { QuizFormData } from "@/store/useQuizStore";


export default function QuizBuilder({ Form }: { Form: UseFormReturn<QuizFormData> }) {

  const { control, watch, setValue, formState: { errors } } = Form
  const { fields, append, remove } = useFieldArray({ control, name: "options" });
  const options = watch("options");

  const handleCheckboxChange = (id: number) => {
    setValue(
      "options",
      options.map((option) => ({
        ...option,
        isCorrect: option.id === id,
      }))
    );
  };

  const addOption = () => {
    if (fields.length < 4) {
      append({ id: Date.now(), text: "", isCorrect: false });
    }
  };

  const removeOption = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  return (
    <form className="space-y-2">
      <Controller
        name="question"
        control={control}
        render={({ field }) => (
          <>
            <input
              {...field}
              className="w-full border-black border-b p-2 text-[1.3rem] focus:outline-none"
              placeholder="問題文"
            />
            {errors.question && <p className="text-red-500">{errors.question.message}</p>}
          </>
        )}
      />
      {fields.map((option, index) => (
        <Controller
          key={option.id}
          name={`options.${index}.text`}
          control={control}
          render={({ field }) => (
            <>
              <ChoiceInput
                field={field}
                placeholder={`${index + 1}つ目の選択肢`}
                option={options[index]}
                handleCheckBoxChange={() => handleCheckboxChange(options[index].id)}
                handleRemoveOption={() => removeOption(index)}
                isRemovable={fields.length > 2}
              />
              {errors.options && <p className="text-[0.8rem] text-red-500">{errors.options?.[index]?.text?.message}</p>}
            </>
          )}
        />
      ))}
      {errors.options && <p className="text-red-500">{errors.options.message}</p>}
      {fields.length < 4 && (
        <div className="flex justify-center">
          <Button
            type="button"
            onClickFn={() => addOption()}
            size="sm"
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPlus} />選択肢を追加する
            </div>
          </Button>
        </div>
      )}
    </form>
  );
}
