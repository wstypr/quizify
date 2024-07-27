import {
  addQuestion,
  deleteQuestion,
  getAllQuestions,
} from "../libs/fetchData";
import { Question } from "../types/entity";
import { createQuestionItem } from "../libs/createQuestionItem";

const form = document.getElementById("formNewQuestion") as HTMLFormElement;
form.addEventListener("submit", handleAdd);

async function app() {
  renderQuestions();
}

async function handleAdd(e: Event) {
  e.preventDefault();
  const formData = new FormData(form);
  const newQuestion = Object.fromEntries(formData) as unknown as Question;
  await addQuestion(newQuestion);
  window.location.reload();
}

async function renderQuestions() {
  const questions = await getAllQuestions();
  questions.forEach((question) => {
    const card = createQuestionItem(question, handleDelete);
    document.getElementById("questionContainer")?.append(card);
  });
}

async function handleDelete(e: Event) {
  const question = e.target as HTMLElement;
  const res = await deleteQuestion(question.id);
  console.log(res);
  window.location.reload();
}

app();
