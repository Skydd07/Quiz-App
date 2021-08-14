const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const qsContainerElement = document.getElementById("question-container");

let shuffledQuestions, currentQuestionIndex;
const questionElement = document.getElementById("question");
const answerBtnElements = document.getElementById("answer-btn");

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});



function startGame() {
    //alert("startGame called");
    startBtn.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    qsContainerElement.classList.remove("hide");
    setNextQuestion();

}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerBtnElements.appendChild(button);
    });

}

function resetState(){
    clearStatusClass(document.body)
    nextBtn.classList.add("hide");
    while(answerBtnElements.firstChild){
        answerBtnElements.removeChild(answerBtnElements.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBtnElements.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove("hide");
    }
    else{
        startBtn.innerText = "Restart";
        startBtn.classList.remove("hide");
    }
    
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    }
    else{
        element.classList.add("wrong")
    }
}

function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong");

    
}

const questions = [
    {
        question: "How many cards are there in a complete pack of cards?",
        answers: [
            {text: "20", correct: false},
            {text: "32", correct: false},
            {text: "40", correct: false},
            {text: "52", correct: true},
        ]
    },
    {
        question: "What is the hottest continent on Earth?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Europe", correct: false},
            {text: "Africa", correct: true},
            {text: "South America", correct: false},
        ]
    },
    {
        question: "How many planets are there in our solar system?",
        answers: [
            {text: "7", correct: false},
            {text: "8", correct: true},
            {text: "9", correct: false},
            {text: "5", correct: false},
        ]
    },
    {
        question: "Which was the occupation or job of the following famous people: Leonardo da Vinci, Pablo Picasso, Vincent Van Gogh?",
        answers: [
            {text: "Musician", correct: false},
            {text: "Painter", correct: true},
            {text: "Carpenter", correct: false},
            {text: "Dancer", correct: false},
        ]
    },
    {
        question: "Entomology is the science that studies",
        answers: [
            {text: "Behavior of human beings", correct: false},
            {text: "Insects", correct: true},
            {text: "The origin and history of technical and scientific terms", correct: false},
            {text: "The formation of rocks", correct: false},
        ]
    },
    

]