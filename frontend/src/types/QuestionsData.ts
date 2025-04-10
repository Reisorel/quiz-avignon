export type Question = {
  id?: string;
  question_text: string;
  correct_answer: string;
  wrong_answers: string[];
  explanation: string;
  stats: Record<string, number>;
  answers?: string[]; // généré dynamiquement dans Central, typage optionnel
};
