import { auth } from "@/auth";
import type { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory"
import { HTTPException } from 'hono/http-exception';
import type { Session } from "next-auth";

export type WithAuthenticatedRequest = { Variables: { userId: string; session: Session } };

export const authMiddleware: MiddlewareHandler<WithAuthenticatedRequest> =
  createMiddleware(async (c, next) => {
    const session = await auth();

    if (!session?.user?.id) {
      throw new HTTPException(401, { message: "認証が必要です。" });
    }

    c.set('userId', session.user.id);
    c.set('session', session);

    await next();
  });
