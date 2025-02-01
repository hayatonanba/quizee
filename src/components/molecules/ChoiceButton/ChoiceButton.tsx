type Props = {
  onClickFn: () => void;
  text: string;
};

export default function ChoiceButton({ onClickFn, text }: Props) {
  return (
    <button
      className="border border-black w-full text-[1rem] rounded-full py-2"
      onClick={onClickFn}
    >
      {text}
    </button>
  );
}
