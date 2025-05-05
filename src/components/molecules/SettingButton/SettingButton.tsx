import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  link: string;
}

export default function SettingButton({children, link}: Props) {
    return (
        <button
          type="button"
          className="rounded-sm text-sm hover:bg-gray-200"
        >
          <Link href={link} className="flex items-center justify-center gap-2 px-2 py-1">
            {children}
          </Link>
        </button>
    );
}
