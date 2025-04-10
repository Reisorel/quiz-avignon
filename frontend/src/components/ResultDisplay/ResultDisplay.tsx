import './ResultDisplay.scss';

type Props = {
  isCorrect: boolean; // true si la réponse est correcte, false sinon
  explanation: string; // explication à afficher
}

export default function ResultDisplay({ isCorrect, explanation }: Props) {
  return (
    <div className="result-display-container">
      <h3 className={`result-title ${isCorrect ? 'correct' : 'incorrect'}`}>
        {isCorrect ? 'Bonne réponse' : 'Mauvaise réponse'}
      </h3>
      <p className="result-explanation">{explanation}</p>
    </div>
  );
}
