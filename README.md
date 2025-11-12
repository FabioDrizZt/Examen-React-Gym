# Examen: Conversión de Aplicación de Gimnasio a React 

## Introducción

El objetivo de este proyecto es tomar una aplicación existente de visualización de clases de gimnasio, llamada **Birra y Bíceps**, desarrollada en **HTML, CSS y JavaScript**, y convertirla a **React** utilizando **Vite**. Deberán seguir las mejores prácticas y patrones de diseño de React, aprovechando los hooks y herramientas clave, tales como `useState`, `useEffect`, `react-router`, `useNavigate`, y **Custom Hooks**.

## Archivos de Datos

Los archivos JSON con la información de clases y administradores se encuentran en la carpeta **`data/`**:
- `data/clases.json` - Contiene el catálogo completo de clases de gimnasio con sus cervezas incluidas
- `data/administradores.json` - Contiene los administradores registrados para autenticación

**IMPORTANTE**: Al convertir a React con Vite, estos archivos deben moverse a la carpeta **`public/data/`** para que sean accesibles mediante fetch.

## Requerimientos Técnicos

La conversión debe implementar lo siguiente:

- **useState**: Para manejar el estado de las clases, administradores y otros datos relevantes.
- **useEffect**: Para manejar la carga inicial de datos (como las clases desde el archivo JSON) y la actualización del componente.
- **react-router**: Para manejar la navegación entre la página principal y la de detalles de la clase.
- **useNavigate**: Para redirigir a los usuarios entre las diferentes páginas (por ejemplo, después de seleccionar una clase).
- **useContext**: Para manejar el estado global de autenticación del administrador. Este estado debe mostrarse en todas las páginas, donde el componente de login muestra el nombre del administrador y su rol cuando está logueado, y el botón de cierre de sesión. No se requiere redirigir después de iniciar sesión.
- **Custom Hooks**: Para encapsular la lógica de autenticación de administradores.

## Pasos para la Conversión

### 1. Inicializar el Proyecto con Vite
- Crea un nuevo proyecto utilizando **Vite**.
- Organiza la estructura del proyecto en carpetas adecuadas (`components`, `hooks`, `context`, etc.).
- **Crea la carpeta `public/data/`** y copia los archivos `clases.json` y `administradores.json` dentro de ella.

#### Ejemplo de Fetch en React:
En React con Vite, los archivos en la carpeta `public/` son accesibles directamente. Para cargar los datos:

```javascript
// Ejemplo de carga de clases
useEffect(() => {
  const fetchClases = async () => {
    try {
      const response = await fetch('/data/clases.json');
      const data = await response.json();
      setClases(data);
    } catch (error) {
      console.error('Error al cargar clases:', error);
    }
  };
  
  fetchClases();
}, []);

// Ejemplo de validación de administradores
const fetchAdministradores = async () => {
  try {
    const response = await fetch('/data/administradores.json');
    const data = await response.json();
    return data.admins;
  } catch (error) {
    console.error('Error al cargar administradores:', error);
    return [];
  }
};
```

**Nota**: La ruta comienza con `/data/` (no `./data/` ni `../data/`) porque Vite sirve automáticamente el contenido de `public/` desde la raíz.

### 2. Crear las Rutas con `react-router`
- Implementa el enrutamiento con **react-router**:
  - Ruta principal (`/`): Donde se mostrarán las clases disponibles organizadas por categoría.
  - Ruta de detalles de la clase (`/clase/:id`): Donde se mostrará la información completa de la clase seleccionada.
  - **Ruta 404 (`*`)**: Para manejar páginas no encontradas. Debe mostrar un mensaje de error temático (con emojis de cerveza y pesas) y un botón para volver al inicio.

### 3. Página Principal (Componente `Home`)
- **useState**: Para manejar la lista de clases agrupadas por categoría.
- **useEffect**: Para cargar las clases desde el archivo `clases.json`.
- **useNavigate**: Al hacer clic en una clase, navega a la página de detalles usando `useNavigate()`.
- Debe mostrar las clases organizadas por categorías: **Cardio**, **Fuerza**, **Flexibilidad** y **Combate**.

