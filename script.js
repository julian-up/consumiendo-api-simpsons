let listaPersonajes = [];

const botonBuscar = document.getElementById("boton-buscar");
const botonLimpiar = document.getElementById("boton-borrar-resultados");

botonBuscar.addEventListener("click", buscarPersonaje);
botonLimpiar.addEventListener("click", limpiarResultados);

async function buscarPersonajes() {
  try {
    const response = await fetch("https://thesimpsonsapi.com/api");

    if (!response.ok) {
      throw new Error("Error al conectar con API");
    }

    const data = await response.json();

    const responsePersonajes = await fetch(data.characters);

    if (!responsePersonajes.ok) {
      throw new Error("Error al buscar los personajes");
    }

    const personajes = await responsePersonajes.json();

    return personajes.results;
  } catch (error) {
    console.error("Hubo un error:", error);
    return [];
  }
}

function crearTarjetas(personajes, contenedor) {
  contenedor.innerHTML = "";

  for (let personaje of personajes) {
    const tarjeta = document.createElement("div");

    tarjeta.innerHTML = `
      <div class="simpson-tarjeta">
        <img 
          src="https://cdn.thesimpsonsapi.com/200${personaje.portrait_path}" 
          alt="${personaje.name}" 
        />
        <p class="nombre">${personaje.name}</p>
        <p class="ocupacion">${personaje.occupation}</p>
        <p class="frase">
          ${
            personaje.phrases && personaje.phrases.length > 0
              ? personaje.phrases[0]
              : "No tengo frase"
          }
        </p>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  }
}

async function iniciar() {
  listaPersonajes = await buscarPersonajes();

  const contenedorPrincipal = document.querySelector(".container-tarjetas");

  crearTarjetas(listaPersonajes, contenedorPrincipal);
}

function buscarPersonaje() {
  const inputBusqueda = document.getElementById("nombre-personaje");
  const textoIngresado = inputBusqueda.value.trim().toLowerCase();

  if (textoIngresado === "") {
    console.log("No se ingresó ningún nombre");
    return;
  }

  const personajesEncontrados = listaPersonajes.filter((personaje) =>
    personaje.name?.toLowerCase().includes(textoIngresado),
  );

  const contenedorBusqueda = document.getElementById(
    "container-tarjetas-busqueda",
  );

  crearTarjetas(personajesEncontrados, contenedorBusqueda);
}

function limpiarResultados() {
  const contenedorBusqueda = document.getElementById(
    "container-tarjetas-busqueda",
  );

  const inputBusqueda = document.getElementById("nombre-personaje");

  contenedorBusqueda.innerHTML = "";
  inputBusqueda.value = "";
}

iniciar();
