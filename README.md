# Curso-RxJs

Practicas del curso Curso de Programación Reactiva con RxJS (Platzi)

Crearemos para este curso una replica del juego Wordle, usando como base RxJs.

1. Usaremos **fromEvent** para escuchar los eventos del teclado y filtrar las letras recibidas. Luego las encajamos en cada
   DIV de la grilla y se resulelve reto para eliminar la ultima letra.
2. **Subject()** Nos ayuda para disparar un evento next() luego de verificar si el usuario a ganado o perdido al presionar tecla "Enter" para colorear las letras correctas aplicando una clase css.
