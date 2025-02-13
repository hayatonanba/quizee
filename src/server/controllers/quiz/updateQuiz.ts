import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { UpdateQuiz } from "@/server/models/quizSchema";
import type { updateQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const updateQuizHandler: RouteHandler<typeof updateQuizRoute> = async (c) => {
  const { question, choices, isPublic } = await c.req.json<UpdateQuiz>()
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

    const updateQuiz = await prisma.quiz.update({
      where: { id: Number(quizId) },
      data:{
        question,
        choices: {
          update: choices.map(choice => ({
            where: { id: choice.id },
            data: {
              text: choice.text,
              isCorrect: choice.isCorrect,
            }
          })),
        },
        isPublic,
      },
      include: {
        choices: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
     })

    return c.json(updateQuiz, 200)
}