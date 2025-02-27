import { z } from "@hono/zod-openapi";

export const ChoiseSchema = z.object({
  id: z.number().openapi({
    example: 1
  }),
  text: z.string().min(1).openapi({
    example: "クイズの選択肢"
  }),
  isCorrect: z.boolean().openapi({
    example: false
  })
})

export const CreateChoiceSchema = z.object({
  text: z.string().min(1).openapi({
    example: "クイズの選択肢"
  }),
  isCorrect: z.boolean().openapi({
    example: false
  })
})

export const UpdateChoiceSchema = z.object({
  id: z.number().optional().openapi({
    example: 1
  }),
  text: z.string().min(1).openapi({
    example: "クイズの選択肢"
  }),
  isCorrect: z.boolean().openapi({
    example: false
  })
})

export type CreateChoice = z.infer<typeof CreateChoiceSchema>
