import { prisma } from "@/lib/prisma/client";
import type { WithAuthenticatedRequest } from "@/server/middleware/authMiddleware";
import type { createCorrectRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";
import { revalidateTag } from "next/cache";

export const createCorrectHandler: RouteHandler<typeof createCorrectRoute, WithAuthenticatedRequest> = async (c) => {
  const { answer } = c.req.valid("json")
  const { quizId } = c.req.param()
  // const session = await auth()

  // if (!session?.user?.id) {
  //   throw Error("認証してください。")
  // }

  // const userId = session.user.id;

  return await prisma.$transaction(async (tx) => {
    // アトミックに isAnswering フラグを true に更新（false の場合のみ更新）
    //更新が完了すると、resultの数が1増えます。
    const result = await tx.user.updateMany({
      where: { id: c.var.userId, isAnswering: false },
      data: { isAnswering: true },
    });
    
    if (result.count === 0) {
      // 既に回答中の場合はリクエストを拒否する
      throw new Error("既に回答中です。");
    }
    
    try {
      const correct = await tx.quiz.findUnique({
        where: { id: Number(quizId) },
        include: {
          choices: {
            where: { isCorrect: true },
          },
        },
      });
    
      //nullの可能性は0なのでバリデーションが必要
      const isCorrect = answer === correct?.choices[0].text;
    
      await tx.user.update({
        where: { id: c.var.userId },
        data: {
          currentStreak: isCorrect ? { increment: 1 } : 0,
          currentQuizId: null,
        },
      });
    
      const message = isCorrect ? "correct" : "uncorrect";
    
      return c.json({ message }, 201);
    } finally {
      // 回答処理終了後に isAnswering フラグを false に戻す
      await tx.user.update({
        where: { id: c.var.userId },
        data: { isAnswering: false, prevQuizId: Number(quizId) },
      });

      revalidateTag("r-quiz")
    }
  });  
}
