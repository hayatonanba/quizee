import { createRoute, z } from "@hono/zod-openapi";
import { CreateQuizSchema, QuizIdSchema, QuizSchema } from "../models/quizSchema";

export const createQuizRoute = createRoute({
  path: "/",
  method: "post",
  description: "問題作成",
  request: {
    body: {
      content:{
        "application/json":{
          schema: CreateQuizSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: "作成成功",
      content: {
        "application/json" :{
          schema: QuizSchema
        }
      }
    }
  }
})

export const deleteQuizRoute = createRoute({
  path: "/{quizId}",
  method: "delete",
  description: "クイズを削除",
  request: {
   params: QuizIdSchema,
  },
  responses: {
    200: { description: "削除成功" },
    404: { 
      description: "クイズが見つかりません", content: {
        "application/json": {
          schema: z.null()
        }
      } 
    }
  }
})