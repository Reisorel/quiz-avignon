import { useEffect, useState, useMemo } from "react";
// import { questions_data } from "../../data/QuestionsData";
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
import { getQuestions } from "../../services/api";

import "./Central.scss";

export default function Central() {
  const [questions_data, setQuestions_data] = useState<Question[]>([]); // State pour les questions de l'API
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const currentQuestion = questions_data[currentQuestionIndex];
  const [answersStatus, setAnswersStatus] = useState<
    ("correct" | "wrong" | "unanswered")[]
  >(Array(questions_data.length).fill("unanswered")); // State pour suivre le statut des réponses
  const [timerActive, setTimerActive] = useState(true); // State du timer

  // Fetch les données au chargement du composant
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions(); // Utilise ta fonction API
        setQuestions_data(data);
        setAnswersStatus(Array(data.length).fill("unanswered"));
      } catch (error) {
        console.error("Erreur lors du chargement des questions:", error);
      }
    };

    fetchQuestions();
  }, []);

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
      const sound = new Audio(isCorrect ? "/sounds/good.mp3" : "/sounds/bad.mp3");
      sound.play();

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

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    return getShuffledAnswers(currentQuestion);
  }, [currentQuestion]);

  // Fonction de debug pour passer directement aux résultats
  const skipToResults = () => {
    // Marquer toutes les questions comme répondues (un mélange de bonnes et mauvaises réponses)
    const mockAnswersStatus = Array(questions_data.length).fill("correct");
    // On met quelques réponses comme incorrectes pour que ça paraisse réaliste
    for (let i = 0; i < Math.floor(questions_data.length * 0.3); i++) {
      const randomIndex = Math.floor(Math.random() * questions_data.length);
      mockAnswersStatus[randomIndex] = "wrong";
    }

    // Définir un score entre 6 et 8 pour tester différentes appréciations
    const mockScore = Math.floor(Math.random() * 3) + 6;

    // Mettre à jour tous les états nécessaires
    setScore(mockScore);
    setAnswersStatus(mockAnswersStatus);
    setIsQuizOver(true);
    setSelectedAnswer(null);
    setTimerActive(false);
  };

  return (
    <div className="central">
      {/* Bouton de debug visible uniquement en développement */}
      {import.meta.env.DEV && (
        <button
          onClick={skipToResults}
          className="debug-button"
          title="Passer directement aux résultats (DEV only)"
        >
          ⏭️ Résultats
        </button>
      )}

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
              key={currentQuestionIndex} // 🔥 force React à remonter le composant
              duration={30}
              isActive={timerActive}
              onTimeUp={handleTimeUp}
              questionIndex={currentQuestionIndex} // Utilise le nouveau prop
            />

            {currentQuestion && (
              <QuestionDisplay
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
              />
            )}

            {currentQuestion && (
              <AnswerButtons
                answers={shuffledAnswers}
                selectedAnswer={selectedAnswer}
                correctAnswer={currentQuestion.correct_answer}
                onAnswerClick={handleAnswerClick}
              />
            )}

            {selectedAnswer && currentQuestion && (
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
