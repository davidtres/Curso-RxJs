# Curso-RxJs

\*_Proyecto PlaziWordle (simulación del famoso juego Wordlegame.org)._
Practicas del curso Curso de Programación Reactiva con RxJS (Platzi)

Crearemos para este curso una replica del juego Wordle, usando como base RxJs.

Conceptos aplicados:

1. Usaremos **fromEvent** para escuchar los eventos del teclado y filtrar las letras recibidas. Luego las encajamos en cada
   DIV de la grilla y se resulelve reto para eliminar la ultima letra.
2. **Subject()** Nos ayuda para disparar un evento next() luego de verificar si el usuario a ganado o perdido al presionar tecla "Enter" para colorear las letras correctas aplicando una clase css.
3. **From y Of** nos permiten generar observables a través de una serie de datos ya definidos.

- **of** genera un Observable a través de sus parámetros.
- **from** genera un Observable a través de un arreglo.
- **asyncScheduler** como argumento de from envía los valores del observable al event loop queue.

4. **Interval y Time**

- **interval** es un operador que genera un observable que emite valores numéricos por un intervalo de tiempo en milisegundos.

- **timer** es un operador que genera un valor de un observable con un retraso de tiempo especificado en milisegundos.

**OPERADORES PIPIABLES**

- **pipe()**: todos los operadores creacionales tienen este método, genera una cadena de operadores que se pueden enlazar uno tras otro.

  **map()**: itera sobre los valores que obtenemos del observable transformándolos.

- **filter()**: filtra los valores de un observable dada una condición.

- **reduce()**: combina todos los valores emitidos por un observable a través de una función acumuladora.

**MI TOQUE DE VALOR AGREGADO 😎**
Incluí el uso del operador **fromFetch** para hacer pedido a la API de "greenborn.com.ar" y obtener una palabra al azar de 5 letras y en caso de falla en la petición, se usará una palabra aleatoria del JSON local.

- url API: https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=5

**Visita el DEMO aquí (solo funciona en PC) =>** https://davidtres.github.io/Curso-RxJs/
