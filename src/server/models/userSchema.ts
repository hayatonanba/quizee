import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
  id: z.string().openapi({
    example: "aaaaaaa"
  }),
  name: z.string().nullable().openapi({
    example: "y_ta"
  }),
  image: z.string().nullable().openapi({
    example: "https://avatars.githubusercontent.com/u/129815120?v=4"
  }),
});

export const UsernameSchema = z.object({
  name: z.string().openapi({
    example: "potekichi"
  }),
});

export type User = z.infer<typeof UserSchema>
export type Username = z.infer<typeof UsernameSchema>
