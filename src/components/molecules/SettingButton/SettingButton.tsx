import Link from "next/link";

type Props = {
  img: JSX.Element;
  text: string;
  link: string;
}

export default function SettingButton({img, text, link}: Props) {
    return (
        <button
          type="button"
          className="rounded-sm text-sm hover:bg-gray-200"
        >
          <Link href={link} className="flex items-center justify-center gap-2 px-2 py-1">
            {img}
            {text}
          </Link>
        </button>
    );
}
