// import * as obs from "./../ejercicios/ejericio-observables";
// import * as subj from "./../ejercicios/ejercicio-subject";
// import * as fromOf from "./../ejercicios/ejercicio-from-of";
// import * as intervalTime from "./../ejercicios/ejercicio-interval-time";
import { Subject, fromEvent, merge, takeUntil } from "rxjs";
import { getFetch$ } from "./fromFetch.js";

// Declaración de observables
const onKeyDown$ = fromEvent(document, "keydown");
const insertLetter$ = fromEvent(document, "keydown");
const deleteLetter$ = fromEvent(document, "keydown");
const checkWord$ = fromEvent(document, "keydown");
const onBtnReset$ = fromEvent(btnReset, "click");
const onWindowLoad$ = fromEvent(window, "load");
const userWinOrLoose$ = new Subject();
const restarGame$ = merge(onWindowLoad$, onBtnReset$);

const letterRows = document.getElementsByClassName("letter-row");
const message = document.getElementById("messaje-text");
const boton = document.getElementById("btnReset");

// Variables de estado
let box = letterRows[0].children[0].classList.add("filled-letter");
let letterIndex;
let letterRowIndex;
let userAnswer;
let rightWord;

// Metodo observador para insertar letras en las cajas contenedoras
const insertLetter = {
  next: (event) => {
    message.innerText = "";
    const pressedKey = event.key.toUpperCase();
    const BACK = event.keyCode === 8 ?? event.key;
    const max = letterIndex < 5;
    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i) && max) {
      let letterBox = letterRows[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
      letterIndex++;
      userAnswer.push(pressedKey);
    }
  },
};

// Observador para Borrar letra de la misma fila, segun reto del curso, usando observable.
const deleteLetter = {
  next: (event) => {
    const pressedKey = event.key;
    if (pressedKey === "Backspace" && letterIndex != 0) {
      let currentRow = letterRows[letterRowIndex];
      let letterBox = currentRow.children[letterIndex - 1];
      letterBox.textContent = "";
      letterBox.classList.remove("filled-letter");
      letterIndex--;
      userAnswer.pop();
    }
  },
};

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
        message.innerHTML = "¡Felicidades, has Ganado 🎊!!";
        message.classList.add("letter-green");
        userWinOrLoose$.next("win");
        boton.disabled = false;
      }
      const letterRowsWinned = Array.from(letterRows)[letterRowIndex];
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
      if (letterRowIndex === 5) {
        return userWinOrLoose$.next("loss");
      }

      letterIndex = 0;
      letterRowIndex++;
      userAnswer = [];
      let box =
        letterRows[letterRowIndex].children[0].classList.add("filled-letter");
    }
  },
};

//observador para reiniciar / cargar el juego
restarGame$.subscribe(() => {
  // Suscripción de observadores para control al presionar una letra
  let insertLetterSuscription = insertLetter$
    .pipe(takeUntil(userWinOrLoose$))
    .subscribe(insertLetter);
  let checkLetterSuscription = checkWord$
    .pipe(takeUntil(userWinOrLoose$))
    .subscribe(checkWord);
  let deleteLetterSuscription = deleteLetter$
    .pipe(takeUntil(userWinOrLoose$))
    .subscribe(deleteLetter);
  // Obtiene palabra aleatoria del API o devuelve una local
  getFetch$.pipe(takeUntil(userWinOrLoose$)).subscribe((word) => {
    rightWord = word;
    console.log(word);
  });
  btnReset.disabled = true;
  clearWordle();
});
// window.location.reload();

//manejador de resultado y pinta casilla de la fila.
userWinOrLoose$.subscribe((result) => {
  const letterRowsWinned = Array.from(letterRows)[letterRowIndex];
  if (result === "loss") {
    message.innerHTML = `Has Perdido 😥 La palabra correcta es: ${rightWord}`;
    message.classList.add("message-loss");
    boton.disabled = false;
  }
  if (result === "win") {
    for (let i = 0; i < 5; i++) {
      letterRowsWinned.children[i].classList.add("letter-green");
    }
  }
  btnReset.disabled = false;
});

function clearWordle(params) {
  Array.from(letterRows).map((row) => {
    Array.from(row.children).map((letterBox) => {
      letterBox.textContent = "";
      letterBox.classList = "letter";
    });
  });
  box = letterRows[0].children[0].classList.add("filled-letter");
  letterIndex = 0;
  letterRowIndex = 0;
  userAnswer = [];
  message.innerHTML = "";
  message.classList.remove("message-loss");
}
