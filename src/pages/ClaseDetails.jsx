import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const URL = '/data/clases.json'

export default function ClaseDetails() {
  const [clase, setClase] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const id = Number(useParams().id)

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => setClase(data.find(c => c.id === id)))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (error) return <Error />
  if (loading) return <Loading />
  return (
    <>
      <Header />
      <main className="clase-page-container">
        <Link to="/" className="back-btn">← Volver al catálogo</Link>
        <div className="clase-details">
          <div className="clase-header">
            <h2>{clase.nombre}</h2>
            <p className="instructor">👨‍🏫 Instructor: {clase.instructor}</p>
          </div>

          <div className="clase-body">
            <div>
              <img src={clase.imagen} alt={clase.nombre} className="clase-image" />

              <div className="clase-meta">
                <div className="meta-item">
                  <strong>⏱️ Duración</strong>
                  <span>{clase.duracion} min</span>
                </div>
                <div className="meta-item">
                  <strong>📊 Nivel</strong>
                  <span>{clase.nivel}</span>
                </div>
                <div className="meta-item">
                  <strong>🔥 Calorías</strong>
                  <span>{clase.calorias_quemadas}</span>
                </div>
              </div>

              <div className="beer-section">
                <h3>🍺 CERVEZA INCLUIDA</h3>
                <div className="beer-details">
                  <div className="beer-detail-item">
                    <strong>Nombre:</strong>
                    <span>{clase.birra_incluida.nombre}</span>
                  </div>
                  <div className="beer-detail-item">
                    <strong>Tipo:</strong>
                    <span>{clase.birra_incluida.tipo}</span>
                  </div>
                  <div className="beer-detail-item">
                    <strong>Graduación:</strong>
                    <span>{clase.birra_incluida.graduacion}</span>
                  </div>
                  <div className="beer-detail-item">
                    <strong>Origen:</strong>
                    <span>{clase.birra_incluida.origen}</span>
                  </div>
                </div>
                <div className="beer-description">
                  {clase.birra_incluida.descripcion}
                </div>
              </div>
            </div>

            <div className="clase-info">
              <h3>📝 Descripción</h3>
              <p>{clase.resumen}</p>

              <h3>📅 Horarios Disponibles</h3>
              <ul className="horarios-list">
                {clase.horarios.map(horario => <li>{horario}</li>)}
              </ul>

              <h3>🎒 Equipamiento Necesario</h3>
              <ul className="equipamiento-list">
                {clase.equipamiento.map(item => <li>{item}</li>)}
              </ul>

              <h3>💪 Beneficios</h3>
              <ul className="beneficios-list">
                {clase.beneficios.map(beneficio => <li>{beneficio}</li>)}
              </ul>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
