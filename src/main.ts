import {
  addQuestion,
  deleteQuestion,
  getAllQuestions,
} from "../libs/fetchData";
import { Question } from "../types/entity";

const form = document.getElementById("formNewQuestion") as HTMLFormElement;
form.addEventListener("submit", handleAdd);

async function app() {
  renderQuestions();
}

async function handleAdd(e: Event) {
  const formData = new FormData(form);
  const newQuestion = Object.fromEntries(formData) as unknown as Question;
  const res = await addQuestion(newQuestion);
  console.log(res);
}

async function renderQuestions() {
  const questions = await getAllQuestions();
  questions.forEach((question) => {
    const card = document.createElement("div");
    card.className = "question-card";
    const questionTxt = document.createElement("p");
    const rightAns = document.createElement("p");
    const otherAns1 = document.createElement("p");
    const otherAns2 = document.createElement("p");
    const otherAns3 = document.createElement("p");
    questionTxt.textContent = question.question;
    rightAns.textContent = question.right_answer;
    otherAns1.textContent = question.option_answer_1;
    otherAns2.textContent = question.option_answer_2;
    otherAns3.textContent = question.option_answer_3;
    rightAns.className = "right-ans";
    otherAns1.className = "wrong-ans";
    otherAns2.className = "wrong-ans";
    otherAns3.className = "wrong-ans";

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.className = "btn-delete";
    btnDelete.id = String(question._id);
    btnDelete.addEventListener("click", handleDelete);

    card.append(
      questionTxt,
      rightAns,
      otherAns1,
      otherAns2,
      otherAns3,
      btnDelete
    );
    document.querySelector(".question-container")?.append(card);
  });
}

async function handleDelete(e: Event) {
  const question = e.target as HTMLElement;
  const res = await deleteQuestion(question.id);
  console.log(res);
  window.location.reload();
}

app();
