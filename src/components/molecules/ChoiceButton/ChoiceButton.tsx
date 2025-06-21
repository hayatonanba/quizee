// ChoiceButton.tsx
type Props = {
  onClickFn: () => void;
  text: string;
  isLoading: boolean;
  isSelected?: boolean;   // 追加
};

export default function ChoiceButton({ onClickFn, text, isLoading, isSelected = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClickFn}
      disabled={isLoading}
      className={`w-full rounded-full border border-black py-2 text-base ${isSelected ? "bg-gray-200" : "bg-white text-black"}
      `}
    >
      {text}
    </button>
  );
}
