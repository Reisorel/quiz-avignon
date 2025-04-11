import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./AppreciationDisplay.scss";

type Props = {
  score: number;
};

export default function ScoreAppreciation({ score }: Props) {
  const appreciationRef = useRef<HTMLDivElement>(null);

  // Animation d'entrée
  useEffect(() => {
    if (appreciationRef.current) {
      gsap.fromTo(
        appreciationRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, []);

  // Contenu de l'appréciation en fonction du score
  const getAppreciationContent = () => {
    if (score <= 3) {
      return (
        <>
          <h3>🎭 Tel un valet de comédie, vous butinez les répliques sans jamais retenir le texte.</h3>
          <p className="character">Personnage : Scapin (Molière)</p>
          <p className="quote">« Ruse et bagout ne suffisent pas toujours, cher Scapin. Votre connaissance du Festival est encore un peu… brouillonne ! »</p>
        </>
      );
    } else if (score <= 6) {
      return (
        <>
          <h3>🎭 Vous avez des éclairs, mais l'ensemble manque d'unité dramatique.</h3>
          <p className="character">Personnage : Phèdre (Racine)</p>
          <p className="quote">« Comme Phèdre, vous êtes traversé·e par de grandes passions... mais parfois, vous vous perdez dans les méandres de l'intrigue. »</p>
        </>
      );
    } else if (score <= 8) {
      return (
        <>
          <h3>🎭 Un sens du plateau certain, vous tenez la scène !</h3>
          <p className="character">Personnage : Matamore (Corneille / farce)</p>
          <p className="quote">« Verbe haut et panache au vent, vous imposez votre savoir avec assurance ! Mais gare à l'excès de fanfaronnade... »</p>
        </>
      );
    } else {
      return (
        <>
          <h3>🎭 Maîtrise absolue : vous êtes né·e pour Avignon.</h3>
          <p className="character">Personnage : Jean Vilar (fondateur du Festival)</p>
          <p className="quote">« Comme Jean Vilar dans la Cour d'honneur, vous êtes une légende vivante du théâtre ! Incollable et inspiré·e. »</p>
        </>
      );
    }
  };

  return (
    <div className="score-appreciation" ref={appreciationRef}>
      {getAppreciationContent()}
    </div>
  );
}
