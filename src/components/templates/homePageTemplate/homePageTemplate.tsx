import HomeButtons from "@/components/molecules/HomeButtons/HomeButtons";
import { QuizField } from "@/components/organisms/QuizField";
import { StreakBubbleWithIcon } from "@/components/organisms/StreakBubbleWithIcon";
import type { Choice } from "@/server/models/choiceSchema";

type Props = {
  question: string,
  id: number;
  choices: Choice[],
  iconUrl: string,
  currentStreak: number
}

export default function HomePageTemplate({ question, id, choices, iconUrl, currentStreak }: Props) {
  return (
    <div className="mx-auto flex h-screen max-w-[700px] items-center justify-center px-3">
      <div className="mb-[120px] flex-1">
        <div className="mb-[50px] flex justify-center">
          <StreakBubbleWithIcon iconUrl={iconUrl} streakCount={currentStreak} color="black" />
        </div>
        <div className="mb-[50px]">
          <QuizField id={id} question={question} choices={choices}/>
        </div>
        <div className="flex justify-center">
          <HomeButtons />
        </div>
      </div>
    </div>
  );
}

