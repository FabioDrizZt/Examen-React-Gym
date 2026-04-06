/**
 * clase.js
 * 
 * Este archivo se encarga de mostrar el detalle de una clase buscando el `id` 
 * en la URL e invocando a la API correspondiente.
 * 
 * En React: 
 * 1. Obtenemos el `id` mediante el hook `useParams()` de react-router-dom.
 * 2. Usamos `useEffect` con la dependencia `[id]` para buscar los datos.
 * 3. Mostramos las etiquetas JSX asociadas al componente `ClaseDetails`.
 */

document.addEventListener("DOMContentLoaded", () => {
    // En Vanilla JS leemos los parámetros desde window.location.search
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        document.getElementById("clase-details-container").innerHTML = `
            <div class="error">
                <h1>Clase no encontrada</h1>
                <p>No se especificó ninguna clase.</p>
            </div>
        `;
        return;
    }

    fetchClaseDetails(id);
});

async function fetchClaseDetails(id) {
    const container = document.getElementById("clase-details-container");

    try {
        const res = await fetch(`/api/clases/${id}`);
        if (!res.ok) {
            if (res.status === 404) {
                 window.location.href = '/404.html';
                 return;
            }
            throw new Error("Error en la respuesta del servidor");
        }

        const clase = await res.json();
        renderClase(clase);

    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="error">
                <h1>🍻 La función está demorada</h1>
                <p>Estamos preparando las cervezas y ajustando las mancuernas 🍺🏋️‍♂️</p>
                <p>Intenta nuevamente en algunos instantes...</p>
            </div>
        `;
    }
}

/**
 * Muestra el contenido del detalle de la clase en el HTML.
 * En React: se hace escribiendo los valores de `{clase.variable}` directamente en el return().
 */
function renderClase(clase) {
    const container = document.getElementById("clase-details-container");

    // Construcción de listas de texto (Arrays de strings)
    const horariosHtml = clase.horarios.map(h => `<li>${h}</li>`).join("");
    const equipamientoHtml = clase.equipamiento.map(e => `<li>${e}</li>`).join("");
    const beneficiosHtml = clase.beneficios.map(b => `<li>${b}</li>`).join("");

    container.innerHTML = `
        <div class="clase-details">
            <div class="clase-header">
                <h2>${clase.nombre}</h2>
                <p class="instructor">👨‍🏫 Instructor: ${clase.instructor}</p>
            </div>

            <div class="clase-body">
                <div>
                    <img src="${clase.imagen}" alt="${clase.nombre}" class="clase-image" />

                    <div class="clase-meta">
                        <div class="meta-item">
                            <strong>⏱️ Duración</strong>
                            <span>${clase.duracion} min</span>
                        </div>
                        <div class="meta-item">
                            <strong>📈 Nivel</strong>
                            <span>${clase.nivel}</span>
                        </div>
                        <div class="meta-item">
                            <strong>🔥 Calorías</strong>
                            <span>${clase.calorias_quemadas}</span>
                        </div>
                    </div>

                    <div class="beer-section">
                        <h3>🍺 CERVEZA INCLUIDA</h3>
                        <div class="beer-details">
                            <div class="beer-detail-item">
                                <strong>Nombre:</strong>
                                <span>${clase.birra_incluida.nombre}</span>
                            </div>
                            <div class="beer-detail-item">
                                <strong>Tipo:</strong>
                                <span>${clase.birra_incluida.tipo}</span>
                            </div>
                            <div class="beer-detail-item">
                                <strong>Graduación:</strong>
                                <span>${clase.birra_incluida.graduacion}</span>
                            </div>
                            <div class="beer-detail-item">
                                <strong>Origen:</strong>
                                <span>${clase.birra_incluida.origen}</span>
                            </div>
                        </div>
                        <div class="beer-description">
                            ${clase.birra_incluida.descripcion}
                        </div>
                    </div>
                </div>

                <div class="clase-info">
                    <h3>📄 Descripción</h3>
                    <p>${clase.resumen}</p>

                    <h3>🕒 Horarios Disponibles</h3>
                    <ul class="horarios-list">
                        ${horariosHtml}
                    </ul>

                    <h3>🏋️ Equipamiento Necesario</h3>
                    <ul class="equipamiento-list">
                        ${equipamientoHtml}
                    </ul>

                    <h3>🌟 Beneficios</h3>
                    <ul class="beneficios-list">
                        ${beneficiosHtml}
                    </ul>
                </div>
            </div>
        </div>
    `;
}
