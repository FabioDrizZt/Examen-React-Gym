import { Layout } from "./components/Layout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ClaseDetailPage } from "./pages/ClaseDetailPage.jsx";

// Componente raíz de la SPA.
// AQUÍ debes definir las rutas principales usando React Router.
export default function App() {
  return (
    <Layout>
        {/*
          Ejemplo :

          // 1) Ruta principal de catálogo:
          //    - path: "/"
          //    - componente: HomePage
          //
          // 2) Ruta de detalle de clase:
          //    - path: "/clases/:id"
          //    - componente: ClaseDetailPage
          //
          // 3) Ruta comodín para 404:
          //    - path: "*"
          //    - componente: página de "no encontrado"

          Sustituye este comentario por tu propia configuración de rutas.
        */}
    </Layout>
  );
}

