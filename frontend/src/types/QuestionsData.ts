export type Question = {
  id?: string; // souvent injecté côté MongoDB ou API
  question_text: string;
  correct_answer: string;
  wrong_answers: string[]; // exactement 2 ici selon ta spec
  explanation: string;
  stats: Record<string, number>; // ex : { "1947": 10, "1945": 2, "1955": 1 }
  answers?: string[]; // généré dynamiquement dans le front à l'affichage
};
