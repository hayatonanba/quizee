"use client"

import { ChoiceButton } from "@/components/molecules/ChoiceButton";
import { hono } from "@/lib/hono/client";

type Props = {
  question: string;
  author: string;
  choiceList: ChoiceType[];
  id: number;
};

type ChoiceType = {
  id: number,
  text: string,
  isCorrect: boolean
}

const handleSubmit = async (answer:string, id:number) => {
  const res = await hono.api.quzzies[":quizId"].answer.$post({
    param: {
      quizId : String(id)
    },
    json: {
      answer
    }
  })
  await res.json()
}


export default function QuizField({ question, author, choiceList, id }: Props) {
  return (
    <div className="rounded-xl border border-black px-8 pt-4 pb-7">
      <h2 className="mb-[0.5rem] text-[1.3rem]">Q. {question}</h2>
      <p className="mb-[0.7rem] text-right text-[0.9rem] text-gray-300">
        作問者 : {author}さん
      </p>
      <div className="space-y-3">
        {choiceList.map((choice, i) => (
          <ChoiceButton
            text={choice.text}
            onClickFn={() => handleSubmit(choice.text, id)}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
