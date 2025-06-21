import { z } from "@hono/zod-openapi";
import { UserSchema } from "./userSchema";
import { ChoiseSchema, CreateChoiceSchema, UpdateChoiceSchema } from "./choiceSchema";

export const QuizSchema = z.object({
  id: z.number().openapi({
    example: 1
  }),
  question: z.string().min(1).max(30).openapi({
    example: "問題文"
  }),
  choices: z.array(ChoiseSchema).min(2).max(4).openapi({
    example: [
      {
        "id": 1,
        "text": "example",
        "isCorrect": false
      },
      {
        "id": 2,
        "text": "instance",
        "isCorrect": true
      },
    ],
  }),
  isPublic: z.boolean().openapi({
    example: false
  }),
  createdAt: z.string().datetime().openapi({
    example: "2024-10-30T12:00:00Z"
  }),
  userId: z.string().openapi({
    example: "cm6qkipl10000o4z60q7gytcd"
  }),
  user: UserSchema,
})

export const CreateQuizSchema = z.object({
  question: z.string().min(1).max(30).openapi({
    example: "新しいクイズ"
  }),
  choices: z.array(CreateChoiceSchema).min(2).max(4)
  .refine((arr) => arr.filter(c => c.isCorrect).length === 1, {
    message: "選択肢のうち正解は1つだけにしてください",
    path: ["choices"],
  })
  // テキストの重複禁止
  .refine((arr) => {
    const texts = arr.map(c => c.text);
    return new Set(texts).size === texts.length;
  }, {
    message: "選択肢のテキストはすべて異なるものにしてください",
    path: ["choices"],
  })
  .openapi({
    example: [
      {
        "text": "aaaaaaaa",
        "isCorrect": false,
      },
      {
        "text": "bbbbbb",
        "isCorrect": true,
      },
    ],
  }),
  isPublic: z.boolean().openapi({
    example: false
  })
})

export const UpdateQuizSchema = z.object({
  question: z.string().min(1).max(30).openapi({
    example: "問題文の更新"
  }),
  choices: z.array(UpdateChoiceSchema).min(2).max(4)
  .refine((arr) => arr.filter(c => c.isCorrect).length === 1, {
    message: "選択肢のうち正解は1つだけにしてください",
    path: ["choices"],
  })
  .refine((arr) => {
    const nonEmptyTexts = arr
      .map((c) => c.text.trim())          
      .filter((t) => t !== "");       

    return new Set(nonEmptyTexts).size === nonEmptyTexts.length;
  }, {
    message: "選択肢のテキストが重複しています",
  })
  .openapi({
    example: [
      {
        "id": 1,
        "text": "example",
        "isCorrect": false
      },
      {
        "id": 2,
        "text": "instance",
        "isCorrect": true
      },
    ],
  }),
  isPublic: z.boolean().openapi({
    example: false
  }),
})

export const QuizIdSchema = z.object({
  quizId: z.string().openapi({ 
    example: "1"
  }),
});

export const QuerySchema = z.object({
  page: z.string().openapi({
    example: "1"
  }),
})

export const MyQuizzesSchema = z.object({
  quizzes: z.array(QuizSchema),
  totalCount: z.number().openapi({
    example: 1
  }),
  totalPages: z.number().openapi({
    example: 1
  })
})


export type QuizId = z.infer<typeof QuizIdSchema>;
export type CreateQuiz = z.infer<typeof CreateQuizSchema>;
export type UpdateQuiz = z.infer<typeof UpdateQuizSchema>;
export type Quiz = z.infer<typeof QuizSchema>
