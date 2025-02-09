import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
  id: z.string().openapi({
    example: "aaaaaaa"
  }),
  name: z.string().nullable().openapi({
    example: "y_ta"
  }),
  image: z.string().nullable().openapi({
    example: "https://avatars.githubusercontent.com/u/129815120?v=4"
  }),
});

export const ChoiseSchema = z.object({
  text: z.string().min(1).openapi({
    example: "クイズの選択肢"
  }),
  isCorrect: z.boolean().openapi({
    example: false
  })
})

export const QuizSchema = z.object({
  id: z.number().openapi({
    example: 1
  }),
  question: z.string().min(30).openapi({
    example: "問題文"
  }),
  choices: z.array(ChoiseSchema).min(2).max(4).openapi({
    example: [
      {
        "text": "example",
        "isCorrect": false
      },
      {
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
  question: z.string().min(30).openapi({
    example: "新しいクイズ"
  }),
  choices: z.array(ChoiseSchema).min(2).max(4).openapi({
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

export type CreateQuiz = z.infer<typeof CreateQuizSchema>;