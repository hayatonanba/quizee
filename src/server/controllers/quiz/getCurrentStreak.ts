import { prisma } from "@/lib/prisma/client";
import type { WithAuthenticatedRequest } from "@/server/middleware/authMiddleware";
import type { getCurrentStreakRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const getCurrentStreakHandler: RouteHandler<typeof getCurrentStreakRoute, WithAuthenticatedRequest> = async (c) => {
  // const session = await auth()

  // if (!session?.user?.id) {
  //   throw Error("認証してください。")
  // }

  const currentStreak  = await prisma.user.findUnique({
    where: { id: c.var.userId },
    select: {
      currentStreak: true
    }
  })

  if (!currentStreak) {
    throw Error("ユーザーがいません。")
  }

  return c.json(currentStreak, 200);
}
