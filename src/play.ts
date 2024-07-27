import { getAllQuestions } from "./libs/fetchData";
import { Question } from "../types/entity";

async function play() {
  const questions = await getAllQuestions();
  const questionNum = questions.length;
  const questionNumArr = Array.from(Array(questionNum).keys());
  const shuffledQuestionNumArr = questionNumArr.sort(() => Math.random() - 0.5);
  renderNextQuestion(questions, shuffledQuestionNumArr.pop()!);

  function renderNextQuestion(questions: Question[], index: number) {
    //   const nextQuestion = questions[index];
    const nextQuestion = questions[index];
    console.log(index);

    const questionElement = document.getElementById("question")!;
    questionElement.textContent = nextQuestion.question;

    const answers = [
      nextQuestion.right_answer,
      nextQuestion.option_answer_1,
      nextQuestion.option_answer_2,
      nextQuestion.option_answer_3,
    ];
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

    const answerContainer = document.getElementById("answerContainer")!;
    answerContainer.innerHTML = "";

    shuffledAnswers.forEach((ans, id) => {
      const col = document.createElement("div");
      col.classList.add("col-md-6");

      const anscont = document.createElement("div");
      anscont.classList.add(
        "answer-container",
        "p-3",
        "rounded-4",
        "fs-5",
        "border"
      );

      col.append(anscont);

      const ol = document.createElement("ol");
      ol.type = "A";
      ol.start = id + 1;

      anscont.append(ol);

      const li = document.createElement("li");
      li.textContent = ans;

      ol.append(li);

      col.addEventListener(
        "click",
        ans === nextQuestion.right_answer ? handleTrue : handleFalse
      );

      answerContainer.append(col);
    });
  }

  function handleTrue() {
    if (shuffledQuestionNumArr.length === 0) {
      showModal("YOU WIN 👏");
    }
    console.log("true");
    renderNextQuestion(questions, shuffledQuestionNumArr.pop()!);
  }

  function handleFalse() {
    console.log(false);
    showModal("YOU LOSE");
  }

  function showModal(msg: string) {
    const modal = document.createElement("div");
    modal.style.position = "absolute";
    modal.style.height = "100vh";
    modal.style.width = "100vw";
    modal.style.zIndex = "100";
    modal.style.backgroundColor = "black";
    modal.style.opacity = ".8";
    modal.classList.add("row", "align-items-center");
    const modalMsg = document.createElement("div");
    modalMsg.classList.add("text-center");
    const p = document.createElement("p");
    p.textContent = msg;
    p.classList.add("text-light", "fs-1", "text-center", "fw-bold", "mb-3");
    const playAgain = document.createElement("button");
    playAgain.textContent = "Play Again";
    playAgain.classList.add("btn", "btn-lg", "btn-outline-primary", "w-25");
    playAgain.addEventListener("click", () => {
      window.location.reload();
    });

    modalMsg.append(p, playAgain);
    modal.append(modalMsg);
    document.body.append(modal);
  }
}

play();
