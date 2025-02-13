import { Button } from "@/components/atoms/Button";
import { faList, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function HomeButtons() {
  return (
    <div className="flex gap-5">
      <Button size="sm" type="button">
        <Link className="flex items-center gap-2" href="/quiz/new">
          <FontAwesomeIcon icon={faPencil} className="size-[20px]"/>
          作問する
        </Link>
      </Button>
      <Button size="sm" type="button">
        <Link className="flex items-center gap-2" href="/quiz/my-list">
          <FontAwesomeIcon icon={faList} className="size-[20px]"/>
          作問リスト
        </Link>
      </Button>
    </div>
  );
}
