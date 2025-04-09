import "./QuizHeader.scss";

export default function QuizHeader() {
  return (
    <div className="header-content">
      <div className="header-text">
        <h1 className="header-title">
          Quiz. Êtes-vous incollable sur le festival d’Avignon ?{" "}
        </h1>
        <div className="header-description">
          <p>
            A 10 jours du festival de théâtre le plus incontournable de France,
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
