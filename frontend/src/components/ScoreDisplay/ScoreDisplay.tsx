import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import "./ScoreDisplay.scss";
import AppreciationDisplay from "../AppreciationDisplay/AppreciationDisplay";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

export default function ScoreDisplay({ score, total, onRestart }: Props) {
  const [displayedScore, setDisplayedScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const [showAppreciation, setShowAppreciation] = useState(false);

  // Référence pour les boutons d'icônes
  const iconsRef = useRef<HTMLDivElement>(null);

  // Animation du score
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setDisplayedScore(current);
      if (current >= score) {
        clearInterval(interval);
        // Afficher l'appréciation après que le score soit complet
        setShowAppreciation(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [score]);

  // Animation des icônes (avec délai augmenté pour laisser l'appréciation s'afficher)
  useEffect(() => {
    if (!iconsRef.current || !showAppreciation) return;

    // Animation pour les icônes
    gsap.fromTo(
      iconsRef.current.querySelectorAll(".icon-button"),
      {
        opacity: 0,
        y: 50,
        scale: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(1.7)",
        delay: 0.8, // Délai après l'apparition de l'appréciation
      }
    );

    // Animation pour les labels
    gsap.fromTo(
      iconsRef.current.querySelectorAll(".button-label"),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        delay: 1.0,
      }
    );
  }, [showAppreciation]);

  // Handlers existants...
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("francois.lerosier@gmail.com");
    setCopiedMessage("francois.lerosier@gmail.com copié dans le presse-papier!");
    setTimeout(() => setCopiedMessage(null), 2000);
  };

  return (
    <div className="score-display">
      <h2>Votre score :</h2>
      <p className="score">
        {displayedScore}/{total}
      </p>

      {/* Utilisation du nouveau composant */}
      {showAppreciation && <AppreciationDisplay score={score} />}

      <div className="score-buttons" ref={iconsRef}>
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
