import { Badge } from "@/components/atoms/Badge";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";

export type Props = {
  question: string,
  choices: {
    text: string;
    isCorrect: boolean;
  }[],
  isPublic: boolean,
  updatedAt: string;
  handleSubmit: () => void
}

export default function QuizCard({ question, choices, isPublic, updatedAt, handleSubmit }: Props) {

  const status = isPublic ? "public" : "private"

  return (
    <div className="flex h-[130px] flex-col justify-between rounded-xl border border-black px-6 py-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[1.2rem]">{question}</h3>
        <Popover>
          <PopoverTrigger asChild>
            <button type="button">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[150px] rounded-md border px-3 py-2 shadow-md" align="end">
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
