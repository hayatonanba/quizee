import { Badge } from "@/components/atoms/Badge";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
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
  handleSubmit: () => void
}

export default function QuizCard({ id, question, choices, isPublic, updatedAt, handleSubmit }: Props) {

  const status = isPublic ? "public" : "private"

  return (
    <div className="relative flex h-[130px] flex-col justify-between rounded-xl border border-black px-6 py-5">
      <Link href={`/quiz/${id}/edit`} className="absolute inset-0 h-[130px] w-full" />
      <div className="flex items-center justify-between">
        <h3 className="text-[1.2rem]">{question}</h3>
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-md border hover:bg-gray-100">
              <FontAwesomeIcon icon={faEllipsisVertical} className="size-[20px]" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="relative z-10 w-[150px] rounded-md border px-3 py-2 shadow-md" align="end">
            <button type="button" className="flex items-center gap-2" onClick={handleSubmit}>
              <FontAwesomeIcon icon={faTrash} />削除する
            </button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-[0.9rem]">選択肢数 : {choices.length}/4</p>
          <Badge varient={status} />
        </div>
        <p className="text-[0.9rem] text-gray-300">最終編集日：{updatedAt}</p>
      </div>
    </div>
  );
}
