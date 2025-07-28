import { auth } from "@/auth";
import HomePageTemplate from "@/components/templates/homePageTemplate/homePageTemplate";
import { hono } from "@/lib/hono/client";
import { cookies } from "next/headers";

export default async function Page() {
  const session = await auth()

  if (!session) {
    return <div>認証してください。</div>
  }

  const cookieHeader = cookies().toString();

  const [quizRes, streakRes] = await Promise.all([
    hono.api.quzzies.random.$get({},
      { init: { cache: "force-cache", next: { tags: ["r-quiz"] }, headers: { cookie: cookieHeader } } }
    ),
    hono.api.quzzies.currentStreak.$get({},
      { init: { cache: "force-cache", next: { tags: ["r-quiz"] }, headers: { cookie: cookieHeader }} }
    )
  ]);

  const randomQuiz = await quizRes.json();
  const streakData = await streakRes.json();

  if (!randomQuiz) {
    return <div>クイズがありません。</div>
  }

  const { question, choices, id } = randomQuiz
  const { currentStreak } = streakData

  return (
    <HomePageTemplate
      question={question}
      choices={choices}
      iconUrl={session?.user?.image ?? ""}
      currentStreak={currentStreak}
      id={id}
      prevAnswer={randomQuiz.prevAnswer} 
      prevQuizQuestion={randomQuiz.prevQuiz}
    />
  );
}
