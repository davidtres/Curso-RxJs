import { Subject, fromEvent } from "rxjs";
import WORD_LIST from "./wordsList.json";
// import * as obs from "./../ejercicios/ejericio-observables";
// import * as subj from "./../ejercicios/ejercicio-subject";
// import * as fromOf from "./../ejercicios/ejercicio-from-of";
import * as intervalTime from "./../ejercicios/ejercicio-interval-time";
const onKeyDown$ = fromEvent(document, "keydown");
const letterRows = document.getElementsByClassName("letter-row");
let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = [];

const getRandomWord = () =>
  WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
// Obtener palabra aleatoria
const rightWord = getRandomWord();
console.log(rightWord);

const userWinOrLoose$ = new Subject();

const insertLetter = {
  next: (event) => {
    const pressedKey = event.key.toUpperCase();
    const BACK = event.keyCode === 8 ?? event.key;
    if (BACK && letterIndex > 0) {
      letterIndex--;
      userAnswer.pop();
      return backLetter(letterRows);
    }
    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) {
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
      if (wordCorrect) {
        const result = wordCorrect ? "Has Ganado!!" : "Has Perdido";
        const mensaje = document.getElementsByClassName("messaje-text")[0];
        mensaje.innerHTML = result;
        mensaje.classList.add("letter-green");
        console.log(wordCorrect);
        userWinOrLoose$.next();
      }
    }
  },
};
onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWord);
userWinOrLoose$.subscribe(() => {
  const letterRowsWinned = Array.from(letterRows)[letterRowIndex];
  console.log(letterRowsWinned);
  for (let i = 0; i < 5; i++) {
    letterRowsWinned.children[i].classList.add("letter-green");
  }
});
