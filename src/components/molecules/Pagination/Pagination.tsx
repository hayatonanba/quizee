import { Button } from "@/components/ui/button";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  totalPages: number
  currentPage: number
  prevFn: () => void
  nextFn: () => void
}

export default function PagenationButton({ totalPages, currentPage, prevFn, nextFn }: Props) {
  return (
    <div className="flex justify-center gap-5 p-16">
      {currentPage > 1 && <Button
        size="lg"
        variant="outline"
        type="button"
        className="rounded-full border-black"
        onClick={prevFn}
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faAngleLeft} className="size-[20px]" />
          前に戻る
        </div>
      </Button>}
      {currentPage < totalPages && <Button
        size="lg"
        variant="outline"
        type="button"
        className="rounded-full border-black"
        onClick={nextFn}
      >
        <div className="flex items-center gap-2">
          次に進む
          <FontAwesomeIcon icon={faAngleRight} className="size-[20px]" />
        </div>
      </Button>}
    </div>
  );
}
