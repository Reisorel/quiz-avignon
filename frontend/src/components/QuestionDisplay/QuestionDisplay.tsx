import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./QuestionDisplay.scss";
import { Question } from "../../types/QuestionsData"; // ← import du typage global

type Props = {
  question: Question;
  questionNumber: number;
};

const QuestionDisplay: React.FC<Props> = ({ question, questionNumber }) => {

  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (questionRef.current) {
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [question.question_text]); // déclenche l’animation à chaque changement de question

  if (!question) return null;

  return (
    <div className="question-display-container" ref={questionRef}>
      <h4 className="question-text">
        {questionNumber}. {question.question_text}
      </h4>
    </div>
  );
};

export default QuestionDisplay;
