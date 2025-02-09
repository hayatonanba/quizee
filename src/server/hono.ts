import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { createQuizHandler } from "./controllers/quiz/postQuiz";
import { createQuizRoute, deleteQuizRoute } from "./routes/quizRoutes";
import { deleteQuizHandler } from "./controllers/quiz/deleteQuiz";

export const app = new OpenAPIHono().basePath("/api");

const quizApp = new OpenAPIHono()
  .openapi(createQuizRoute, createQuizHandler)
  .openapi(deleteQuizRoute, deleteQuizHandler)

const route = app.route("/quzzies", quizApp);

app.doc("/specification", {
  openapi: "3.0.0",
  info: { title: "Blog API", version: "1.0.0" },
});

app.get("/doc", swaggerUI({ url: "/api/specification" }));

export type AppType = typeof route;
export default app;
