/* V A R I A B L E S */

// Vamos a trabajar con el formulario. Almacenamos en una constante el valor del formulario
const formularioEl = document.querySelector('#formulario');

// lista-tweets es un div en el DOM que necesitamos para mostrar el texto que se ha escrito en el formulario
const listaTweetsEl = document.querySelector('#lista-tweets');

// Este es un arreglo que va a almacenar los tweets del usuario
let tweets = [];




/* E V E N T   L I S T E N E R S */

eventListeners();

// Esta es una funcion para registrar los events listeners
function eventListeners() {
    //Este es el primer evento que se va a escuchar en el DOM; el submit del formulario
    formularioEl.addEventListener('submit', agregarTweet);

}


/* F U N C I O N E S */
function agregarTweet(e) {
    e.preventDefault();
    console.log('Agregando Tweet');
}