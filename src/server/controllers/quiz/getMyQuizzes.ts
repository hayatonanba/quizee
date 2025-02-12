import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { getMyQuizzesRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const getMyQuizzesHandler: RouteHandler<typeof getMyQuizzesRoute> = async (c) => {
  const { page } = c.req.query()
  const skip = (Number(page) -1) *10
  const session = await auth()
  
    if (!session?.user?.id) {
      throw Error("認証してください。")
    }
  
  const quizzes = await prisma.quiz.findMany({
    where:  { userId: session.user.id },
    skip,
    take: 10,
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

  const totalCount = await prisma.quiz.count({ where: { userId: session.user.id } })
  const totalPages = Math.ceil(totalCount / 10)

  return c.json({quizzes,totalCount,totalPages},200)
}