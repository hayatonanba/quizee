import { auth } from "@/auth";
import HomePageTemplate from "@/components/templates/homePageTemplate/homePageTemplate";
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
    <HomePageTemplate
      question={question}
      choices={choices}
      author={user}
      iconUrl={session?.user?.image ?? ""}
      id={id}
    />
  );
}
