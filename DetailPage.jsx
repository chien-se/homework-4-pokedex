import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function DetailPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [buttonHover, setButtonHover] = useState(false)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data))
  }, [name])

  if (!pokemon) return <p style={{ padding: '2rem' }}>Loading...</p>

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <button
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
        onClick={() => navigate(-1)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: buttonHover ? '#e9ecef' : '#fff',
          border: '1px solid #ddd',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          marginBottom: '1rem'
        }}
      >
        ← Back
      </button>
      <h1 style={{ textTransform: 'capitalize', color: '#333', marginTop: 0 }}>{pokemon.name}</h1>
      <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '100%', maxWidth: '200px' }} />
      </div>
      <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', lineHeight: '1.8', color: '#333' }}>
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      </div>
    </div>
  )
}
