"use client"

import { ChoiceButton } from "@/components/molecules/ChoiceButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { hono } from "@/lib/hono/client";
import type { Choice } from "@/server/models/choiceSchema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  question: string;
  choices: Choice[];
  id: number;
  prevAnswer?: string | null;
  prevQuizQuestion?: string | null; // これは使用されていないので削除
};

export default function QuizField({ question, choices, id, prevAnswer, prevQuizQuestion }: Props) {

  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter()


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsLoading(false);
    setSelected(null);
  }, [id]);

  const handleSubmit = async (answer: string, id: number) => {

    setIsLoading(true)
    setSelected(answer);

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
      toast.success("正解", { duration: 800 })
    } else {
      toast.error("不正解", { duration: 800 })
    }

    router.push("/home");
    router.refresh();
  }

  return (
    <div className="rounded-xl px-3 pt-4 pb-7">
      <Toaster />
      <h2 className="mb-[0.5rem] text-[1.1rem]">Q. {question}</h2>
      <div className="space-y-3">
        {choices.map((choice) => (
          <ChoiceButton
            text={choice.text}
            onClickFn={() => handleSubmit(choice.text, id)}
            isLoading={isLoading}
            isSelected={selected === choice.text}
            key={choice.id}
          />
        ))}
        {[...Array(4 - choices.length)].map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={i} className="h-[40px]" />
        ))}
         <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>前回の問題</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-center">
                <p>問題文：{isLoading ? `${"判定中.."}` : (prevQuizQuestion ?? "なし")}</p>
                <p>正しい答え：{isLoading ? `${"判定中.."}` : (prevAnswer ?? "なし")}</p>                                
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
