import { ChoiceButton } from "@/components/molecules/ChoiceButton";

type Props = {
  question: string;
  author: string;
  choiceList: ChoiceListType[];
};

type ChoiceListType = {
  text: string;
  onClickFn: () => void;
};

export default function QuizField({ question, author, choiceList }: Props) {
  return (
    <div className="w-2/5 border border-black px-8 pb-7 pt-4 rounded-xl">
      <h2 className="text-[1.3rem] mb-[0.5rem]">Q. {question}</h2>
      <p className="text-right mb-[0.7rem] text-gray-300 text-[0.9rem]">
        作問者 : {author}さん
      </p>
      <div className="space-y-3">
        {choiceList.map((choice, i) => (
          <ChoiceButton
            text={choice.text}
            onClickFn={choice.onClickFn}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
