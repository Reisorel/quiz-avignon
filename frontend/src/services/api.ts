// src/services/api.ts

const baseURL = import.meta.env.VITE_API_URL;
console.log("📡 API URL utilisée :", baseURL);


export async function getQuestions() {
  const response = await fetch(`${baseURL}/quiz/test/`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des questions");
  }

  const data = await response.json();
  return data;
}
