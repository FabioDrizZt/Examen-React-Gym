import Error from '../components/Error'
import Loading from '../components/Loading'
import { useState, useEffect } from 'react'
import ClaseCard from './ClaseCard'

const categorias = ['Cardio', 'Fuerza', 'Flexibilidad', 'Combate'].sort()
const URL = '/data/clases.json'

export default function CategoriaSection() {
  const [clases, setClases] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => setClases(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (error) return <Error />
  if (loading) return <Loading />
  return (
    <>
      {categorias.map(cat =>
        <article key={cat} className="categoria">
          <h2>🏆 {cat}</h2>
          <div className="clases-grid" id={`grid-${cat}`}>
            {clases.filter(clase => clase.categoria === cat).map((c) =>
              <ClaseCard key={c.id} {...c} />
            )}
          </div>
        </article>
      )}
    </>
  )
}
