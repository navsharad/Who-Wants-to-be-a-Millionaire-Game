const startButton = document.querySelector('.start-btn');
const nextButton = document.querySelector('.next-btn');
const gameContainer = document.querySelector('.start-styling');
const questionElement = document.querySelector('.question');
const answerElementArray = document.getElementsByClassName('answer');
const answersContainer = document.querySelector('.answers');
const quitButton = document.querySelector('.quit');
const header = document.querySelector('#header');
const winningsContainer = document.querySelector('.winnings');
const modalContainer = document.querySelector('.modal-bg');
const modal = document.querySelector('.modal');
const restartButton = document.querySelector('.restart-btn');

let winnings = 0;
let questionWorth;
let arrayIndexCounter = 0;

startButton.addEventListener('click', startGame);
quitButton.addEventListener('click', endGame);

function startGame() {
    gameContainer.classList.remove('start-styling'); //removes styling intended for only the start screen
    let elements = document.getElementsByClassName('hide');
    while (elements.length > 0) {
        elements[0].classList.remove('hide');
    }
    startButton.classList.add('hide');
    nextButton.classList.add('hide');
    modalContainer.classList.add('hide');
    fetchQuestion();
}

// end game modals

function winGame() {
   modalContainer.classList.remove('hide');
   modal.children[0].innerHTML = 'Congrats, you won $1,000,000';
   modal.children[1].innerHTML = 'Thanks for playing.';
   restartGame();

}
function endGame() {
    modalContainer.classList.remove('hide');
    modal.children[0].innerHTML = 'You walk away with $' + winnings;
    modal.children[1].innerHTML = 'Thanks for playing.';
    restartGame();
}

function loseGame() {
    modalContainer.classList.remove('hide');
    modal.children[0].innerHTML = 'You lost!';
    modal.children[1].innerHTML = 'Better luck next time.';
    restartGame();

}


function fetchQuestion() {
    nextButton.classList.add('hide');
    let counter = 0;
    if (winnings === 50000) arrayIndexCounter = 0; //moves onto medium questions array and resets the index
    if (winnings === 200000) arrayIndexCounter = 0; //moves onto hard questions array

    if (winnings < 50000) { 
        header.innerHTML = 'Question for $25,000';
        questionWorth = 25000;
        questionElement.innerHTML = easyQuestions[arrayIndexCounter].question;
        Array.from(answerElementArray).forEach(element => {
            element.innerHTML = easyQuestions[arrayIndexCounter].answers[counter][0];
            if (easyQuestions[arrayIndexCounter].answers[counter][1] == true) {
                element.classList.add('correct');
            }
            counter++;
        })
        counter = 0;
    } else if (winnings < 200000) {
        header.innerHTML = 'Question for $50,000';
        questionWorth = 50000;
        questionElement.innerHTML = mediumQuestions[arrayIndexCounter].question;
        Array.from(answerElementArray).forEach(element => {
            element.innerHTML = mediumQuestions[arrayIndexCounter].answers[counter][0];
            if (mediumQuestions[arrayIndexCounter].answers[counter][1] == true) {
                element.classList.add('correct');
            }
            counter++;
        })
    } else if(winnings < 1000000){
            header.innerHTML = 'Question for $100,000';
            questionWorth = 100000;
            questionElement.innerHTML = hardQuestions[0].question;
            Array.from(answerElementArray).forEach(element => {
                element.innerHTML = hardQuestions[arrayIndexCounter].answers[counter][0];
                if (hardQuestions[arrayIndexCounter].answers[counter][1] == true) {
                    element.classList.add('correct');
                }
                counter++;
            })
    } else {
        winGame();
    }

        answersContainer.addEventListener('click', (e) => {
            Array.from(answerElementArray).forEach(element => {
                if (element.classList.contains('correct')) {
                    element.style.backgroundColor = 'green';
                } else {
                    element.style.backgroundColor = 'red';
                }
            })

            if(e.target.classList.contains('correct')) {
                winnings = winnings + questionWorth;
                winningsContainer.children[1].innerHTML = '$' + winnings;
                header.innerHTML = 'Congrats, you are correct!';
                nextButton.classList.remove('hide');
                next();
            } else {
                header.innerHTML = 'You are incorrect, you lose!';
                loseGame();
            }
        });

        arrayIndexCounter++;
}

