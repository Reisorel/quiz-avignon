import { useMemo } from "react";
import "./QuizHeader.scss";

export default function QuizHeader() {
  // Calcule dynamiquement le nombre de jours restants jusqu'au 5 juillet 2025
  const daysUntilFestival = useMemo(() => {
    const today = new Date();
    const festivalStart = new Date(2025, 6, 5); // Note: les mois commencent à 0 en JavaScript, donc 6 = juillet

    // Calculer la différence en jours
    const diffTime = festivalStart.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Retourner le nombre de jours, ou 0 si la date est passée
    return diffDays > 0 ? diffDays : 0;
  }, []);

  return (
    <div className="header-content">
      <div className="header-text">
        <h1 className="header-title">
          Quiz. Etes-vous incollable sur le festival d'Avignon <span>?</span>{" "}
        </h1>
        <div className="header-description">
          <p>
            À {daysUntilFestival} jours du festival de théâtre le plus incontournable de France,
            revoyons ensemble vos connaissances !{" "}
          </p>
          <p>
            Etes-vous incollables ? Testez vos connaissances en répondant à nos
            10 questions. A vous de jouer !
          </p>
        </div>
      </div>
      <div className="header-picture">
        <img src="/pictures/Avignon.png" alt="Avignon" />
      </div>
    </div>
  );
}
