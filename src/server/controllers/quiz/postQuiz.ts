import { prisma } from "@/lib/prisma/client";
import type { WithAuthenticatedRequest } from "@/server/middleware/authMiddleware";
import type { createQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";
import { revalidateTag } from "next/cache";

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

  revalidateTag("my-quiz")

  return c.json(quiz, 201);
};
