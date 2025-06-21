import { auth } from "@/auth";
import HomePageTemplate from "@/components/templates/homePageTemplate/homePageTemplate";
import { hono } from "@/lib/hono/client";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth()

  if (!session) {
    return <div>認証してください。</div>
  }

  const [quizRes, streakRes] = await Promise.all([
    hono.api.quzzies.random.$get({}, { init: { cache: "no-store", headers: headers() } }),
    hono.api.quzzies.currentStreak.$get({}, { init: { cache: "no-store", headers: headers() } })
  ]);

  const randomQuiz = await quizRes.json();
  const streakData = await streakRes.json();

  if (!randomQuiz) {
    return <div>クイズがありません。</div>
  }

  const { question, choices, id } = randomQuiz
  const { currentStreak }  = streakData

  return (
    <HomePageTemplate
      question={question}
      choices={choices}
      iconUrl={session?.user?.image ?? ""}
      currentStreak={currentStreak}
      id={id}
    />
  );
}
