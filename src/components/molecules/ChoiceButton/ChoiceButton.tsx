type Props = {
  onClickFn: () => void;
  text: string;
};

export default function ChoiceButton({ onClickFn, text }: Props) {
  return (
    <button
      type="button"
      className="w-full rounded-full border border-black py-2 text-[1rem]"
      onClick={onClickFn}
    >
      {text}
    </button>
  );
}
