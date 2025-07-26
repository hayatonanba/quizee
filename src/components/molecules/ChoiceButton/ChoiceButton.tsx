import { Button } from "@/components/ui/button";

// ChoiceButton.tsx
type Props = {
  onClickFn: () => void;
  text: string;
  isLoading: boolean;
  isSelected?: boolean;   // 追加
};

export default function ChoiceButton({ onClickFn, text, isLoading, isSelected = false }: Props) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="lg"
      onClick={onClickFn}
      disabled={isLoading}
      className={`flex w-full justify-start gap-3 rounded-lg border border-black py-2 ${isSelected ? "" : ""} `}
    >
      {text}
      {isSelected && (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      )}
    </Button>
  );
}
