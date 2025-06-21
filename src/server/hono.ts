import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { createQuizHandler } from "./controllers/quiz/postQuiz";
import {
  createCorrectRoute,
  createQuizRoute,
  deleteQuizRoute,
  getCurrentStreakRoute,
  getMyQuizzesRoute,
  getQuizByIdRoute,
  getRandomQuizRoute,
  updateQuizRoute,
} from "./routes/quizRoutes";
import { deleteQuizHandler } from "./controllers/quiz/deleteQuiz";
import { updateQuizHandler } from "./controllers/quiz/updateQuiz";
import { getMyQuizzesHandler } from "./controllers/quiz/getMyQuizzes";
import { getQuizByIdHandler } from "./controllers/quiz/getQuiz";
import { getRandomQuizHandler } from "./controllers/quiz/getRandomQuiz";
import { getCurrentStreakHandler } from "./controllers/quiz/getCurrentStreak";
import { createCorrectHandler } from "./controllers/quiz/postCorrect";
import { authMiddleware, type WithAuthenticatedRequest } from "./middleware/authMiddleware";
import type { Env } from "hono"
import { basicAuth } from "hono/basic-auth";
import { cors } from "hono/cors"


export const app = new OpenAPIHono().basePath("/api");

const quizApp = new OpenAPIHono<Env & WithAuthenticatedRequest>()
  .openapi(getRandomQuizRoute, getRandomQuizHandler)
  .openapi(getCurrentStreakRoute, getCurrentStreakHandler)
  .openapi(createQuizRoute, createQuizHandler)
  .openapi(createCorrectRoute, createCorrectHandler)
  .openapi(updateQuizRoute, updateQuizHandler)
  .openapi(getMyQuizzesRoute, getMyQuizzesHandler)
  .openapi(getQuizByIdRoute, getQuizByIdHandler)
  .openapi(deleteQuizRoute, deleteQuizHandler);

const mainApp = new OpenAPIHono()
  .route("/quzzies", quizApp)

app.use(authMiddleware)
app.use(cors())

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = app.route("/", mainApp)

app.doc("/specification", {
  openapi: "3.0.0",
  info: { title: "Quizee API", version: "1.0.0" },
}).use('/doc/*', async (c, next) => {
  const auth = basicAuth({
    username: process.env.API_DOC_BASIC_AUTH_USER as string,
    password: process.env.API_DOC_BASIC_AUTH_PASS as string,
  });
  return auth(c, next);
}).get("/doc", swaggerUI({ url: "/api/specification" }));

export type AppType = typeof route;
export default app;
