"use client"
import MyListHeader from "@/components/organisms/MyListHeader/MyListHeader";
import { QuizCard } from "@/components/organisms/QuizCard";
import { hono } from "@/lib/hono/client";
import type { Quiz } from "@/server/models/quizSchema";
import { useRouter } from "next/navigation";
import { format } from "date-fns"
import PagenationButton from "@/components/molecules/PagenationButton/PagenationButtons";

export default function MyListTemplate({ quizzes, totalPages, currentPage }: { quizzes: Quiz[], totalPages: number, currentPage: string }) {
  const router = useRouter()

  const handleDelete = async (quizId: string) => {
    await hono.api.quzzies[":quizId"].$delete({
      param: { quizId }
    })

    router.refresh()
  }

  const handleNavigation = (page: number) => {
    router.push(`/quiz/my-list?page=${page}`);
  };

  return (
    <div>
      <div className="mb-[40px]">
        <MyListHeader link="/home" />
      </div>
      <div className="relative mx-auto max-w-[700px] space-y-4 px-3">
        {quizzes.map((quiz) => {
          console.log(quiz.id)
          return (
            <div key={quiz.id}>
              <QuizCard
                id={quiz.id}
                handleSubmit={() => handleDelete(String(quiz.id))}
                question={quiz.question}
                choices={quiz.choices}
                isPublic={quiz.isPublic}
                updatedAt={format(quiz.createdAt, "yyyy/MM/dd")}
              />
            </div>
          )
        })}
      </div >
      <PagenationButton totalPages={totalPages} currentPage={Number(currentPage)} prevFn={() => handleNavigation(Number(currentPage) - 1)} nextFn={() => handleNavigation(Number(currentPage) + 1)}/>
    </div >
  );
}
