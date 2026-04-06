## Rúbrica - Examen React Gym

Puntaje total sugerido: **100 puntos**.  

---

### 1. Routing y SPA (20 pts)
- Rutas principales con React Router (`/`, `/clases/:id`, `*` - 404).  
- Navegación asíncrona perfecta y UX en links.
- 404 temático y enrutado dinámicamente.

---

### 2. Consumo de API y estado (20 pts)
- Uso correcto de la API Express (Endpoints `/api/clases`).
- Uso de `useEffect` dependiente de variables lógicas.
- Tratamiento de promesas completo (estados de **loading** y **error** resueltos).

---

### 3. Páginas y componentes principales (20 pts)
- `Home`: catálogo agrupado lógicamente por categoría mediante componentes repetibles (`<CardClase/>`).  
- `Detail`: muestra toda la información cruzada y la cerveza recompensa.
- Uso correcto de interpolación JSX.

---

### 4. Autenticación y Context (25 pts)
- `AuthContext` que almacena estado del administrador.  
- Login implementado de forma segura contra `/api/login`.  
- Modificación dinámica de la cabecera (Header/Layout) cuando el administrador se autentica.

---

### 5. Custom hooks y calidad de código (15 pts)
- Código legible, componentes de tamaño atómico y segregación lógica.
- Integración fluida de la hoja de estilos nativa a los módulos de React vía `className`.

---

### 6. Desaprobación automática (orientativa)
- Compilación rota sin posibilidad de arreglarse.  
- Omisión sistemática de Hooks (`useState`/`useEffect`) y uso masivo de DOM scripting (ej. `getElementById`).  
- Cero consumos reales al servidor (mock de archivos estáticos bypassando API Node).
