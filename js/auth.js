/**
 * auth.js
 * 
 * Este archivo maneja la lógica de autenticación en Vanilla JS.
 * En tu versión de React, esta lógica debería vivir dentro de un `AuthContext` 
 * y/o un custom hook llamado `useAuth` para que el estado global esté disponible
 * en cualquier componente sin prop drilling.
 */

// Estado global primitivo
let currentUser = JSON.parse(localStorage.getItem('user')) || null;
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

/**
 * Renderiza el formulario de login o la tarjeta de usuario logueado.
 * En React: Se usaría el estado `isLoggedIn` para mostrar condicionalmente
 * el componente <Login /> o <LoggedCard />.
 */
function renderAuthHeader() {
    const container = document.getElementById("login-container");
    if (!container) return;

    if (isLoggedIn && currentUser) {
        // En React, este JSX estaría en el componente <LoggedCard />
        container.innerHTML = `
            <div id="userInfo">
                <span id="userNameDisplay">Bienvenido, ${currentUser.firstName} - ${currentUser.rol}</span>
                <button id="logoutBtn" class="btn-quilmes-secondary">Cerrar sesión</button>
            </div>
        `;
        document.getElementById("logoutBtn").addEventListener("click", logout);
    } else {
        // En React, este JSX estaría en el componente <Login />
        container.innerHTML = `
            <form id="loginForm">
                <input type="text" id="username" placeholder="Usuario" required />
                <input type="password" id="password" placeholder="Contraseña" required />
                <button type="submit" class="btn-quilmes">Ingresar</button>
            </form>
        `;
        document.getElementById("loginForm").addEventListener("submit", login);
    }
}

/**
 * Función manejadora de inicio de sesión.
 * En React: Formaría parte del `AuthContext.jsx` y se expondría mediante `useAuth()`.
 */
async function login(e) {
    e.preventDefault();
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        if (response.ok) {
            const adminData = await response.json();
            // Actualizamos la "store" local
            currentUser = adminData;
            isLoggedIn = true;
            
            // Persistencia en localStorage (Esto también lo puedes hacer en el useEffect o login en React)
            localStorage.setItem('user', JSON.stringify(adminData));
            localStorage.setItem('isLoggedIn', 'true');
            
            // Re-renderizamos para reflejar el estado logueado
            renderAuthHeader();
        } else {
            window.alert('🍺 Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error("Error al autenticar", error);
        window.alert("Error de red.");
    }
}

/**
 * Función manejadora de cierre de sesión.
 * En React: También viviría en `AuthContext.jsx`.
 */
function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    renderAuthHeader();
}

// Render base inicial automático al cargar cualquier página
document.addEventListener("DOMContentLoaded", () => {
    renderAuthHeader();
});
