"use client"
import MyListHeader from "@/components/organisms/MyListHeader/MyListHeader";
import { QuizCard } from "@/components/organisms/QuizCard";
import { hono } from "@/lib/hono/client";
import type { Quiz } from "@/server/models/quizSchema";
import { useRouter } from "next/navigation";
import { format } from "date-fns"
import Link from "next/link";

export default function MyListTemplate({ quizzes }: { quizzes: Quiz[] }) {

  const router = useRouter()

  const handleDelete = async (quizId: string) => {
    await hono.api.quzzies[":quizId"].$delete({
      param: { quizId }
    })

    router.refresh()
  }

  return (
    <div>
      <div className="mb-[40px]">
        <MyListHeader link="/home" />
      </div>
      <div className="relative mx-auto max-w-[700px] space-y-4 px-3">
        {quizzes.map((quiz) => (
          <div key={quiz.id}>
            <Link href={`/quiz/${quiz.id}/edit`} className="absolute inset-0 w-full" />
            <QuizCard
              handleSubmit={() => handleDelete(String(quiz.id))}
              question={quiz.question}
              choices={quiz.choices}
              isPublic={quiz.isPublic}
              updatedAt={format(quiz.createdAt, "yyyy/MM/dd")}
            />
          </div>
        ))}
      </div >
    </div >
  );
}
