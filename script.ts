const startQuizBtn = document.getElementById("start-quiz-btn") as HTMLButtonElement;
const quizStartContainer = document.getElementById("quiz-start-screen") as HTMLDivElement;
const quizGameContainer = document.getElementById("quiz-game-screen") as HTMLDivElement;
const question = document.getElementById("question") as HTMLHeadingElement;
const currentQuestion = document.getElementById("current-question") as HTMLSpanElement;
const totalQuestions = document.getElementById("total-questions") as HTMLSpanElement;
const scoreSoFar = document.getElementById("score-so-far") as HTMLSpanElement;
const answerContainer = document.getElementById("answer-container") as HTMLDivElement;
const quizEndContainer = document.getElementById("quiz-end-screen") as HTMLDivElement;
const progressPercent = document.getElementById("progress-percent") as HTMLDivElement;
const finalScoreSpan = document.getElementById("final-score") as HTMLDivElement;
const maxScoreSpan = document.getElementById("max-score") as HTMLSpanElement;
const resultMessage = document.getElementById("result-message") as HTMLParagraphElement;
const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;

interface Answer {
  text: string;
  correct: boolean;
}

interface QuizQuestion {
  question: string;
  answers: Answer[];
}

const quizQuestions: QuizQuestion[] = [
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
  // show quiz game screen and hide start screen
  quizStartContainer.classList.remove("active");
  quizGameContainer.classList.add("active");

  showQuestions();
});

function showQuestions() {
  answerDisabled = false;

  currentQuestion.textContent = String(currentIndex + 1);
  totalQuestions.textContent = String(quizQuestions.length);

  progressPercent.style.width = (currentIndex / quizQuestions.length) * 100 + "%";

  const currentQuestionBlock = quizQuestions[currentIndex];

  question.textContent = currentQuestionBlock.question;

  answerContainer.innerHTML = "";

  currentQuestionBlock.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.dataset.correct = String(answer.correct);

    answerContainer.appendChild(button);

    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(event: MouseEvent) {
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target as HTMLButtonElement;

  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    const btn = button as HTMLButtonElement;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else if (btn === selectedButton) {
      btn.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSoFar.textContent = String(score);
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

  finalScoreSpan.textContent = String(score);
  maxScoreSpan.textContent = String(quizQuestions.length);

  if (score === quizQuestions.length) {
    resultMessage.textContent = "Excellent! You got all the answers right!";
  } else if (score >= quizQuestions.length / 2) {
    resultMessage.textContent = "Good job! You scored more than half!";
  } else {
    resultMessage.textContent = "Keep trying! You'll get better with practice!";
  }

  restartBtn.addEventListener("click", () => {
    // reset variables values and show quiz start screen
    currentIndex = 0;
    score = 0;
    scoreSoFar.textContent = String(score);

    quizEndContainer.classList.remove("active");
    quizStartContainer.classList.add("active");
  });  
}
