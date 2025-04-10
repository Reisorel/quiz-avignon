import React from "react";
import { useState, useMemo } from "react";
import { questions_data } from "../../data/QuestionsData";
import QuizHeader from "../QuizHeader/QuizHeader";
import ProgressBar from "../ProgressBar/ProgressBar";
import Timer from "../Timer/Timer";
import QuestionDisplay from "../QuestionDisplay/QuestionDisplay";
import AnswerButtons from "../AnswerButtons/AnswerButtons";
import ResultDisplay from "../ResultDisplay/ResultDisplay";
import NextButton from "../NextButton/NextButton";
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay";
import Footer from "../Footer/Footer";
import { Question } from "../../types/QuestionsData";
import "./Central.scss";

export default function Central() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const currentQuestion = questions_data[currentQuestionIndex];
  const [answersStatus, setAnswersStatus] = useState<
    ("correct" | "wrong" | "unanswered")[]
  >(Array(questions_data.length).fill("unanswered")); // State pour suivre le statut des réponses
  const [timerActive, setTimerActive] = useState(true); // State du timer

  const handleTimeUp = () => {
    if (!selectedAnswer) {
      setSelectedAnswer("time_up"); // valeur spéciale pour le rendre non-null
      setTimerActive(false);
      // mise à jour de la barre de progression comme "wrong"
      setAnswersStatus((prev) =>
        prev.map((status, index) =>
          index === currentQuestionIndex ? "wrong" : status
        )
      );
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions_data.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimerActive(true); // 🔥 redémarre le timer à la prochaine question
    } else {
      setIsQuizOver(true); // Fin du quiz sur clic
    }
  };
  const handleAnswerClick = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      setTimerActive(false); // 🔥 stop le timer

      const isCorrect = answer === currentQuestion.correct_answer;

      // met à jour answersStatus à l'index courant
      setAnswersStatus((prev) =>
        prev.map((status, index) =>
          index === currentQuestionIndex
            ? isCorrect
              ? "correct"
              : "wrong"
            : status
        )
      );

      // si bonne réponse → score +1
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const getShuffledAnswers = (question: Question): string[] => {
    const all = [question.correct_answer, ...question.wrong_answers];
    return [...all].sort(() => Math.random() - 0.5);
  };

  const shuffledAnswers = useMemo(
    () => getShuffledAnswers(currentQuestion),
    [currentQuestion]
  );

  return (
    <div className="central">
      <div className="central_container">
        <QuizHeader />
        <ProgressBar answersStatus={answersStatus} />

        {isQuizOver ? (
          <ScoreDisplay
            score={score}
            total={questions_data.length}
            onRestart={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setSelectedAnswer(null);
              setIsQuizOver(false); // reset ici aussi !
              setAnswersStatus(Array(questions_data.length).fill("unanswered")); // 🆗 reset de la barre ici
              setTimerActive(true);
            }}
          />
        ) : (
          <>
            <Timer
              duration={30}
              isActive={timerActive}
              onTimeUp={handleTimeUp}
              key={currentQuestionIndex}
            />

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

            {selectedAnswer && (
              <ResultDisplay
                isCorrect={selectedAnswer === currentQuestion.correct_answer}
                explanation={currentQuestion.explanation}
              />
            )}

            {selectedAnswer && (
              <NextButton
                onNext={handleNextQuestion}
                isLast={currentQuestionIndex === questions_data.length - 1}
              />
            )}
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
