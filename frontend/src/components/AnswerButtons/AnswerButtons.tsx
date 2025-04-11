import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AnswerButtons.scss";

type Props = {
  answers: string[]; // 3 réponses à afficher (mélangées)
  selectedAnswer: string | null; // la réponse cliquée (ou null si pas encore de clic)
  correctAnswer: string; // la bonne réponse (transmise par Central)
  onAnswerClick: (answer: string) => void; // fonction à appeler au clic
};

export default function AnswerButtons({
  answers,
  selectedAnswer,
  correctAnswer,
  onAnswerClick,
}: Props) {

  const buttonsRef = useRef<HTMLDivElement>(null); // conteneur des boutons

  useEffect(() => {
    if (!buttonsRef.current) return;

    gsap.fromTo(
      buttonsRef.current.children,
      {
        opacity: 0,
        x: -100, // Les boutons commencent à 100px à gauche de leur position finale
      },
      {
        opacity: 1,
        x: 0, // Les boutons arrivent à leur position normale
        duration: 1.5, // Un peu plus rapide pour un effet horizontal
        delay: 0.25, // Délai de 2 secondes avant le début de l'animation
        stagger: 0.15, // Légèrement plus de délai entre chaque bouton
        ease: "power2.out",
      }
    );
  }, [answers]); // déclenche l’anim à chaque changement de question


  // Fonction utilitaire pour déterminer la classe CSS à appliquer
  const getButtonClass = (answer: string): string => {
    if (!selectedAnswer) return ""; // rien de sélectionné encore

    if (answer === selectedAnswer && answer === correctAnswer) return "correct";
    if (answer === selectedAnswer && answer !== correctAnswer) return "wrong";
    if (answer === correctAnswer) return "highlight-correct"; // bonne réponse non cliquée

    return "";
  };

  return (
    <div className="answer-buttons" ref={buttonsRef}>
      {answers.map((answer, index) => (
        <button
          key={index}
          className={`answer-button ${getButtonClass(answer)} ${
            selectedAnswer === answer ? "selected" : ""
          }`}
          onClick={() => onAnswerClick(answer)}
          disabled={selectedAnswer !== null}
        >
          <div className="answer-button-text">{answer}</div>
        </button>
      ))}
    </div>
  );
}
