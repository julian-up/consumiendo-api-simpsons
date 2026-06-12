async function buscarPersonajes() {
  try {
    const response = await fetch("https://thesimpsonsapi.com/api");
    if (!response.ok) throw new Error("Error al conectar con API");
    const data = await response.json();
    const responsePersonajes = await fetch(data.characters);

    if (!responsePersonajes.ok)
      throw new Error("Error al buscar los personajes");

    const listaPersonajes = await responsePersonajes.json();
    return listaPersonajes.results;
  } catch (error) {
    console.error("Hubo un error:", error);
    return [];
  }
}

function crearTarjetas(informacionDePersonaje) {
  const containerTarjetas = document.querySelector(".container-tarjetas");

  for (let personaje of informacionDePersonaje) {
    let tarjeta = document.createElement("div");
    tarjeta.innerHTML = `
    <div class="simpson-tarjeta">
            <img src="https://cdn.thesimpsonsapi.com/200${personaje.portrait_path}" alt="imagen${personaje.name}" />
            <p class="nombre">${personaje.name}</p>
            <p class="ocupacion">${personaje.occupation}</p>
            <p class="frase">${personaje.phrases.length != 0 ? personaje.phrases[0] : "no tengo frase"}</p>
          </div>
    `;
    containerTarjetas.append(tarjeta);
  }
}

async function iniciar() {
  const personajes = await buscarPersonajes();
  crearTarjetas(personajes);
}

iniciar();
