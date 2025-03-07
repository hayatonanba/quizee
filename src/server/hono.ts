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
import { updateUsernameRoute } from "./routes/userRoutes";
import { deleteQuizHandler } from "./controllers/quiz/deleteQuiz";
import { updateQuizHandler } from "./controllers/quiz/updateQuiz";
import { getMyQuizzesHandler } from "./controllers/quiz/getMyQuizzes";
import { getQuizByIdHandler } from "./controllers/quiz/getQuiz";
import { getRandomQuizHandler } from "./controllers/quiz/getRandomQuiz";
import { getCurrentStreakHandler } from "./controllers/quiz/getCurrentStreak";
import { createCorrectHandler } from "./controllers/quiz/postCorrect";
import { updateUsernameHandler } from "./controllers/user/updateUser";

export const app = new OpenAPIHono().basePath("/api");

const quizApp = new OpenAPIHono()
  .openapi(getRandomQuizRoute, getRandomQuizHandler)
  .openapi(getCurrentStreakRoute, getCurrentStreakHandler)
  .openapi(createQuizRoute, createQuizHandler)
  .openapi(createCorrectRoute, createCorrectHandler)
  .openapi(updateQuizRoute, updateQuizHandler)
  .openapi(getMyQuizzesRoute, getMyQuizzesHandler)
  .openapi(getQuizByIdRoute, getQuizByIdHandler)
  .openapi(deleteQuizRoute, deleteQuizHandler);

const userApp = new OpenAPIHono().openapi(
  updateUsernameRoute,
  updateUsernameHandler
);

const mainApp = new OpenAPIHono()
  .route("/quizzies", quizApp)
  .route("/users", userApp);

const route = app.route("/", mainApp);

app.doc("/specification", {
  openapi: "3.0.0",
  info: { title: "Blog API", version: "1.0.0" },
});

app.get("/doc", swaggerUI({ url: "/api/specification" }));

export type AppType = typeof route;
export default app;
