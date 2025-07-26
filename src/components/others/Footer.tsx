import { SquareArrowOutUpRight } from "lucide-react";

export default function Footer() {
  return (
    <div className="h-[60px] border-t">
      <div className="container mx-auto flex h-full items-center justify-center">
        <div className="flex gap-5">
          <a
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border-black text-sm hover:border-b"
            href="https://flawless-blue-360.notion.site/20b1bdc7ca9080be81f7eee5769d4bd4"
          >
            <SquareArrowOutUpRight className="h-3 w-3" />
            規約とポリシー
          </a>
          <a target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border-black text-sm hover:border-b"
            href="https://docs.google.com/forms/d/e/1FAIpQLScP9WYBgjzwP0VBr786-igjK-JqKIZ6poBICdXyJf_dRL_PTg/viewform?pli=1">
            <SquareArrowOutUpRight className="h-3 w-3" />
            お問い合わせ
          </a>
        </div>
      </div>
    </div>
  );
}
