import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { getCurrentStreakRoute } from "@/server/routes/quizRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const getCurrentStreakHandler: RouteHandler<typeof getCurrentStreakRoute> = async (c) => {
  const session = await auth()
  
    if (!session?.user?.id) {
      throw Error("認証してください。")
    }

  const currentStreakNumber = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      currentStreak: true
    }
  })

  if (!currentStreakNumber) {
    return c.json({ currentStreak: 0 })
  }

  return c.json(currentStreakNumber, 200);
}