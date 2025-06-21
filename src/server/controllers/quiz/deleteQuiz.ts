import { prisma } from "@/lib/prisma/client";
import type { WithAuthenticatedRequest } from "@/server/middleware/authMiddleware";
import type { deleteQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const deleteQuizHandler: RouteHandler<typeof deleteQuizRoute, WithAuthenticatedRequest> = async (c) => {
  const { quizId } = c.req.param()
  // const session = await auth()

  // if (!session?.user?.id) {
  //   throw Error("認証してください。")
  // }

  const existingQuiz = await prisma.quiz.findUnique({ where: { id: Number(quizId) } });

  if (!existingQuiz) {
    return c.json(null, 404);
  }

  if (c.var.userId !== existingQuiz.userId) {
    throw Error("編集権限がありません")
  }

  await prisma.quiz.delete({ where: { id: Number(quizId) } })

  return c.json(204)
}
