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
    //Este es el primer evento que se va a escuchar en el DOM; el submit del formulario.
    //NOTA QUE A PESAR DE QUE NO GUARDAMOS EL VALOR DEL INPUT "AGREGAR", AL ESTAR RELACIONADO CON EL FORMULARIO AL SER EL SUBMIT, SE PUEDE TRABAJAR CON LOS ELEMENTOS DEL FORMULARIO
    formularioEl.addEventListener('submit', agregarTweet);

}


/* F U N C I O N E S */
function agregarTweet(e) {
    e.preventDefault();
    //Text Area donde el usuario escribe. Accederemos al valor de este elemento con la ayuda del metodo .value 
    const tweetEl = document.querySelector('#tweet').value;
    console.log(tweetEl);

    //¿Que pasa si el usuario no teclea nada y da a submit? Entonces debemos realizar una validacion
    if(tweetEl === '') {
        mostrarError('Un mensaje no puede ir vacío');
        return; //Como el flujo debe parar si el usuario manda un string vacío, instruimos un return para evitar que se ejecuten las lineas de codigo
    }
}

// Mostrar mensaje de error si hay un string vacio
function mostrarError(error) {
    //Ahora, creamos un elemento <p> de HTML
    const mensajeError = document.createElement('p');

    //El mensaje de error ahora contiene el string que fue recibido desde la funcion agregarTweet
    mensajeError.textContent = error;

    //Necesitamos darle estilo a ese mensaje de error, asi que en el CSS esta lista una clase llamada error. La agregamos al elemento
    mensajeError.classList.add('error');

    //Debemos definir en que parte del DOM mostraremos este mensaje
    const contenidoEl = document.querySelector('#contenido');
    contenidoEl.appendChild(mensajeError);

    // Como no queremos que el mensaje de error se quede parado en el DOM, agregamos una funcion de set time out para quitarlo
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}