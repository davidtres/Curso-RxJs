import { Observable, Subject, fromEvent } from "rxjs";
import WORD_LIST from "./wordsList.json";

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
// Primer ejecicio para entender funcionamiento de Observable
// const onservableAlfa$ = new Observable(subscriber=>{
//     subscriber.next(1);
//     subscriber.next(2);
//     subscriber.complete()
//     subscriber.next(13);
//     subscriber.next(a=b);
//     subscriber.next('Mi primer observador');
//     subscriber.next({test:true});
// })
// const observador = {
//     next:(value)=>{
//         console.log(value);
//     },
//     complete:()=>{console.log('Observer Completado');},
//     error:(err)=>{
//         console.error(err);
//     }
// }
// onservableAlfa$.subscribe(observador)

//Ejercicio para entender Observables: Subject
//Clase https://platzi.com/clases/3233-programacion-reactiva-rxjs/50758-observables-subject/

// const numbers$ = new Observable((subscriber) => {
//   subscriber.next(Math.round(Math.random() * 100));
// });

// const numbersRandom$ = new Subject();

// const observador1 = {
//   next: (number) => {
//     console.log(number);
//   },
// };
// const observador2 = {
//   next: (number) => {
//     console.log(number);
//   },
// };

// numbersRandom$.subscribe(observador1);
// numbersRandom$.subscribe(observador2);

// numbers$.subscribe(numbersRandom$);

// numbersRandom$.next(45);
