import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const ButtonStyle = tv({
  base: "border border-black rounded-full text-[1rem]",
  variants: {
    size: {
      sm: "py-1 px-6",
      md: "py-2 px-5",
    },
  },
});

type Props = VariantProps<typeof ButtonStyle> & {
  children: ReactNode;
  disabled?: boolean;
  onClickFn?: () => void;
  type: "submit" | "reset" | "button" | undefined;
};

export default function Button({ size, children, onClickFn, type, disabled}: Props) {
  return (
    <button disabled={disabled} onClick={onClickFn} type={type} className={ButtonStyle({ size })}>
      {children} 
    </button>
  );
}
