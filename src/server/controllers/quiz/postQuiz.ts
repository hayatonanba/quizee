import { prisma } from "@/lib/prisma/client";
import type { WithAuthenticatedRequest } from "@/server/middleware/authMiddleware";
import type { createQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const createQuizHandler: RouteHandler<typeof createQuizRoute, WithAuthenticatedRequest> = async (c) => {
  const { question, choices, isPublic } = c.req.valid("json");

  // const session = await auth()

  // if (!session?.user?.id) {
  //   throw Error("認証してください。")
  // }

  const quiz = await prisma.quiz.create({
    data:{
      userId: c.var.userId,
      question,
      isPublic,
      choices: {
        create: choices.map(choice => ({
          text: choice.text,
          isCorrect: choice.isCorrect,
        })),
      }
    },
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

  return c.json(quiz, 201);
};
