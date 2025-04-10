import { useEffect, useState } from "react";
import React from "react";
import "./ScoreDisplay.scss";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

export default function ScoreDisplay({ score, total, onRestart }: Props) {
  const [displayedScore, setDisplayedScore] = useState(0);
  const [copied, setCopied] = useState(false); // 🆕 message "copié !"
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);


  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setDisplayedScore(current);
      if (current >= score) {
        clearInterval(interval);
      }
    }, 100); // animation rapide (100ms par incrément)

    return () => clearInterval(interval);
  }, [score]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000); // message disparaît après 2s
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("francois.lerosier@gmail.com"); // ✅ ton mail ici
    setCopiedMessage("francois.lerosier@gmail.com copié dans le presse-papier!");
    setTimeout(() => setCopiedMessage(null), 2000);
  };

  return (
    <div className="score-display">
      <h2>Votre score :</h2>
      <p className="score">
        {displayedScore}/{total}
      </p>

      <div className="score-buttons">
        <div className="button-column">
          <span className="button-label">Partager ce quiz</span>
          <button className="icon-button" onClick={handleCopyLink}>
            📤
          </button>
        </div>
        <div className="button-column">
          <span className="button-label">Recruter son créateur</span>
          <button className="icon-button levitating" onClick={handleCopyEmail}>
            🎯
          </button>
        </div>
        <div className="button-column">
          <span className="button-label">Recommencer</span>
          <button className="icon-button" onClick={onRestart}>
            🔁
          </button>
        </div>
      </div>

      {copied && (
        <p className="copy-message">
          Adresse du quiz copiée dans le presse-papier!
        </p>
      )}
      {copiedMessage && (
        <p className="copy-message">
          {copiedMessage}
        </p>
      )}
    </div>
  );
}
