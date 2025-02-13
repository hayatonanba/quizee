"use client"

import { ChoiceButton } from "@/components/molecules/ChoiceButton";

type Props = {
  question: string;
  author: string;
  choiceList: ChoiceType[];
};

type ChoiceType = {
  id: number,
  text: string,
  isCorrect: boolean
}



export default function QuizField({ question, author, choiceList }: Props) {
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
            onClickFn={() => console.log("yes")}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
