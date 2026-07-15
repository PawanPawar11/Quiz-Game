const startQuizBtn = document.getElementById("start-quiz-btn");
const quizStartContainer = document.getElementById("quiz-start-screen");
const quizGameContainer = document.getElementById("quiz-game-screen");
const question = document.getElementById("question");
const currentQuestion = document.getElementById("current-question");
const totalQuestions = document.getElementById("total-questions");
const scoreSoFar = document.getElementById("score-so-far");
const answerContainer = document.getElementById("answer-container");
const quizEndContainer = document.getElementById("quiz-end-screen");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentIndex = 0;
let score = 0;
let answerDisabled = false;

startQuizBtn.addEventListener("click", () => {
  quizStartContainer.classList.remove("active");
  quizGameContainer.classList.add("active");

  showQuestions();
});

function showQuestions() {
  answerDisabled = false;

  currentQuestion.textContent = currentIndex + 1;
  totalQuestions.textContent = quizQuestions.length;

  const currentQuestionBlock = quizQuestions[currentIndex];

  question.textContent = currentQuestionBlock.question;

  answerContainer.innerHTML = "";

  currentQuestionBlock.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.dataset.correct = answer.correct;

    answerContainer.appendChild(button);

    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target;

  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSoFar.textContent = score;
  }

  setTimeout(() => {
    currentIndex++;

    if (currentIndex < quizQuestions.length) {
      showQuestions();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizGameContainer.classList.remove("active");
  quizEndContainer.classList.add("active");
}
