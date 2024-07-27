import { Question } from "../../types/entity";

export function createQuestionItem(
  question: Question,
  handleDelete: (e: Event) => void
) {
  const column = document.createElement("div");
  column.className = "col-md-6";

  const questionCard = document.createElement("div");
  questionCard.className = "card";

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header", "text-end", "py-0", "my-0");

  const delBtn = document.createElement("i");
  delBtn.classList.add("bi", "bi-x-lg", "btn-delete-question");
  delBtn.id = String(question._id);
  delBtn.addEventListener("click", handleDelete);

  cardHeader.append(delBtn);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardBody.textContent = question.question;

  const listGroup = document.createElement("ul");
  listGroup.classList.add("list-group", "list-group-flush");

  const rightAnswer = document.createElement("li");
  rightAnswer.textContent = question.right_answer;
  rightAnswer.classList.add("list-group-item", "bg-success-subtle");

  listGroup.append(rightAnswer);

  [
    question.option_answer_1,
    question.option_answer_2,
    question.option_answer_3,
  ].forEach((ans) => {
    const wrongAnswer = document.createElement("li");
    wrongAnswer.textContent = ans;
    wrongAnswer.classList.add("list-group-item", "bg-danger-subtle");
    listGroup.append(wrongAnswer);
  });

  questionCard.append(cardHeader, cardBody, listGroup);
  column.append(questionCard);
  return column;
}
