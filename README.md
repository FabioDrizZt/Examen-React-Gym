## Examen Práctico - React Gym 

**Objetivo general**  
Migrar la app Gym "Birra y Bíceps" (hecha en JS vanilla) a una **SPA en React**, reutilizando la **API Express** existente.

---

### 1. Qué hay en el repo

- **Versión referencia (NO tocar)**: `index.html`, `clase.html`, `css/`, `js/`, `data/`.
- **API Express**: carpeta `server/`, base URL `/api/`.
- **Proyecto React**: carpeta `react/`, creado con Vite + React Router.

Tu trabajo es construir la versión en React tomando como modelo la versión vanilla.

---

### 2. Qué debe tener tu app React

- **Routing (React Router)**  
  - `/` -> Catálogo de clases.  
  - `/clases/:id` -> Detalle de una clase (donde debe mostrar también la Cerveza de Recompensa asociada).
  - `*` -> 404 Not Found temático.

- **Consumo de API (fetch desde React)**  
  - Consumir endpoints del backend (`/api/clases`, `/api/clases/:id`).  
  - Manejar **loading** y **error**.

- **Login de Administrador interactivo**  
  - Lógica para consumir `/api/login` (Admin access).
  - Guardar credenciales en el `AuthContext`.  
  - Reflejar en la UI si hay un admin o no.

---

### 3. React: piezas mínimas

- **Hooks**: `useState`, `useEffect`, `useContext`.
- **Context**:
  - `AuthContext` con administrador logueado.
- **Formato Sugerido**:
  - Estructurar lógicamente en `components`, `pages`, `hooks`, y `context`.

---

### 4. Cómo ejecutar todo

1. **API Express**: Levanta el servidor desde la carpeta `server/` con `npm run start`.
2. **App React**: Ingresa a `react/`, instala módulos y ejecuta el modo desarrollador con `npm run dev`.

---

### 5. Reglas básicas del examen

- **No modificar** la versión vanilla ni la API Express provista.
- **Sí puedes** crear cualquier estructura de React extra necesaria dentro del entorno Vite.

Para ver **cómo se puntúa** el examen, consulta `rubricas.md`.
