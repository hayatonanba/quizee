import Image from "next/image";
import { tv, VariantProps } from "tailwind-variants";

type Props = {
  streakCount: number;
} & VariantProps<typeof StreakCountTextStyle>;

const StreakCountTextStyle = tv({
  base: "font-bold text-[2rem]",
  variants: {
    color: {
      black: "text-black",
      green: "text-[#1fc74c]",
      bronze: "text-[#b87333]",
      sliver: "text-[#808080]",
      gold: "text-[#c09b16]",
    },
  },
});

const streakCountToColor = (streakCount: number) => {
  if (streakCount >= 0 && streakCount <= 4) {
    return "black";
  } else if (streakCount >= 5 && streakCount <= 9) {
    return "green";
  } else if (streakCount >= 10 && streakCount <= 49) {
    return "bronze";
  } else if (streakCount >= 50 && streakCount <= 99) {
    return "sliver";
  } else if (streakCount >= 100) {
    return "gold";
  }
};

export default function StreakBubbleWithIcon({ streakCount }: Props) {
  return (
    <div className="flex items-end gap-5">
      <div className="relative">
        <Image src="/hukidasi.png" alt="" width={90} height={90} />
        <Image
          src="/icondemo.jpg"
          alt=""
          width={45}
          height={45}
          className="border rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
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
