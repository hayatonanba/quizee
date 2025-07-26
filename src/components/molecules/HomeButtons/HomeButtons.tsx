import { Button } from "@/components/ui/button";
import { faList, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function HomeButtons() {
  return (
    <div className="flex gap-5">
      <Button
        size="lg" type="button" variant="outline"
        className="rounded-full border border-black"
        asChild
      >
        <Link className="flex items-center gap-2" href="/quiz/new">
          <FontAwesomeIcon icon={faPencil} className="size-[20px]" />
          作問する
        </Link>
      </Button>
      <Button
        size="lg" type="button" variant="outline"
        className="rounded-full border border-black"
        asChild
      >
        <Link className="flex items-center gap-2" href="/quiz/my-list">
          <FontAwesomeIcon icon={faList} className="size-[20px]" />
          作問リスト
        </Link>
      </Button>
    </div>
  );
}
