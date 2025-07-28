import HomeButtons from "@/components/molecules/HomeButtons/HomeButtons";
import { QuizField } from "@/components/organisms/QuizField";
import { StreakBubbleWithIcon } from "@/components/organisms/StreakBubbleWithIcon";
import type { Choice } from "@/server/models/choiceSchema";

type Props = {
  question: string,
  id: number;
  choices: Choice[],
  iconUrl: string,
  currentStreak: number,
  prevAnswer?: string | null;
  prevQuizQuestion?: string | null;
}

export default function HomePageTemplate({ question, id, choices, iconUrl, currentStreak, prevAnswer, prevQuizQuestion }: Props) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-60px)] max-w-[650px] items-center justify-center px-2">
      <div className="mb-[50px] flex-1 md:mb-[90px]">
        <div className="mb-[50px] flex justify-center">
          <StreakBubbleWithIcon iconUrl={iconUrl} streakCount={currentStreak} color="black" />
        </div>
        <div className="mb-[50px]">
          <QuizField id={id} question={question} choices={choices} prevAnswer={prevAnswer} prevQuizQuestion={prevQuizQuestion} />
        </div>
        <div className="flex justify-center">
          <HomeButtons />
        </div>
      </div>
    </div>
  );
}

