import { z } from "zod";

export const quizSchema = z.object({
  question: z.string().min(1, "問題を入力してください").max(30, "問題は30文字以内で入力してください"),
  options: z
    .array(
      z.object({
        id: z.number().optional(),
        text: z.string().min(1, "選択肢を入力してください").max(10, "選択肢は10文字以内で入力してください"),
        isCorrect: z.boolean(),
      })
    )
    .min(2, "最低2つの選択肢が必要です")
    .max(4, "選択肢は最大4つまでです"),
});
