import EditQuizTemplate from "@/components/templates/editQuizTemplate/editQuizTemplate";
import { hono } from "@/lib/hono/client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
export default async function Page({ params }: { params: { quizId: string } }) {

  const { quizId } = params

  const res = await hono.api.quzzies[":quizId"].$get({
    param: {
      quizId: quizId
    }
  }, {
    init: {
      cache: "no-store",
      headers: headers()
    }
  })

  if (res.status === 403) {
    return <p>編集権限がありません。</p>
  }

  if (res.status === 404) {
    notFound()
  }

  const quiz = await res.json()

  const { id, question, choices, isPublic } = quiz

  const choicesWithLocalId = choices.map((choice, index) => ({
    ...choice,
    localId: Date.now() + index,
  }));

  return (
    <>
      <EditQuizTemplate id={id} question={question} choices={choicesWithLocalId} isPublic={isPublic} />
    </>
  );
}
