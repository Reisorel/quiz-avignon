import { useEffect, useState } from "react";
import "./Timer.scss";

type Props = {
  duration: number; // Durée totale en secondes (ex: 30)
  isActive: boolean; // Le timer est-il actif ou figé ?
  onTimeUp: () => void; // Fonction à appeler quand le temps est écoulé
  questionIndex: number; // Renomme "key" en "questionIndex"
};

export default function Timer({ duration, isActive, onTimeUp, questionIndex }: Props) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // 🕐 Reset à chaque nouvelle question
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  // 🧠 Appel sécurisé de onTimeUp quand timeLeft atteint 0
  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      onTimeUp();
    }
  }, [timeLeft, isActive, onTimeUp]);

  // 💫 Logique cercle SVG
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
  (timeLeft / duration) * circumference;


  return (
    <div className="timer-container">
      <div className="timer">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#d0d0d0"
            fill="white"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#1c5754"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="timer-text">{timeLeft}</div>
      </div>
    </div>
  );
}
