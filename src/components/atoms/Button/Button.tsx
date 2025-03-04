import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const ButtonStyle = tv({
  base: "border border-black rounded-full text-[1rem] transition-all duration-300 hover:-translate-y-[2px]",
  variants: {
    size: {
      sm: "py-1 px-6",
      md: "py-2 px-5",
    },
  },
});

type Props = VariantProps<typeof ButtonStyle> & {
  children: ReactNode;
  onClickFn?: () => void;
  type: "submit" | "reset" | "button" | undefined;
};

export default function Button({ size, children, onClickFn, type }: Props) {
  return (
    <button onClick={onClickFn} type={type} className={ButtonStyle({ size })}>
      {children}
    </button>
  );
}
