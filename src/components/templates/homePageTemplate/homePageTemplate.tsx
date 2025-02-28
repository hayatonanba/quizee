import HomeButtons from "@/components/molecules/HomeButtons/HomeButtons";
import { QuizField } from "@/components/organisms/QuizField";
import { StreakBubbleWithIcon } from "@/components/organisms/StreakBubbleWithIcon";
import type { Choice } from "@/server/models/choiceSchema";
import type { User } from "@/server/models/userSchema";

type Props = {
  author: User,
  question: string,
  id: number;
  choices: Choice[],
  iconUrl: string
}

export default function HomePageTemplate({ author, question, id, choices, iconUrl }: Props) {
  return (
    <div className="mx-auto flex h-screen max-w-[700px] items-center justify-center px-3">
      <div className="mb-[120px] flex-1">
        <div className="mb-[50px] flex justify-center">
          <StreakBubbleWithIcon iconUrl={iconUrl} streakCount={0} color="black" />
        </div>
        <div className="mb-[50px]">
          <QuizField id={id} question={question} choices={choices} author={author.name as string} />
        </div>
        <div className="flex justify-center">
          <HomeButtons />
        </div>
      </div>
    </div>
  );
}

