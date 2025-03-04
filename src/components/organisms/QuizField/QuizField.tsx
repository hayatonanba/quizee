"use client"

import { ChoiceButton } from "@/components/molecules/ChoiceButton";
import { hono } from "@/lib/hono/client";
import type { Choice } from "@/server/models/choiceSchema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  question: string;
  author: string;
  choices: Choice[];
  id: number;
};

export default function QuizField({ question, author, choices, id }: Props) {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsLoading(false);
  }, [id]);

  const handleSubmit = async (answer: string, id: number) => {

    setIsLoading(true)

    const res = await hono.api.quzzies[":quizId"].answer.$post({
      param: {
        quizId: String(id)
      },
      json: {
        answer
      }
    })
    const result = await res.json()

    toast.dismiss();

    if (result.message === "correct") {
      toast.success("正解")
    } else {
      toast.error("不正解")
    }

    router.push("/home");
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-black px-8 pt-4 pb-7">
      <Toaster />
      <h2 className="mb-[0.5rem] text-[1.3rem]">Q. {question}</h2>
      <p className="mb-[0.7rem] text-right text-[0.9rem] text-gray-300">
        作問者 : {author}さん
      </p>
      <div className="space-y-3">
        {choices.map((choice, i) => (
          <ChoiceButton
            text={choice.text}
            onClickFn={() => handleSubmit(choice.text, id)}
            isLoading={isLoading}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
