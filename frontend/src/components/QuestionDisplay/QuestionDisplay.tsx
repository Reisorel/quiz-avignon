import "./QuestionDisplay.scss";
import { Question } from "../../types/QuestionsData"; // ← import du typage global

type Props = {
  question: Question;
  questionNumber: number;
};

const QuestionDisplay: React.FC<Props> = ({ question, questionNumber }) => {
  if (!question) return null;

  return (
    <div className="question-display-container">
      <h4 className="question-text">
        {questionNumber}. {question.question_text}
      </h4>
    </div>
  );
};

export default QuestionDisplay;
