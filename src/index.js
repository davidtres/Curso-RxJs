import { Observable, fromEvent } from "rxjs";

const onKeyDown$ = fromEvent(document, "keydown");
const letterRows = document.getElementsByClassName("letter-row");
let letterIndex = 0;
let letterRowIndex = 0;
const insertLetter = {
  next: (event) => {
    const pressedKey = event.key.toUpperCase();
    const BACK = event.keyCode === 8 ?? event.key;
    if (BACK) {
      letterIndex--;
      return backLetter(letterRows);
    }
    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) {
      let letterBox = letterRows[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
      letterIndex++;
    }
  },
};
// Borrar letra de la misma fila, segun reto del curso.
function backLetter(letterRows) {
  let letterBox = letterRows[letterRowIndex].children[letterIndex];
  letterBox.textContent = "";
  letterBox.classList.remove("filled-letter");
}
onKeyDown$.subscribe(insertLetter);

// Primer ejecicio
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
