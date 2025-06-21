import { prisma } from "@/lib/prisma/client";
import type { WithAuthenticatedRequest } from "@/server/middleware/authMiddleware";
import type { getQuizByIdRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";
import { revalidateTag } from "next/cache";

export const getQuizByIdHandler: RouteHandler<typeof getQuizByIdRoute, WithAuthenticatedRequest> = async (c) => {
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
    return c.json(null, 403);
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(quizId) },
    select: {
      id: true,
      question: true,
      choices: true,
      updatedAt: true,
      isPublic: true,
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })

  if (!quiz) {
    return c.json(null, 404)
  }

  revalidateTag("my-quiz")

  return c.json(quiz, 200);
}
