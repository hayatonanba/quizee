import { createRoute, z } from "@hono/zod-openapi";
import { CreateQuizSchema, MyQuizzesSchema, QuerySchema, QuizIdSchema, QuizSchema, UpdateQuizSchema } from "../models/quizSchema";

export const getMyQuizzesRoute = createRoute({
  path: "/mine",
  method: "get",
  description: "自分が作ったクイズの取得",
  request: {
    query: QuerySchema
  },
  responses: {
    200:{
      description:"成功",
      content: {
        "application/json":{
          schema: MyQuizzesSchema
        }
      }
    },
  }
})

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

export const updateQuizRoute = createRoute({
  path: "/{quizId}",
  method: "put",
  description: "クイズを編集",
  request: {
    params: QuizIdSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateQuizSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "更新成功", content: {
        "application/json": {
          schema: QuizSchema
        }
      }
    },
    404: {
      description: "更新失敗", content: {
        "application/json": {
          schema: z.null()
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