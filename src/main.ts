import { addQuestion, getAllQuestions } from "../libs/fetchData";
import { Question } from "../types/entity";

const form = document.getElementById("formNewQuestion") as HTMLFormElement;

async function app() {
  const data = await getAllQuestions();
  data.forEach((q) => console.log(q));
}

// app();
form.addEventListener("submit", submitForm);

async function submitForm(e: Event) {
  e.preventDefault();
  const formData = new FormData(form);
  const newQuestion = Object.fromEntries(formData) as unknown as Question;
  const res = await addQuestion(newQuestion);
  console.log(res);
}
