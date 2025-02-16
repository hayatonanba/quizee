import MyListTemplate from "@/components/templates/myListTemplate/myListTemplate";
import { hono } from "@/lib/hono/client";
import { headers } from "next/headers";

type SearchParams = { page: string }

export default async function Page({ searchParams }: { searchParams: SearchParams }) {

  const { page } = searchParams

  const res = await hono.api.quzzies.mine.$get({
    query: {
      page: page ?? "1"
    }
  }, {
    init: {
      cache: "no-store",
      headers: headers()
    }
  })

  const content = await res.json()
  const { quizzes, totalPages } = content

  return (
    <>
      <MyListTemplate quizzes={quizzes} totalPages={totalPages} currentPage={page} />
    </>
  );
}
