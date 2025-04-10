import React from 'react';
import './QuestionDisplay.scss';
import { Question } from '../../types/QuestionsData'; // ← import du typage global


type Props = {
  question: Question;
  questionNumber: number;
};

const QuestionDisplay: React.FC<Props> = ({ question, questionNumber }) => {
  if (!question) return null;

  return (
    <div className="question-display">
      <h2 className="question-number">
        {questionNumber}. {question.question_text}
      </h2>

      <div className="answers-list">
        {question.answers?.map((answer, index) => (
          <div key={index} className="answer-item">
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
