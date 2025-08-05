import { prisma } from "@/lib/prisma/client";
import type { WithAuthenticatedRequest } from "@/server/middleware/authMiddleware";
import type { getRandomQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const getRandomQuizHandler: RouteHandler<typeof getRandomQuizRoute, WithAuthenticatedRequest> = async (c) => {

  // const session = await auth();

  // if (!session?.user?.id) {
  //   throw Error("認証してください。");
  // }

  const user = await prisma.user.findUnique({
    where: { id: c.var.userId },
  });

  if (!user) {
    throw Error("ユーザーが存在しません。");
  }

  const { currentQuizId } = user

  // currentQuizId が存在する場合は、そのクイズを返す
  //新しい問題が欲しい(currentQuizIdがnullの時はこの処理を飛ばす)
  if (currentQuizId) {
    const quiz = await prisma.quiz.findUnique({
      where: { id: currentQuizId },
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
    });
    if (quiz) {
      const prevQuiz =
      user.prevQuizId
        ? await prisma.quiz.findUnique({
            where: { id: user.prevQuizId },
            select: { question: true },
          })
        : null;
      
      const correct = await prisma.quiz.findUnique({
        where: { id: user.prevQuizId as number },
        include: {
          choices: {
            where: { isCorrect: true },
          },
        },
      });

      const ArrangedQuiz = {
        ...quiz,
        prevAnswer: correct ? correct.choices[0].text : "問題がありません",
        prevQuiz: prevQuiz ? prevQuiz.question : "問題がありません",
      }

      return c.json(ArrangedQuiz, 200);
    }
  }

  // 公開されてて、直前の問題(prevQuizId)と被らないようにする条件を用意
  const whereClause = {
    isPublic: true,
    // prevQuizId が truthy なときだけ id を除外条件に追加
    ...(user.prevQuizId ? { id: { not: user.prevQuizId } } : {}),
  };

  // 条件にあったクイズ件数を取得
  const count = await prisma.quiz.count({ where: whereClause });

  // ランダムなスキップ数を決定してクイズを1件取得
  const skip = Math.floor(Math.random() * count);
  const quizzes = await prisma.quiz.findMany({
    where: whereClause,
    take: 1,
    skip: skip,
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
  });

  const newQuiz = quizzes[0]

  await prisma.user.update({
    where: { id: c.var.userId },
    data: {
      prevQuizId: currentQuizId,
      currentQuizId: newQuiz.id,
    }
  });

  const correct = await prisma.quiz.findUnique({
    where: { id: user.prevQuizId as number },
    include: {
      choices: {
        where: { isCorrect: true },
      },
    },
  });

  const prevQuiz =
  user.prevQuizId
    ? await prisma.quiz.findUnique({
        where: { id: user.prevQuizId },
        select: { question: true },
      })
    : null;

  const ArrangedNewQuiz = {
    ...newQuiz,
    prevAnswer: correct ? correct.choices[0].text : "問題が削除されてしまいました。",
    prevQuiz: prevQuiz ? prevQuiz.question : "問題が削除されてしまいました。",
  } 

  return c.json(ArrangedNewQuiz, 200);
}
