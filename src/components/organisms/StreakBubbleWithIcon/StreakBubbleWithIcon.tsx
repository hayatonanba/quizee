import { signOut } from "@/auth";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import Image from "next/image";
import { tv, type VariantProps } from "tailwind-variants";

type Props = {
  streakCount: number;
  iconUrl: string;
} & VariantProps<typeof StreakCountTextStyle>;

const StreakCountTextStyle = tv({
  base: "font-bold lg:text-[2rem] text-[1.5rem]",
  variants: {
    color: {
      black: "text-black",
      green: "text-[#1fc74c]",
      bronze: "text-[#b87333]",
      silver: "text-[#808080]",
      gold: "text-[#c09b16]",
    },
  },
});

const streakCountToColor = (streakCount: number) => {
  if (streakCount >= 0 && streakCount <= 4) {
    return "black";
  }
  if (streakCount >= 5 && streakCount <= 9) {
    return "green";
  }
  if (streakCount >= 10 && streakCount <= 49) {
    return "bronze";
  }
  if (streakCount >= 50 && streakCount <= 99) {
    return "silver";
  }
  return "gold";
};

export default function StreakBubbleWithIcon({ streakCount, iconUrl }: Props) {
  return (
    <div className="flex items-end gap-5 pr-[90px]">
      <div className="relative">
        <Image src="/hukidasi.png" alt="" width={90} height={90} />
        <Popover>
          <PopoverTrigger className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Image
              src={iconUrl}
              alt=""
              width={45}
              height={45}
              className="rounded-full border"
            />
          </PopoverTrigger>
          <PopoverContent className="relative z-10 w-[150px] rounded-md border bg-white px-3 py-2 shadow-md" align="start">
            <form action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}>
              <button type="submit" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSignOut} className="size-[20px]" />ログアウト
              </button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      <h2
        className={StreakCountTextStyle({
          color: streakCountToColor(streakCount),
        })}
      >
        {streakCount}問連続正解中
      </h2>
    </div>
  );
}
