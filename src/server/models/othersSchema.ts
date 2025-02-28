import { z } from "@hono/zod-openapi";

export const AnswerSchema = z.object({
  answer: z.string().openapi({
    example: "答え"
  })
})

export const MessageSchema = z.object({
  message: z.string().openapi({
    example: "正解"
  })
})

export const CurrentStreakSchema = z.object({
  currentStreak: z.number().openapi({
    example: 1
  })
})
