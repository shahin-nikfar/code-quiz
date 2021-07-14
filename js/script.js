// variable defining the array of questions and corrects
var questions = [{
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts"
},
{
    question: "The condition if an if / else statement is enclosed within ______.",
    answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correct: "parenthesis"
},
{
    question: "Arrays in JavaScript can be used to store ______.",
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correct: "all of the above"
},
{
    question: "String values must be enclosed within ______ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes"
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    correct: "console.log"
}
]

// defining the variables for the timer and score 
var score = 0;
var displayQuestion = -1;
var timeLeft = 0;
var timer;

// function that starts the timer when the user presses the start button
function play() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        end(); 
    }
}, 1000);

next();
}

// function that stops the timer 
function end() {
clearInterval(timer);

var quiz = `
<h2>Game over</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="set()">Submit</button>`;

document.getElementById("body").innerHTML = quiz;
}

// function that stores the score on local storage
function set() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
retrieve();
}

// function that displays the highscore, clear score button and play again button
function retrieve() {
var quiz = `
<h2>` + localStorage.getItem("highscoreName") + `'s high score is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Play Again</button>

`;

document.getElementById("body").innerHTML = quiz;
}

// function that deletes the local storage if the user clicks clear score
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

// function to reset the game
function resetGame() {
clearInterval(timer);
score = 0;
displayQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

// displays when the site loads
var quiz = `
<h1>
    Coding Bootcamp Code Quiz
</h1>
<button onclick="play()">Play</button>`;

document.getElementById("body").innerHTML = quiz;
}

// function that subtracts 15 seconds for an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

// function that adds 20 points for a correct answer
function correct() {
score += 20;
next();
}

// function to cycle through questions 
function next() {
displayQuestion++;

if (displayQuestion > questions.length - 1) {
    end();
    return;
}

var quiz = "<h2>" + questions[displayQuestion].question + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[displayQuestion].answers.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[displayQuestion].answers[buttonLoop]);
    if (questions[displayQuestion].answers[buttonLoop] == questions[displayQuestion].correct) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quiz += buttonCode
}


document.getElementById("body").innerHTML = quiz;
}