import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { getRandomQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const getRandomQuizHandler: RouteHandler<typeof getRandomQuizRoute> = async (c) => {
 
  const session = await auth();
  
  if (!session?.user?.id) {
    throw Error("認証してください。");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    throw Error("ユーザーが存在しません。");
  }

  const { currentQuizId } = user

  // currentQuizId が存在する場合は、そのクイズを返す
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
    });
    if (quiz) {
      return c.json(quiz, 200);
    }
  }

  // 直前の問題(prevQuizId)と被らないようにする条件を用意
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const whereClause: any = { isPublic: true };

  if (user.prevQuizId) {
    whereClause.id = { not: user.prevQuizId };
  }

  // 条件にあったクイズ件数を取得
  const count = await prisma.quiz.count({ where: whereClause });

  // ランダムなスキップ数を決定してクイズを1件取得
  const skip = Math.floor(Math.random() * count);
  const quizzes = await prisma.quiz.findMany({
    where: whereClause,
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

  const newQuiz = quizzes[0];

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      prevQuizId: currentQuizId,
      currentQuizId: newQuiz.id,
    }
  });

  return c.json(newQuiz, 200);
}
