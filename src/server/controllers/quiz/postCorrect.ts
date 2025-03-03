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

  const userId = session.user.id;

  return await prisma.$transaction(async (tx) => {

    const correct = await tx.quiz.findUnique({
      where: { id: Number(quizId) },
      include: {
        choices: {
          where: { isCorrect: true },
        },
      },
    })

    let message = "uncorrect";

    /*もし途中でユーザーにより問題が削除された場合は、正解の答えがnullとなり、
    不正解判定になるようになっています。*/
    const isCorrect = answer === correct?.choices[0].text;

    await tx.user.update({
      where: { id: userId },
      data: {
        currentStreak: isCorrect ? { increment: 1 } : 0,
        currentQuizId: null,
      }
    })

    if (isCorrect) {
      message = "correct";
    }

    return c.json({ message }, 201);

  })
}
