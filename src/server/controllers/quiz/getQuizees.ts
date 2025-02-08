import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { CreateQuiz } from "@/server/models/quizSchema";
import type { createQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";
import { revalidateTag } from "next/cache";

export const createQuizHandler: RouteHandler<typeof createQuizRoute> = async (c) => {
  const { question, choices } = await c.req.json<CreateQuiz>();

  const session = await auth()

  if (!session?.user?.id) {
    throw Error("認証してください。")
  }

  const quiz = await prisma.quiz.create({
    data:{
      userId: session.user.id,
      question,
      choices: {
        create: choices.map(choice => ({
          text: choice.text,
          isCorrect: choice.isCorrect,
        })),
      }
    },
    include: {
      choices: true,
      user: true
    }
  })

  revalidateTag("posts")
  return c.json(quiz, 201);
};
