import React from "react";
import "./AnswerButtons.scss";

type Props = {
  answers: string[]; // 3 réponses à afficher (mélangées)
  selectedAnswer: string | null; // la réponse cliquée (ou null si pas encore de clic)
  correctAnswer: string; // la bonne réponse (transmise par Central)
  onAnswerClick: (answer: string) => void; // fonction à appeler au clic
};

export default function AnswerButtons({answers, selectedAnswer, correctAnswer, onAnswerClick }: Props) {
  // Fonction utilitaire pour déterminer la classe CSS à appliquer
  const getButtonClass = (answer: string): string => {
    if (!selectedAnswer) return ""; // rien de sélectionné encore

    if (answer === selectedAnswer && answer === correctAnswer) return "correct";
    if (answer === selectedAnswer && answer !== correctAnswer) return "wrong";
    if (answer === correctAnswer) return "highlight-correct"; // bonne réponse non cliquée

    return "";
  };

  return (
    <div className="answer-buttons">
      {answers.map((answer, index) => (
        <button
          key={index}
          className={`answer-button ${getButtonClass(answer)}`}
          onClick={() => onAnswerClick(answer)}
          disabled={selectedAnswer !== null}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}
