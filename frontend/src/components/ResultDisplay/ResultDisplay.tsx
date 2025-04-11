import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ResultDisplay.scss';

type Props = {
  isCorrect: boolean; // true si la réponse est correcte, false sinon
  explanation: string; // explication à afficher
}

export default function ResultDisplay({ isCorrect, explanation }: Props) {

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []); // ne se joue qu'à l'apparition du composant

  return (
    <div className="result-display-container" ref={resultRef}>
      <h3 className={`result-title ${isCorrect ? 'correct' : 'incorrect'}`}>
        {isCorrect ? 'Bonne réponse' : 'Mauvaise réponse'}
      </h3>
      <p className="result-explanation">{explanation}</p>
    </div>
  );
}
