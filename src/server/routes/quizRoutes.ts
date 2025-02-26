import { createRoute, z } from "@hono/zod-openapi";
import { AnswerSchema, CreateQuizSchema, CurrentStreakSchema, MessageSchema, MyQuizzesSchema, QuerySchema, QuizIdSchema, QuizSchema, UpdateQuizSchema } from "../models/quizSchema";

export const getQuizByIdRoute = createRoute({
  path: "/{quizId}",
  method: "get",
  description: "クイズを一個取得",
  request: {
    params: QuizIdSchema
  },
  responses: {
    200: {
      description: "成功",
      content: {
        "application/json":{
          schema: QuizSchema
        }
      }
    },
    404: {
      description: "見つかりませんでした",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const getRandomQuizRoute = createRoute({
  path: "/random",
  method: "get",
  description: "ランダムなクイズを一問取得",
  responses: {
    200: {
      description: "成功",
      content: {
        "application/json": {
          schema: QuizSchema
        }
      }
    },
    404: {
      description: "見つかりませんでした",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

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

export const getCurrentStreakRoute = createRoute({
  path: "/currentStreak",
  method: "get",
  description: "連続正解数の取得",
  responses: {
    200: {
      description: "成功",
      content: {
        "application/json": {
          schema: CurrentStreakSchema
        }
      }
    }
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

export const createCorrectRoute = createRoute({
  path: "/{quizId}/answer",
  method: "post",
  description: "正誤判定",
  request: {
    params: QuizIdSchema,
    body: {
      content: {
        "application/json": {
          schema: AnswerSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: "成功",
      content: {
        "application/json": {
          schema: MessageSchema
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
