import React from "react";
import { useState, useMemo } from "react";
import { questions_data } from "../../data/QuestionsData";
import QuizHeader from "../QuizHeader/QuizHeader";
import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import AnswerButtons from "../AnswerButtons/AnswerButtons";
import NextButton from "../NextButton/NextButton";
import Footer from "../Footer/Footer";
import { Question } from "../../types/QuestionsData";
import "./Central.scss";

export default function Central() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question actuelle
  const currentQuestion = questions_data[currentQuestionIndex]; // Question actuelle
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // State pour la réponse sélectionnée

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions_data.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null); // reset pour la prochaine question
    } else {
      console.log("Fin du quiz !");
    }
  };

  // Mélange les réponses à chaque render (tu peux extraire ça en util plus tard)
  const getShuffledAnswers = (question: Question): string[] => {
    const all = [question.correct_answer, ...question.wrong_answers];
    return [...all].sort(() => Math.random() - 0.5);
  };

  const shuffledAnswers = useMemo(
    () => getShuffledAnswers(currentQuestion),
    [currentQuestion]
  );

  const handleAnswerClick = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
    }
  };

  return (
    <div className="central">
      <div className="central_container">
        <QuizHeader />
        <QuestionDisplay
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
        />
        <AnswerButtons
          answers={shuffledAnswers}
          selectedAnswer={selectedAnswer}
          correctAnswer={currentQuestion.correct_answer}
          onAnswerClick={handleAnswerClick}
        />

        {selectedAnswer && <NextButton onNext={handleNextQuestion} />}

        <Footer />

        {/* Autres composants viendront ici */}
      </div>
    </div>
  );
}
