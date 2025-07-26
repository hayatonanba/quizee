"use client";

import PagenationButton from "@/components/molecules/Pagination/Pagination";
import MyListHeader from "@/components/organisms/MyListHeader/MyListHeader";
import { QuizCard } from "@/components/organisms/QuizCard";
import { Button } from "@/components/ui/button";
import { hono } from "@/lib/hono/client";
import type { Quiz } from "@/server/models/quizSchema";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  quizzes: Quiz[];
  totalPages: number;
  currentPage: string;
};

export default function MyListTemplate({
  quizzes,
  totalPages,
  currentPage,
}: Props) {

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (quizId: string) => {
    setIsDeleting(true)
    try {
      const res = await hono.api.quzzies[":quizId"].$delete({
        param: { quizId },
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error("削除に失敗しました。", err)
    } finally {
      setIsDeleting(false)
    }
  };

  const handleNavigation = (page: number) => {
    router.push(`/quiz/my-list?page=${page}`);
  };

  return (
    <div className="min-h-[calc(100vh-60px)]">
      <div className="mb-[40px]">
        <MyListHeader link="/home" />
      </div>
      <div className="relative mx-auto max-w-[700px] space-y-4 px-3">
        {quizzes.length === 0 && (
          <div className="text-center">
            <p className="mb-3 font-semibold text-gray-400">さあ、新しいクイズを作ろう！</p>
            <Button
              asChild
              size="lg"
              variant="outline"
              type="button"
              className="rounded-full border-black"
            >
              <Link className="flex items-center gap-2" href="/quiz/new">
                <FontAwesomeIcon icon={faPencil} className="size-[20px]" />
                作問する
              </Link>
            </Button>
          </div>
        )}
        {quizzes.map((quiz) => {
          return (
            <div key={quiz.id}>
              <QuizCard
                id={quiz.id}
                handleSubmit={() => handleDelete(String(quiz.id))}
                question={quiz.question}
                choices={quiz.choices}
                isPublic={quiz.isPublic}
                updatedAt={format(quiz.updatedAt, "yyyy/MM/dd")}
                isDeleting={isDeleting}
              />
            </div>
          );
        })}
      </div>
      <PagenationButton
        totalPages={totalPages}
        currentPage={Number(currentPage)}
        prevFn={() => handleNavigation(Number(currentPage) - 1)}
        nextFn={() => handleNavigation(Number(currentPage) + 1)}
      />
    </div>
  );
}
