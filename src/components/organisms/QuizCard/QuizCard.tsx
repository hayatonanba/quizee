import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";

export type Props = {
  id: number,
  question: string,
  choices: {
    text: string;
    isCorrect: boolean;
  }[],
  isPublic: boolean,
  updatedAt: string;
  handleSubmit: () => void,
  isDeleting: boolean;
}

function truncate(text: string, maxLength = 20): string {
  return text.length >= maxLength
    ? `${text.slice(0, maxLength)}...`
    : text;
}

export default function QuizCard({ id,
  question,
  choices,
  isPublic,
  updatedAt,
  handleSubmit,
  isDeleting
}: Props) {

  const status = isPublic ? "public" : "private"

  return (
    <div className="relative flex h-[130px] flex-col justify-between rounded-xl border border-black px-6 py-5">
      <Link href={`/quiz/${id}/edit`} className="absolute inset-0 h-[130px] w-full" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-md sm:text-[1.2rem]">{truncate(question)}</h3>
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-md border hover:bg-gray-100">
              <FontAwesomeIcon icon={faEllipsisVertical} className="size-[20px]" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="relative z-10 w-[120px] rounded-md border p-0 shadow-md" align="end">
            <Button
              variant="ghost"
              type="button"
              disabled={isDeleting}
              className="flex w-full items-center gap-2"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faTrash} />削除する
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-[0.9rem]">選択肢 : {choices.length}/4</p>
          <Badge varient={status} />
        </div>
        <p className="text-[0.9rem] text-gray-300">{updatedAt}</p>
      </div>
    </div>
  );
}
