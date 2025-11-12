import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="logo-title-large">🍺💪 BIRRA Y BÍCEPS</h1>
        <p className="slogan-large">Porque la vida es equilibrio.</p>

        <div className="error-message">
          <h2 className="error-code">404</h2>
          <h3 className="error-title">¡Clase No Encontrada!</h3>
          <p className="error-description">
            Parece que esta clase se fue a tomar una birra sin avisar. 🍺
          </p>
          <p className="error-subdescription">
            No te preocupes, tenemos muchas otras clases esperándote en el catálogo.
          </p>

          <Link to="/" className="btn-quilmes btn-large">
            🏠 Volver al Catálogo
          </Link>
        </div>

        <div className="beer-animation">
          <div className="beer-glass">🍺</div>
          <div className="dumbbell">🏋️</div>
        </div>
      </div>
    </div>
  )
}