function next() {
    nextButton.addEventListener('click', () => {
        resetState();
        fetchQuestion();
    })
}

function resetState() {
    nextButton.classList.add('hide');
    header.innerHTML = 'Who Wants to be a Millionaire';
    Array.from(answerElementArray).forEach(element => {
        element.style.backgroundColor = 'lightblue';
        if (element.classList.contains('correct'))
            element.classList.remove('correct');
    }); 
}

function restartGame() {
    restartButton.addEventListener('click', () => {
        resetState();
        modalContainer.classList.add('hide');
        winningsContainer.children[1].innerHTML = '$0';
        winnings = 0;
        arrayIndexCounter = 0;
        fetchQuestion();
    })
    //when lifelines are implemented, reset those too
    
}


// Array of easy, medium, and hard questions

const easyQuestions = [
    {
        question: 'What is 2 + 2',
        answers: [
            ['4', true],
            ['12', false],
            ['76', false],
            ['2', false]
        ]
    },
    {
        question: 'Who is the current President of the US',
        answers: [
            ['Barack Obama', false],
            ['George Bush', false],
            ['Donald Trump', true],
            ['Bill Clinton', false]
        ]
    },
    {
        question: 'What is 10 * 10 + 10',
        answers: [
            ['40', false],
            ['30', false],
            ['200', false],
            ['110', true]
        ]
    },
    {
        question: 'What is the square root of 169',
        answers: [
            ['10', false],
            ['13', true],
            ['32', false],
            ['69', false]
        ]
    },
]

const mediumQuestions = [
    {
        question: 'What is the derivative of ln(x)',
        answers: [
            ['1/x', true],
            ['lnx/x', false],
            ['0', false],
            ['x', false]
        ]
    },
    {
        question: 'What element does the chemical symbol Hg represent?',
        answers: [
            ['iron', false],
            ['hydrogen', false],
            ['mercury', true],
            ['hogwarts', false]
        ]
    },
    {
        question: 'What is the derivative of ln(x)',
        answers: [
            ['1/x', true],
            ['lnx/x', false],
            ['0', false],
            ['x', false]
        ]
    },
    {
        question: 'What was the first state in the US?',
        answers: [
            ['Rhode Island', false],
            ['Delaware', true],
            ['California', false],
            ['New York', false]
        ]
    },
    {
        question: 'What is the pH of pure water?',
        answers: [
            ['14', false],
            ['1', false],
            ['4', false],
            ['7', true]
        ]
    },
]

const hardQuestions = [
    {
        question: "What is the equation for Newton's second law of motion?",
        answers: [
            ['Sigma F = 0', false],
            ['d = m * v', false],
            ['F = m * a', true],
            ['a = (v - u) / t', false]
        ]
    },
    {
        question: "What language has the most words?",
        answers: [
            ['English', true],
            ['French', false],
            ['Spanish', false],
            ['Mandarin', false]
        ]
    },
    {
        question: "How many bones do sharks have?",
        answers: [
            ['1', false],
            ['238', false],
            ['0', true],
            ['17', false]
        ]
    },
    {
        question: "How many hearts does an octupus have?",
        answers: [
            ['1', false],
            ['2', false],
            ['3', true],
            ['4', false]
        ]
    },
    {
        question: "What planet in the solar system has the most gravity?",
        answers: [
            ['Earth', false],
            ['Mars', false],
            ['Venus', false],
            ['Jupiter', true]
        ]
    },
]