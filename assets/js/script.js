// Wait for DOM to finish loading before running game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }
    runGame("addition");
})


/**
* The main game 'loop', called when the script is first loaded
* and after the user's answer has been processed
*/
function runGame(gameType) {
    // Creates 2 random numbers between 1-25
    let num1 = Math.ceil(Math.random() * 25);
    let num2 = Math.ceil(Math.random() * 25);
    console.log(`${num1} and ${num2}`);
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown Game Type: ${gameType}!!!`);
        throw `Unknown Game Type: ${gameType}. Aborting`;
    }
}

/**
 * Checks answer from the returned element in the calculateCorrectAnswer function
 */

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = calculatedAnswer.includes(userAnswer);
    if (isCorrect) {
        alert("Hey! You got it right!");
        incrementScore();
    } else {
        alert(`You idiot! You answerd ${userAnswer}. That's completely wrong. The correct answer is ${calculatedAnswer[0]}`);
        incrementWrongScore();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands and operator from the DOM and returns correct answer
 */

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;
    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `unimplemented operator ${operator}. Aborting`;
    }
}

/**
 * Gets correct score from the DOM and increments it up by 1
 */

function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets incorrect score from the DOM and increments it up by 1
 */

function incrementWrongScore() {
    let oldIncorrect = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldIncorrect;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}