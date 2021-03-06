// API KEY
import API_KEY from "./keys.js";

// Variables
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

// Funcion principal
function buscarClima(e){
    e.preventDefault();

    // Validar 
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    // Consultar API

    consultarAPI(ciudad, pais);


}

// Muestra error en pantalla
function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
            <strong class="font-bold">Error:</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
    
}


// Conecta con API
function consultarAPI(ciudad, pais){

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${API_KEY}`;

    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();
            if (datos.cod === '404'){
                mostrarError('Ciudad no encontrada');
            }

            // Mostar en HTML
            mostrarClima(datos);

        })
}

// Actualiza HTML para mostrar lo buscado
function mostrarClima(datos){
    console.log(datos);
    const {name, main: {temp, temp_max, temp_min, humidity} } = datos;

    // Creacion de HTML para cada dato

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${parseInt(temp)} &#8451;`
    actual.classList.add('font-bold', 'text-6xl');

    const humedad = document.createElement('p');
    humedad.innerHTML = `Humedad: ${parseInt(humidity)} %`
    humedad.classList.add('text-xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${parseInt(temp_max)} &#8451;`
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${parseInt(temp_min)} &#8451;`
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    // Se suman al HTML
    
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);   
    resultadoDiv.appendChild(humedad); 
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);   
}

// Limpia HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


// Spinner de carga
function Spinner(){
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner);
}