/**
 * main.js
 * 
 * Este archivo renderiza la lista de clases agrupadas por categorías.
 * En tu versión de React, esta lógica se divide en varios componentes:
 * - <Home /> (página principal)
 * - <CategoriaSection /> (para agrupar por categoría iterando sobre 'categorias')
 * - <ClaseCard /> (para mostrar cada tarjeta de clase)
 */

document.addEventListener("DOMContentLoaded", () => {
    fetchClases();
});

const categorias = ['Cardio', 'Fuerza', 'Flexibilidad', 'Combate'].sort();

/**
 * Función para cargar los datos del backend.
 * En React: se hace dentro de un `useEffect` usando un estado `useState` para
 * almacenar 'clases', 'loading' y 'error'.
 */
async function fetchClases() {
    const container = document.getElementById("categorias-container");
    
    // Mostramos estado de carga ("loading = true" en React)
    container.innerHTML = `
        <article class="container loading">
            <div class="loader"></div>
        </article>
    `;

    try {
        const res = await fetch('/api/clases');
        if (!res.ok) throw new Error("Error en la respuesta del servidor");

        const data = await res.json();
        renderCategorias(data);

    } catch (error) {
        console.error(error);
        // Mostramos el componente de error ("error = true" en React)
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
 * Renderiza el HTML iterando sobre las categorías y clases.
 * En React: se hace devolviendo un arreglo de map() dentro del return (JSX).
 */
function renderCategorias(clases) {
    const container = document.getElementById("categorias-container");
    container.innerHTML = ""; // Limpiar el loading

    categorias.forEach(cat => {
        // En React esto sería el componente <CategoriaSection />
        
        const htmlCategoria = document.createElement("article");
        htmlCategoria.className = "categoria";
        
        let headerHtml = `<h2>🍺 ${cat}</h2><div class="clases-grid" id="grid-${cat}">`;
        
        const clasesDeCategoria = clases.filter(clase => clase.categoria === cat);
        let cardsHtml = "";

        clasesDeCategoria.forEach(c => {
            // En React esto sería el componente <ClaseCard />, pasándole 'c' como props
            cardsHtml += `
                <div class="card">
                    <a href="/clase.html?id=${c.id}">
                        <div class="card-picture">
                            <img src="${c.imagen}" alt="${c.nombre}" title="${c.nombre}" />
                            <div class="card-badge">${c.categoria}</div>
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">${c.nombre}</h3>
                            <p class="card-instructor">👨‍🏫 ${c.instructor}</p>
                            <div class="card-info">
                                <span class="card-duration">⏱️ ${c.duracion} min</span>
                                <span class="card-level">📈 ${c.nivel}</span>
                            </div>
                            <div class="card-beer">
                                <p class="card-beer-title">🍺 Cerveza Incluida</p>
                                <p class="card-beer-name">${c.birra_incluida.nombre}</p>
                                <p class="card-beer-type">${c.birra_incluida.tipo}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        });

        const footerHtml = `</div>`;
        htmlCategoria.innerHTML = headerHtml + cardsHtml + footerHtml;
        
        container.appendChild(htmlCategoria);
    });
}
