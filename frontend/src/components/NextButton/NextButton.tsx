import "./NextButton.scss";

type Props = {
  onNext: () => void;
  isLast: boolean;
};

export default function NextButton({ onNext, isLast }: Props) {
  return (
    <div className="next-button-container">
      <button className="next-button" onClick={onNext}>
        {isLast ? "Voir le résultat" : "Question suivante"}{" "}
      </button>
    </div>
  );
}
