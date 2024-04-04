// Genera un número aleatorio entre 1 y 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
// Elementos del DOM que se van a usar
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;

// Función que se llama al hacer clic en el botón de "Submit guess"
function checkGuess() {
  const userGuess = Number(guessField.value);
  // Si es el primer intento, muestra "Previous guesses: "
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  // Si el número es correcto, muestra un mensaje de felicitación y termina el juego
  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } 
  // Si se han hecho 10 intentos y no se ha adivinado el número, muestra "GAME OVER" y termina el juego
  else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } 
  // Si el número no es correcto, indica si el número ingresado es demasiado alto o demasiado bajo
  else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!' ;
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }
  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

// Función para terminar el juego
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

// Función para reiniciar el juego
function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }
  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  lastResult.style.backgroundColor = 'white';
  // Genera un nuevo número aleatorio para comenzar un nuevo juego
  randomNumber = Math.floor(Math.random() * 100) + 1;
}