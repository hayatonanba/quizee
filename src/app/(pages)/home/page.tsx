import { auth } from "@/auth";
import HomeButtons from "@/components/molecules/HomeButtons/HomeButtons";
import { QuizField } from "@/components/organisms/QuizField";
import { StreakBubbleWithIcon } from "@/components/organisms/StreakBubbleWithIcon";
import { hono } from "@/lib/hono/client";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth()

  if (!session) {
    return <div>認証してください。</div>
  }

  const res = await hono.api.quzzies.random.$get({}, {
    init: {
      cache: "no-store",
      headers: headers()
    }
  })

  const randomQuiz = await res.json()

  if (!randomQuiz) {
    return <div>クイズがありません。</div>
  }

  const { question, choices, user, id } = randomQuiz

  return (
    <div className="mx-auto flex h-screen max-w-[700px] items-center justify-center px-3">
      <div className="mb-[120px] flex-1">
        <div className="mb-[50px] flex justify-center">
          <StreakBubbleWithIcon iconUrl={session.user?.image ?? ""} streakCount={0} color="black" />
        </div>
        <div className="mb-[50px]">
          <QuizField id={id} question={question} choiceList={choices} author={user.name as string} />
        </div>
        <div className="flex justify-center">
          <HomeButtons />
        </div>
      </div>
    </div>
  );
}
