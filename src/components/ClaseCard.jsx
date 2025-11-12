import { Link } from 'react-router-dom'

export default function ClaseCard({ id, nombre, instructor, categoria, duracion, nivel, imagen, birra_incluida }) {
  return (
    <div key={id} className="card">
      <Link to={`/clase/${id}`}>
        <div className="card-picture">
          <img src={imagen} alt={nombre} title={nombre} />
          <div className="card-badge">{categoria}</div>
        </div>
        <div className="card-content">
          <h3 className="card-title">{nombre}</h3>
          <p className="card-instructor">👨‍🏫 {instructor}</p>
          <div className="card-info">
            <span className="card-duration">⏱️ {duracion} min</span>
            <span className="card-level">📊 {nivel}</span>
          </div>
          <div className="card-beer">
            <p className="card-beer-title">🍺 Cerveza Incluida</p>
            <p className="card-beer-name">{birra_incluida.nombre}</p>
            <p className="card-beer-type">{birra_incluida.tipo}</p>
          </div>
        </div>
      </Link>
    </div>)
}
