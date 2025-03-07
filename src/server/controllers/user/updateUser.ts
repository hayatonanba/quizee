import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/client";
import type { Username } from "@/server/models/userSchema";
import type { updateUsernameRoute } from "@/server/routes/userRoutes";
import type { RouteHandler } from "@hono/zod-openapi";

export const updateUsernameHandler: RouteHandler<typeof updateUsernameRoute> = async (c) => {
    const { name } = c.req.valid("json") 
    const session = await auth()
    
    if (!session?.user?.id) {
        throw Error("認証してください。")
    }
    
    await prisma.user.update({
        where: { id:session.user.id },
        data: { name },
    })
    
    return c.json(200);
}