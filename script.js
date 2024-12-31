const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Cow", correct: false },
        ]
    },
    {
        question: "What is the largest planet?",
        answers: [
            { text: "Pluto", correct: false },
            { text: "Uranus", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Earth", correct: false },
        ]
    },
    {
        question: "What is the largest continent?",
        answers: [
            { text: "Africa", correct: false },
            { text: "America", correct: false },
            { text: "Asia", correct: true },
            { text: "Europe", correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-button');
const nextButton = document.getElementById('next-button');
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function showScore() {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    answerButtonsElement.innerHTML = "";
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
}

startQuiz();
