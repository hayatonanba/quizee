import { createRoute, z } from "@hono/zod-openapi";
import { MessageSchema } from "../models/othersSchema";
import { UsernameSchema } from "../models/userSchema";
export const updateUsernameRoute = createRoute({
    path: "/users/{id}",
    method: "post",
    description: "ユーザー名を更新",
    request:{
        body: {
            content: {
                "application/json": {
                    schema: UsernameSchema
                }
            }
        }
    },
    responses:{
        201: {
            description: "成功",
            content: {
                "application/json": {
                    schema: MessageSchema
                }
            }
        }
    }
}) 