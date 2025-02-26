type Props = {
  onClickFn: () => void;
  text: string;
  isLoading: boolean;
};

export default function ChoiceButton({ onClickFn, text, isLoading }: Props) {
  return (
    <button
      type="button"
      className="w-full rounded-full border border-black py-2 text-[1rem]"
      onClick={onClickFn}
      disabled={isLoading}
    >
      {text}
    </button>
  );
}
