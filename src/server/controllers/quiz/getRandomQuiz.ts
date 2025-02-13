import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { getRandomQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const getRandomQuizHandler: RouteHandler<typeof getRandomQuizRoute> = async (c) => {
  const count = await prisma.quiz.count({ where: { isPublic: true } });
  const skip = Math.floor(Math.random() * count);

  const session = await auth()

  if (!session?.user?.id) {
    throw Error("認証してください。")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
    throw Error("ユーザーが存在しません。")
  }

  const { currentQuizId } = user

  if (currentQuizId) {
    const quiz = await prisma.quiz.findUnique({
      where: { id: currentQuizId },
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

    if (!quiz) {
      const quizzes = await prisma.quiz.findMany({
        where: { isPublic: true },
        take: 1,
        skip: skip,
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
      });
    
      await prisma.user.update({
        where: {id: session.user.id},
        data: {
          currentQuizId: quizzes[0].id
        }
      })

      return c.json(quizzes[0], 200);
    }

    return c.json(quiz, 200)
  }

  const quizzes = await prisma.quiz.findMany({
    where: { isPublic: true },
    take: 1,
    skip: skip,
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
  });

  await prisma.user.update({
    where: {id: session.user.id},
    data: {
      currentQuizId: quizzes[0].id
    }
  })

  return c.json(quizzes[0], 200)
}
