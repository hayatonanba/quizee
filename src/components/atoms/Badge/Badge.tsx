import { tv, type VariantProps } from "tailwind-variants";

const BadgeStyle = tv({
  base: "px-2 py-[1px] w-max rounded-md text-[0.8rem]",
  variants: {
    varient: {
      public: "bg-green-300",
      private: "bg-gray-300"
    }
  }
})

type Props = VariantProps<typeof BadgeStyle>

export default function Badge({ varient }: Props) {
  return (
    <div className={BadgeStyle({ varient })}>
      {varient === "public" ? "公開中" : "非公開"}
    </div>
  );
}
