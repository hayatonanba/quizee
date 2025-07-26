import { ChoiceInput } from "@/components/molecules/ChoiceInput";
import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { QuizFormData } from "@/store/useQuizStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function QuizBuilder({ Form }: { Form: UseFormReturn<QuizFormData> }) {
  const { control, watch, setValue, trigger, formState: { errors } } = Form;
  const { fields, append, remove } = useFieldArray({ control, name: "choices" });
  const options = watch("choices");

  useEffect(() => {
    const subscription = watch(() => {
      trigger("choices")
    })
    return () => subscription.unsubscribe()
  }, [watch, trigger])

  // ✅ 選択肢をチェックしたときに正解を更新
  const handleCheckboxChange = (localId: number) => {
    setValue(
      "choices",
      options.map((option) => ({
        ...option,
        isCorrect: option.localId === localId, // localId を基準にする
      }))
    );
  };

  // ✅ 選択肢を追加 (localId を使用)
  const addOption = () => {
    if (fields.length < 4) {
      append({
        localId: Date.now(), //フロント用
        text: "",
        isCorrect: false,
      });
    }
  };

  // ✅ 選択肢を削除
  const removeOption = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  return (
    <form className="space-y-2">
      {/* ✅ 問題文入力 */}
      <Controller
        name="question"
        control={control}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              className="min-h-[50px] w-full border-black border-b p-2 text-[1.3rem] focus:outline-none"
              placeholder="問題文"
            />
            {errors.question && <p className="text-red-500">{errors.question.message}</p>}
          </>
        )}
      />

      {/* ✅ 選択肢リスト */}
      {fields.map((choice, index) => (
        <Controller
          key={choice.localId} // localId を key にする
          name={`choices.${index}.text`}
          control={control}
          render={({ field }) => (
            <>
              <ChoiceInput
                field={field}
                placeholder={`${index + 1}つ目の選択肢`}
                choice={choice}
                handleCheckBoxChange={() => handleCheckboxChange(choice.localId)} // localId を渡す
                handleRemoveOption={() => removeOption(index)}
                isRemovable={fields.length > 2}
              />
              {errors.choices && <p className="text-[0.8rem] text-red-500">{errors.choices?.[index]?.text?.message}</p>}
            </>
          )}
        />
      ))}

      {/* ✅ バリデーションエラー */}
      {errors.choices && <p className="text-red-500">{errors.choices.message}</p>}
   

      {/* ✅ 選択肢追加ボタン */}
      {fields.length < 4 && (
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={() => addOption()}
            size="lg"
            variant="outline"
            className="rounded-full border border-black"
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPlus} className="size-[20px]" />選択肢を追加する
            </div>
          </Button>
        </div>
      )}
    </form>
  );
}
