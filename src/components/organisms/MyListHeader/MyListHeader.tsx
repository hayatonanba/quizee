import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  link: string
}

export default function MyListHeader({link}:Props) {
  return (
    <div className="border-gray-300 border-b">
      <header className="container mx-auto flex h-[70px] items-center">
        <Link href={link}><FontAwesomeIcon className="size-7" icon={faArrowLeft} /></Link>
      </header>
    </div>
  );
}
