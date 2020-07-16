// Game values
let min = 1
let max = 10
let winningNum = getRandomNum(min, max)
let guessesLeft = 3

// UI Elements
const game = document.getElementById("game")
const minNum = document.querySelector(".min-num")
const maxNum = document.querySelector(".max-num")
const guessBtn = document.querySelector("#guess-btn")
const guessInput = document.querySelector("#guess-input")
const message = document.querySelector(".message")

// UI min and max numbers
minNum.textContent = min
maxNum.textContent = max

// Play again event listener
game.addEventListener("mousedown", function (e) {
	if (e.target.className === "playAgain") {
		window.location.reload()
	}
})

// Button event listener
guessBtn.addEventListener("click", function (e) {
	let guess = parseInt(guessInput.value)
	// Validate input
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, "red")
	}

	// Check if winning number
	if (guess === winningNum) {
		// Game over - win
		gameOver(true, `Congratulations, ${winningNum} is correct.  You Win!`)
	} else {
		guessesLeft -= 1
		if (guessesLeft === 0) {
			// Game Over - lose
			gameOver(false, `Sorry, You Lose.  ${winningNum} was the correct answer.`)
		} else {
			// Game continues - wrong answer
			guessInput.value = "" // Clears input
			setMessage(
				`${guess} was not correct.  You have ${guessesLeft} guesses left`,
				"red",
				"red"
			)
		}
	}
})

function gameOver(win, msg) {
	let color
	win === true ? (color = "green") : (color = "red") // Sets color based on win(true) or lose(false)
	guessInput.disabled = true // Disables input
	guessInput.style.borderColor = color // Changes border color
	message.style.color = color // Changes text color
	setMessage(msg) // Sets message to what is passed in

	// Play again
	guessBtn.value = "Play again?"
	guessBtn.className += "playAgain"
}

function setMessage(msg, color) {
	message.style.color = color
	message.textContent = msg
}

// Generate random number
function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
