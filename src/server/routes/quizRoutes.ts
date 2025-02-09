import { createRoute } from "@hono/zod-openapi";
import { CreateQuizSchema, QuizSchema } from "../models/quizSchema";

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