import { catchError, mergeMap, of, takeUntil, timer } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import WORD_LIST from "./wordsList.json";

//Obtenemos la palabra de forma aleatoria a traves del API public-random-word, si falla toma la palabra del array local.

const urlWord =
  "https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=5";

const getRandomWord = () =>
  WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
// Obtener palabra aleatoria

export const getFetch$ = fromFetch(urlWord).pipe(
  mergeMap(async (response) => {
    const rightWord = await response.json();
    console.log(rightWord[0], rightWord[0].length);
    const word =
      rightWord[0].length === 5 ? rightWord[0].toUpperCase() : getRandomWord();
    return word;
  }),
  catchError((err) => {
    console.error(err);
    const rightWord = getRandomWord();
    return [rightWord];
  })
);
