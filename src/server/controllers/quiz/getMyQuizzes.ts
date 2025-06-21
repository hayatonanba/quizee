import { prisma } from "@/lib/prisma/client";
import type { WithAuthenticatedRequest } from "@/server/middleware/authMiddleware";
import type { getMyQuizzesRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const getMyQuizzesHandler: RouteHandler<typeof getMyQuizzesRoute, WithAuthenticatedRequest> = async (c) => {
  const { page } = c.req.query()

  // const session = await auth()

  // if (!session?.user?.id) {
  //   throw Error("認証してください。")
  // }

  const pageSize = 5
  const skip = (Number(page) - 1) * pageSize

  const quizzes = await prisma.quiz.findMany({
    where: { userId: c.var.userId },
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
    include: {
      choices: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  })

  const totalCount = await prisma.quiz.count({ where: { userId: c.var.userId } })
  const totalPages = Math.ceil(totalCount / pageSize)

  return c.json({ quizzes, totalCount, totalPages }, 200)
}
