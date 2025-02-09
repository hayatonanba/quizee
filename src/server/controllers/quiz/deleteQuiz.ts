import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { deleteQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const deleteQuizHandler: RouteHandler<typeof deleteQuizRoute> = async (c) => {
  const { quizId } = c.req.param()
  const session = await auth()

  if (!session?.user?.id) {
    throw Error("認証してください。")
  }

  const existingQuiz = await prisma.quiz.findUnique({ where: { id: Number(quizId) } });

  if (!existingQuiz) {
    return c.json(null, 404);
  }

  if (session.user.id !== existingQuiz.userId) {
    throw Error("編集権限がありません")
  }

  await prisma.quiz.delete({ where: { id: Number(quizId) } })

  return c.json({ message: ("クイズを削除しました") }, 200)
}