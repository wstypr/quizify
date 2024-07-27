import { Question, ResQuestion } from "./../types/entity";

const API_URL = "https://v1.appbackend.io/v1/rows/mV2zMgxpMHkF";

export async function getAllQuestions() {
  const res = await fetch(API_URL);
  const data = (await res.json()) as ResQuestion;
  return data.data;
}

export async function addQuestion(question: Question) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([question]),
  });

  const data = await res.json();
  return data;
}
