// import * as obs from "./../ejercicios/ejericio-observables";
// import * as subj from "./../ejercicios/ejercicio-subject";
// import * as fromOf from "./../ejercicios/ejercicio-from-of";
// import * as intervalTime from "./../ejercicios/ejercicio-interval-time";
import { Subject, fromEvent } from "rxjs";
import WORD_LIST from "./wordsList.json";
const onKeyDown$ = fromEvent(document, "keydown");
const letterRows = document.getElementsByClassName("letter-row");
const message = document.getElementById("messaje-text");
let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = [];
let winGame = false;
const getRandomWord = () =>
  WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
// Obtener palabra aleatoria
const rightWord = getRandomWord();
console.log(rightWord);
let box = letterRows[0].children[0].classList.add("filled-letter");
const userWinOrLoose$ = new Subject();

const insertLetter = {
  next: (event) => {
    message.innerText = "";
    const pressedKey = event.key.toUpperCase();
    const BACK = event.keyCode === 8 ?? event.key;
    const max = letterIndex < 5;
    if (BACK && letterIndex > 0) {
      letterIndex--;
      userAnswer.pop();
      return backLetter(letterRows);
    }
    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i) && max) {
      let letterBox = letterRows[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
      letterIndex++;
      userAnswer.push(pressedKey);
    }
  },
};
// Borrar letra de la misma fila, segun reto del curso.
function backLetter(letterRows) {
  let letterBox = letterRows[letterRowIndex].children[letterIndex];
  letterBox.textContent = "";
  letterBox.classList.remove("filled-letter");
}
//observador para verificar si la palabra ingresada es correcta.
const checkWord = {
  next: (event) => {
    if (event.key === "Enter") {
      const wordWrite = userAnswer.join("");
      const wordCorrect = wordWrite === rightWord ?? false;
      if (userAnswer.length < 5) {
        message.innerText = "¡FALTAN LETRAS!";
        return;
      }
      if (wordCorrect) {
        message.innerHTML = "Has Ganado!!";
        message.classList.add("letter-green");
        userWinOrLoose$.next("win");
      } else {
        if (letterRowIndex === 5) {
          userWinOrLoose$.next("loss");
        } else {
          userWinOrLoose$.next();
          letterIndex = 0;
          letterRowIndex++;
          userAnswer = [];
          let box =
            letterRows[letterRowIndex].children[0].classList.add(
              "filled-letter"
            );
        }
      }
    }
  },
};
onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWord);
userWinOrLoose$.subscribe((result) => {
  const letterRowsWinned = Array.from(letterRows)[letterRowIndex];
  if (result === "loss") {
    message.innerHTML = "Has Perdido :(";
    message.classList.add("message-loss");
  }
  if (result === "win") {
    console.log(letterRowsWinned);
    for (let i = 0; i < 5; i++) {
      letterRowsWinned.children[i].classList.add("letter-green");
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const letra = letterRowsWinned.children[i].textContent;
      const includeLetra = rightWord.includes(letra);
      const indexLetra = rightWord.indexOf(letra);
      if (includeLetra) {
        letterRowsWinned.children[i].classList.add("letter-yellow");
      }
      if (indexLetra === i) {
        letterRowsWinned.children[i].classList.remove("letter-yellow");
        letterRowsWinned.children[i].classList.add("letter-green");
      }
      if (indexLetra === -1) {
        letterRowsWinned.children[i].classList.add("letter-grey");
      }
    }
  }
});
