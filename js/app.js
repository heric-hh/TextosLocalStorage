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
    //Cuando el usuario agrega un nuevo tweet
    formularioEl.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        //Intenta buscar en local storage los tweets y conviertelos a JSON parse, si marca null, asigna un array vacio
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];

        console.log(tweets);    

        crearHTML();
    });
}


/* F U N C I O N E S */

function agregarTweet(e) {
    e.preventDefault();
    //Text Area donde el usuario escribe. Accederemos al valor de este elemento con la ayuda del metodo .value 
    const tweetEl = document.querySelector('#tweet').value;

    // Debemos añadir las entradas del usuario en el arreglo vacio que declaramos. Tomamos una copia de los tweets y le añadimos el ultimo valor del textarea
    
    const tweetObj = {
        id: Date.now(),
        tweetEl // Esto equivale tweet : tweet. Es decir, es un atajo cuando tenemos misma key y mismo value en un objeto
    };

    tweets = [...tweets, tweetObj];

    //Una vez agregado, debemos crear el HTML
    crearHTML();

    //Reiniciar el formulario
    formularioEl.reset();

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

    //El elemento de mensaje de error ahora contiene el string que fue recibido desde la funcion agregarTweet
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

// Muestra un listado de los tweets
function crearHTML() {

    //Para limpiar el HTML en el caso de que nuestro array empiece a tener mas de un valor
    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la función de eliminar 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el HTML
            const li = document.createElement('li');

            //Añadir texto al elemento <li>
            li.innerText = tweet.tweetEl;

            // Asignar el boton de eliminar
            li.appendChild(btnEliminar);


            // Insertarlo en el HTML
            listaTweetsEl.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los tweets actuales a local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpiar el HTML
function limpiarHTML() {
    while(listaTweetsEl.firstChild) {
        listaTweetsEl.removeChild(listaTweetsEl.firstChild);
    }
}

// Elimina tweet
function borrarTweet(id) {
    //Traeremos los elementos donde no se ha hecho click
    tweets = tweets.filter( tweet => tweet.id !== id );
    crearHTML();
}