### 4. Página de Detalles de la Clase (Componente `ClaseDetail`)
- **useEffect**: Para leer el ID de la clase desde la URL y cargar los datos correspondientes.
- **useState**: Para manejar los detalles de la clase.
- Muestra la información completa de la clase:
  - Imagen
  - Nombre y instructor
  - Resumen
  - Duración, nivel y calorías quemadas
  - **Información de la cerveza incluida** (nombre, tipo, graduación, origen, descripción)
  - Horarios disponibles
  - Equipamiento necesario
  - Beneficios
- Incluye un botón para **volver al catálogo**.

### 5. Página 404 (Componente `NotFound`)
- Crea un componente para manejar rutas no encontradas.
- Debe mostrar:
  - El logo de **BIRRA Y BÍCEPS** (🍺💪).
  - Un mensaje de error **404 - Página no encontrada**.
  - Una descripción amigable del error relacionada con la temática (ejemplo: "Parece que esta clase se fue a tomar una birra 🍺").
  - Un botón para **volver al inicio** usando `useNavigate()`.
- Mantén la estética consistente con el resto de la aplicación (colores de Quilmes: azul oscuro #003D82, dorado #D4AF37, blanco).

### 6. Sistema de Autenticación
- **useContext**: Crea un contexto para manejar el estado de autenticación del administrador.
  - El formulario de inicio de sesión debe mostrarse si el administrador no ha iniciado sesión.
  - Una vez autenticado, debe actualizarse el componente de login para mostrar el nombre completo, el rol y el botón de cerrar sesión.
  - La información debe persistir durante la navegación entre páginas.

### 7. Implementación de Custom Hooks
- **useAuth**: Un custom hook para manejar la lógica de autenticación de administradores.
  - Validación contra el archivo `administradores.json`.
  - Manejo del estado de autenticación.
  - Funciones de login y logout.

## Requerimientos Funcionales

1. **Visualización de clases**: La lista de clases debe cargarse dinámicamente desde el archivo `clases.json` ubicado en `public/data/`, organizadas por categorías (Cardio, Fuerza, Flexibilidad, Combate).
2. **Autenticación de administradores**: El sistema debe permitir iniciar sesión usando los datos de `administradores.json` ubicado en `public/data/`. Debe mostrar el formulario de login o la información del administrador (nombre completo y rol) según corresponda. Al iniciar sesión, solo debe actualizarse el componente de login, sin redirecciones.
3. **Navegación**: Implementar navegación entre la página principal, detalles de clase y página 404.
4. **Página 404**: Debe mostrar un mensaje de error amigable y temático cuando se acceda a una ruta inexistente, con opción de volver al inicio.
5. **Hooks personalizados**: Se deben implementar hooks personalizados para la lógica de autenticación.
6. **Responsive**: La aplicación debe verse correctamente en dispositivos móviles y desktop.
7. **Información de cerveza**: Cada clase debe mostrar claramente la información de la cerveza incluida (nombre, tipo, graduación, origen y descripción).

## Estructura Sugerida del Proyecto React

```
birra-y-biceps-react/
├── public/
│   └── data/
│       ├── clases.json
│       └── administradores.json
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Login.jsx
│   │   ├── ClaseCard.jsx
│   │   ├── CategoriaSection.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ClaseDetail.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Evaluación

1. **Funcionalidad**: La aplicación debe funcionar correctamente en React.
2. **Uso de Hooks**: Se evaluará el uso adecuado de `useState`, `useEffect`, `useNavigate`, `useContext`, y custom hooks.
3. **Modularidad**: El código debe estar bien organizado y estructurado en componentes reutilizables.
4. **Estado Global**: El estado de autenticación debe manejarse correctamente con `useContext` y reflejarse en todas las páginas.
5. **Manejo de errores**: Implementación correcta de la página 404 y manejo de errores en las peticiones fetch.
6. **Carga de datos**: Correcta implementación del fetch a los archivos JSON desde la carpeta `public/data/`.
7. **Diseño**: Mantener la estética de Quilmes (azul oscuro, dorado y blanco) y la funcionalidad responsive.

## Entrega

Los alumnos deberán subir el proyecto a un repositorio de **GitHub**, con instrucciones claras para ejecutarlo, y enviar el enlace antes de la fecha límite.

---

## Rúbrica de Evaluación

**Puntaje Total: 100 puntos**

### 1. React Router - Navegación (10 puntos)

| Criterio | Excelente (9-10) | Bueno (7-8) | Regular (4-6) | Insuficiente (0-3) |
|----------|------------------|---------------|---------------|-------------------|
| **Implementación de rutas** | Todas las rutas funcionan correctamente: `/` (Home), `/clase/:id` (Detalles), `*` (404). Navegación fluida con `useNavigate` | Rutas principales funcionan, puede faltar 404 o tener errores menores en navegación | Rutas implementadas pero con errores significativos en la navegación | No implementa react-router o rutas no funcionales |

**Puntos clave a evaluar:**
- ✅ Instalación de `react-router-dom`
- ✅ Configuración de `BrowserRouter`
- ✅ Ruta principal `/` funcional
- ✅ Ruta dinámica `/clase/:id` funcional
- ✅ Ruta 404 `*` implementada
- ✅ Uso correcto de `useNavigate()` para navegación programática

---

### 2. useState - Manejo de Estado Local (10 puntos)

| Criterio | Excelente (9-10) | Bueno (7-8) | Regular (4-6) | Insuficiente (0-3) |
|----------|-----------------|-------------|---------------|-------------------|
| **Uso de useState** | `useState` usado correctamente en múltiples componentes: lista de clases, detalles de clase, estados de carga, filtros por categoría | `useState` implementado en componentes principales con algunos errores menores | `useState` usado pero de forma incorrecta o incompleta | No usa `useState` o su uso es completamente erróneo |

**Puntos clave a evaluar:**
- ✅ Estado para lista de clases en Home
- ✅ Estado para clases agrupadas por categoría
- ✅ Estado para detalles de clase en ClaseDetail
- ✅ Estados de carga (loading) implementados
- ✅ Manejo correcto de la actualización del estado

---

### 3. useEffect - Efectos y Carga de Datos (10 puntos)

| Criterio | Excelente (9-10) | Bueno (7-8) | Regular (4-6) | Insuficiente (0-3) |
|----------|------------------|---------------|---------------|-------------------|
| **Implementación de useEffect** | `useEffect` usado correctamente para cargar datos de clases y administradores. Manejo adecuado de dependencias y cleanup cuando necesario | `useEffect` implementado para carga de datos con errores menores en dependencias | `useEffect` usado pero con problemas significativos (bucles infinitos, dependencias incorrectas) | No usa `useEffect` o su uso genera errores críticos |

**Puntos clave a evaluar:**
- ✅ Carga de clases desde `/data/clases.json`
- ✅ Carga de clase individual en ClaseDetail
- ✅ Array de dependencias correcto `[]` para carga inicial
- ✅ Manejo de errores en peticiones fetch
- ✅ Estados de carga mientras se obtienen datos

---

### 4. useContext - Estado Global de Autenticación (15 puntos)

| Criterio | Excelente (13-15) | Bueno (10-12) | Regular (6-9) | Insuficiente (0-5) |
|----------|------------------|---------------|---------------|-------------------|
| **Context API implementado** | `AuthContext` creado y usado correctamente. Estado de autenticación disponible en toda la app. Login y logout funcionan perfectamente. Se muestra nombre completo y rol del administrador o formulario según corresponda | Context implementado, funciona pero con errores menores en la sincronización del estado | Context creado pero con problemas significativos en su implementación o uso | No implementa `useContext` o no funciona |

**Puntos clave a evaluar:**
- ✅ Archivo `AuthContext.jsx` creado
- ✅ Provider envolviendo la aplicación
- ✅ Estado de administrador compartido globalmente
- ✅ Funciones `login` y `logout` disponibles en el contexto
- ✅ Componente Login actualizado según estado (formulario vs info administrador con rol)
- ✅ Estado persiste durante la navegación

---

### 5. Custom Hook - useAuth (10 puntos)

| Criterio | Excelente (9-10) | Bueno (7-8) | Regular (4-6) | Insuficiente (0-3) |
|----------|-----------------|-------------|---------------|-------------------|
| **Custom Hook implementado** | `useAuth` hook personalizado implementado correctamente. Encapsula lógica de autenticación, validación de administradores contra `administradores.json`, retorna funciones y estados necesarios | Hook creado y funcional con errores menores | Hook creado pero no encapsula correctamente la lógica o tiene errores | No implementa custom hook |

**Puntos clave a evaluar:**
- ✅ Archivo `useAuth.js` en carpeta `hooks/`
- ✅ Lógica de login encapsulada
- ✅ Validación contra `administradores.json`
- ✅ Retorna funciones y estados necesarios (usuario, rol, isAuthenticated, login, logout)
- ✅ Reutilizable y siguiendo convenciones de hooks

---

### 6. Página Principal - Home (10 puntos)

| Criterio | Excelente (9-10) | Bueno (7-8) | Regular (4-6) | Insuficiente (0-3) |
|----------|-----------------|-------------|---------------|-------------------|
| **Componente Home funcional** | Muestra todas las clases correctamente organizadas por categorías (Cardio, Fuerza, Flexibilidad, Combate), cards interactivas con información de cerveza, navegación a detalles funciona perfectamente, diseño atractivo con colores Quilmes | Muestra clases, navegación funciona con errores menores de UI o categorías | Muestra clases pero con problemas en navegación, categorización o diseño | No muestra clases o no funciona |

**Puntos clave a evaluar:**
- ✅ Renderiza lista completa de clases
- ✅ Clases organizadas por categorías (Cardio, Fuerza, Flexibilidad, Combate)
- ✅ Componentes `ClaseCard` reutilizables
- ✅ Cards muestran información básica y cerveza incluida
- ✅ Click en clase navega a detalles
- ✅ Diseño responsive
- ✅ Manejo de estado de carga

---

### 7. Página de Detalles - ClaseDetail (10 puntos)

| Criterio | Excelente (9-10) | Bueno (7-8) | Regular (4-6) | Insuficiente (0-3) |
|----------|-----------------|-------------|---------------|-------------------|
| **Componente ClaseDetail funcional** | Muestra todos los detalles de la clase: imagen, título, instructor, resumen, duración, nivel, calorías, horarios, equipamiento, beneficios y destacadamente la información completa de la cerveza incluida. Obtiene ID de URL correctamente, botón volver funciona | Muestra información principal con detalles menores faltantes (puede faltar equipamiento o beneficios) | Muestra información pero con problemas significativos o falta información de cerveza | No muestra detalles o no funciona |

**Puntos clave a evaluar:**
- ✅ Uso de `useParams()` para obtener ID
- ✅ Carga de datos de clase específica
- ✅ Muestra imagen, título, instructor, resumen
- ✅ Muestra duración, nivel, calorías quemadas
- ✅ **Sección destacada de cerveza incluida** con nombre, tipo, graduación, origen y descripción
- ✅ Muestra horarios disponibles
- ✅ Muestra equipamiento necesario
- ✅ Muestra beneficios de la clase
- ✅ Botón "Volver al catálogo" funcional
- ✅ Manejo de clase no encontrada

---

### 8. Página 404 - NotFound (5 puntos)

| Criterio | Excelente (5) | Bueno (4) | Regular (2-3) | Insuficiente (0-1) |
|----------|--------------|-----------|---------------|-------------------|
| **Componente NotFound** | Página 404 completa con logo BIRRA Y BÍCEPS (🍺💪), mensaje de error 404, descripción amigable temática, botón de retorno funcional, estética consistente (colores Quilmes) | Página 404 funcional con elementos menores faltantes | Página 404 básica sin estética o funcionalidad completa | No implementa página 404 |

**Puntos clave a evaluar:**
- ✅ Logo de BIRRA Y BÍCEPS visible (🍺💪)
- ✅ Mensaje "404 - Página no encontrada"
- ✅ Descripción amigable del error temática (relacionada con cerveza/gimnasio)
- ✅ Botón "Volver al inicio" con `useNavigate()`
- ✅ Estética consistente (colores Quilmes: azul oscuro, dorado, blanco)

---

### 9. Sistema de Autenticación (15 puntos)

| Criterio | Excelente (13-15) | Bueno (10-12) | Regular (6-9) | Insuficiente (0-5) |
|----------|------------------|---------------|---------------|-------------------|
| **Login funcional** | Sistema de login completo: formulario funcional, valida contra `administradores.json`, muestra errores, actualiza UI mostrando nombre completo del administrador y su rol, botón de logout funciona, no hay redirecciones innecesarias | Login funciona, validación correcta con errores menores en UI | Login implementado pero con problemas de validación o UI | Login no funciona o no implementado |

**Puntos clave a evaluar:**
- ✅ Formulario de login (usuario y contraseña)
- ✅ Validación contra `administradores.json`
- ✅ Mensajes de error informativos
- ✅ UI actualizada al iniciar sesión (muestra nombre completo y rol del administrador)
- ✅ Botón de "Cerrar sesión" funcional
- ✅ No redirige después de login (solo actualiza componente)
- ✅ Estado persistente durante navegación

---

### 10. Modularidad y Organización del Código (5 puntos)

| Criterio | Excelente (5) | Bueno (4) | Regular (2-3) | Insuficiente (0-1) |
|----------|--------------|-----------|---------------|-------------------|
| **Código limpio y organizado** | Componentes bien separados, código reutilizable, nombres descriptivos, comentarios cuando necesario, sin código repetido. Estructura de carpetas clara (components, pages, hooks, context) | Código organizado con mejoras menores posibles | Código funcional pero desorganizado o repetitivo | Código desorganizado y difícil de mantener |

**Puntos clave a evaluar:**
- ✅ Componentes en archivos separados
- ✅ Nombres descriptivos de variables y funciones
- ✅ No hay código duplicado
- ✅ Imports organizados
- ✅ Código legible y mantenible
- ✅ Estructura de carpetas coherente

---

## Criterios de Desaprobación Automática

El proyecto será desaprobado automáticamente si:
- ❌ La aplicación no ejecuta o tiene errores críticos que impiden su funcionamiento
- ❌ No se implementa el sistema de categorías de clases

---

## Bonus (Hasta 10 puntos adicionales)

Puntos extras por implementaciones adicionales:
- **+3 puntos**: Persistencia de sesión con localStorage
- **+4 puntos**: Filtros de búsqueda por categoría (Cardio, Fuerza, Flexibilidad, Combate) con botones o dropdown
- **+3 puntos**: Buscador de clases por nombre o instructor

---

## Notas Adicionales

### Temática Quilmes
La aplicación debe mantener la identidad visual inspirada en la marca Quilmes:
- **Colores principales**: Azul oscuro (#003D82), Dorado (#D4AF37), Blanco (#FFFFFF)
- **Logo**: 🍺💪 BIRRA Y BÍCEPS
- **Slogan**: "Porque la vida es equilibrio"

### Datos Importantes
- Cada clase incluye una **cerveza específica** con información detallada
- Las clases están organizadas en **4 categorías**: Cardio, Fuerza, Flexibilidad y Combate
- Cada clase tiene información de: instructor, duración, nivel, calorías, horarios, equipamiento y beneficios
- Los administradores tienen: nombre, apellido, username, password, rol y email

### Recomendaciones
1. Comienza configurando el routing básico
2. Implementa la carga de datos antes de diseñar componentes complejos
3. Crea el AuthContext temprano para tener el estado global disponible
4. Usa componentes reutilizables para las cards de clases
5. Mantén la consistencia visual con los colores de Quilmes
6. No olvides el manejo de errores y estados de carga
7. Asegúrate de que la información de la cerveza sea destacada en cada clase

