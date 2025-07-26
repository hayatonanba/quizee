import { auth } from "@/auth";
import MyListTemplate from "@/components/templates/myListTemplate/myListTemplate";
import { hono } from "@/lib/hono/client";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { z } from "zod";

type SearchParams = { page: string }

const ParamsSchema = z.object({
  page: z
    .coerce
    .number() 
    .int()    
    .min(1)     
    .default(1) 
});

export default async function Page({ searchParams }: { searchParams: SearchParams }) {

  const session = await auth()

  if (!session) {
    return <div>認証してください。</div>
  }

  const parsed = ParamsSchema.safeParse(searchParams);
  if (!parsed.success) {
    notFound();
  }
  const { page } = parsed.data;

  const cookieHeader = cookies().toString();

  const res = await hono.api.quzzies.mine.$get({
    query: {
      page: String(page) ?? "1"
    }
  }, {
    init: {
      headers: { cookie: cookieHeader },
      cache: "force-cache",
      next: {
        tags: ["my-quiz"]
      }
    }
  })

  const content = await res.json()
  const { quizzes, totalPages } = content

  if(quizzes.length === 0){
    notFound()
  }

  return (
    <MyListTemplate quizzes={quizzes} totalPages={totalPages} currentPage={String(page)} />
  );
}
