// variable defining the array of questions and answers   
var questions = [{
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},
{
    title: "The condition if an if / else statement is enclosed within ______.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis"
},
{
    title: "Arrays in JavaScript can be used to store ______.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
},
{
    title: "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
},
{
    title: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
}
]

// defining the variables for the timer and score 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// function that starts the timer when the user presses the play button
function play() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

// function that stops the timer
function endGame() {
clearInterval(timer);

// display when the game is over
var quiz = `
<h2>Game over</h2>
<h3>You got a ` + score +  ` /100</h3>
<h3>That means you got ` + score / 20 +  ` questions correct</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">submit</button>`;

document.getElementById("body").innerHTML = quiz;
}

// function that stores the score on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}

// function that displays the highscore, clear score button and play again button
function getScore() {
var quiz = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">clear score</button><button onclick="resetGame()">play again</button>

`;

document.getElementById("body").innerHTML = quiz;
}

// function that deletes the local storage if the user clicks clear score
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

// functino to reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

// display when the site loads
var quiz = `
<h1>
    Coding Bootcamp Code Quiz
</h1>
<h3>
    Click to play 
</h3>
<button onclick="play()">play</button>`;

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
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quiz = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quiz += buttonCode
}


document.getElementById("body").innerHTML = quiz;
}