import React from "react";
import "./ScoreDisplay.scss";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

export default function ScoreDisplay({ score, total, onRestart }: Props) {
  return (
    <div className="score-display">
      <h2>Votre score :</h2>
      <p className="score">{score}/{total}</p>

      <div className="score-buttons">
        <button className="share-btn">Partager ce quiz</button>
        <button className="restart-btn" onClick={onRestart}>Recommencer</button>
      </div>
    </div>
  );
}
