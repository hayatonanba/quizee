import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { createCorrectRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const createCorrectHandler: RouteHandler<typeof createCorrectRoute> = async (c) => {
  const { answer } = await c.req.valid("json")
  const { quizId } = c.req.param()
  const session = await auth()
  
    if (!session?.user?.id) {
      throw Error("認証してください。")
    }

  const correct = await prisma.quiz.findUnique({
    where: { id: Number(quizId) },
    include: {
      choices: {
        where: { isCorrect: true },
      },
    },
  })

  let ms = {message: ""}

  if (answer === correct?.choices[0].text) {
    ms = {message: "correct"}
  } else {
    ms = {message: "uncorrect"}
  }

  return c.json(ms, 201)
}