import { prisma } from "@/lib/prisma/client";
import type { WithAuthenticatedRequest } from "@/server/middleware/authMiddleware";
import type { updateQuizRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";
import { revalidateTag } from "next/cache";

export const updateQuizHandler: RouteHandler<typeof updateQuizRoute, WithAuthenticatedRequest> = async (c) => {
  const { question, choices, isPublic } = c.req.valid("json")
  const { quizId } = c.req.param()
  // const session = await auth()

  // if (!session?.user?.id) {
  //   throw Error("認証してください。")
  // }

  const existingQuiz = await prisma.quiz.findUnique({ where: { id: Number(quizId) }, include: { choices: true } });

  if (!existingQuiz) {
    return c.json(null, 404);
  }

  if (c.var.userId !== existingQuiz.userId) {
    throw Error("編集権限がありません")
  }

  // **1. フロントエンドから送信された choice の id を取得**
  const receivedChoiceIds = choices.map(choice => choice.id).filter(Boolean); // id が null/undefined でないもの

  // **2. 削除するべき choice の id を判定**
  const existingChoiceIds = existingQuiz.choices.map(choice => choice.id);
  const choicesToDelete = existingChoiceIds.filter(id => !receivedChoiceIds.includes(id));

  const [_, updateQuiz] = await prisma.$transaction([
    // **3. 先に削除処理を実行**
    prisma.choice.deleteMany({
      where: {
        id: { in: choicesToDelete },
      },
    }),

    // **4. upsert で新規作成 & 更新**
    prisma.quiz.update({
      where: { id: Number(quizId) },
      data: {
        question,
        choices: {
          upsert: choices
            .filter(choice => choice.id) // 既存の選択肢は upsert
            .map(choice => ({
              where: { id: choice.id },
              update: { text: choice.text, isCorrect: choice.isCorrect },
              create: { text: choice.text, isCorrect: choice.isCorrect }, //万が一の処理
            })),
          create: choices
            .filter(choice => !choice.id) // id がないものは新規作成
            .map(choice => ({
              text: choice.text,
              isCorrect: choice.isCorrect,
            })),
        },
        isPublic,
      },
      include: {
        choices: true,
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    }),
  ]);

  revalidateTag("my-quiz")

  return c.json(updateQuiz, 200)
}
