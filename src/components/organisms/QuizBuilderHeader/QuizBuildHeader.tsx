import { Button } from "@/components/atoms/Button";
import { SwitchButton } from "@/components/atoms/SwitchButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  onClickFn: () => void;
  isChecked: boolean;
  handleToggle: () => void;
}

export default function QuizBuildHeader({ onClickFn, isChecked, handleToggle }: Props) {

  return (
    <div className="border-gray-300 border-b">
      <header className="container mx-auto flex h-[70px] items-center justify-between px-3">
        <Link href="/home"><FontAwesomeIcon className="size-7" icon={faArrowLeft} /></Link>
        <div className="flex items-center gap-5">
          <SwitchButton handleToggle={handleToggle} isChecked={isChecked} />
          <Button type="submit" size="sm" onClickFn={onClickFn}>
            {isChecked ? "公開する": "保存する"}
          </Button>
        </div>
      </header>
    </div>
  );
}
