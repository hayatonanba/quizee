import { SwitchButton } from "@/components/atoms/SwitchButton";
import { Button } from "@/components/ui/button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Globe2, Loader2, Save } from "lucide-react";
import Link from "next/link";

type Props = {
  onClickFn: () => void;
  isChecked: boolean;
  handleToggle: () => void;
  isSubmmitting: boolean;
}

export default function QuizBuildHeader({ onClickFn, isChecked, handleToggle, isSubmmitting }: Props) {

  return (
    <div className="border-gray-300 border-b">
      <header className="container mx-auto flex h-[70px] items-center justify-between px-3">
        <Link href="/home"><FontAwesomeIcon className="size-7" icon={faArrowLeft} /></Link>
        <div className="flex items-center gap-5">
          <SwitchButton handleToggle={handleToggle} isChecked={isChecked} />
          <Button
            type="submit" onClick={onClickFn}
            variant="outline"
            disabled={isSubmmitting}
            className={`rounded-full border border-black ${isChecked ? "bg-green-400 hover:bg-green-500/80" : "bg-white"}`}
          >
            {isSubmmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : isChecked ? <Globe2 className="h-5 w-5"/>:<Save className="h-5 w-5"/> }
            {isChecked ? "公開する" : "保存する"}
          </Button>
        </div>
      </header>
    </div>
  );
}
