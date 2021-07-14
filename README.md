# code-quiz

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Conclusion

To build this quiz using JavaScript I started by building an array of the questions and answers.  I then built the timer with a function using setInterval and clearInterval as well as functions using -= and += to subtract and add to the timer based on answers given.  Next I made functions to store scores to local storage and retrieve them when the user wishes, using setItem and getItem.  Then I needed a function to reset the game.  Finally I have a function with a for/if/else loop to cycle through the questions.
