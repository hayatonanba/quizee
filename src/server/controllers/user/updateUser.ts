import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { Username } from "@/server/models/userSchema";
import type { updateUsernameRoute } from "@/server/routes/userRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const updateUsernameHandler: RouteHandler<typeof updateUsernameRoute> = async (c) => {
    const { name } = await c.req.json<Username>()
    const { id } = c.req.param()
    const session = await auth()
    
    if (!session?.user?.id) {
        throw Error("認証してください。")
    }
    
    if (session.user.id !== id) {
        throw Error("編集権限がありません")
    }
    
    await prisma.user.update({
        where: { id },
        data: { name },
    })
    
    return c.json({ message: "ユーザー名を更新しました" }, 201)
}