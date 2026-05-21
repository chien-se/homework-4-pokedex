import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query) return
    setLoading(true)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=500&offset=0`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.results.filter(p => p.name.includes(query.toLowerCase()))
        setResults(filtered)
        setLoading(false)
      })
  }, [query])

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '1rem' }}>Pokédex</h1>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Pokémon..."
        style={{
          padding: '0.75rem',
          width: '100%',
          fontSize: '1rem',
          marginBottom: '1.5rem',
          border: '2px solid #ddd',
          borderRadius: '8px',
          boxSizing: 'border-box',
          fontFamily: 'inherit'
        }}
      />
      {loading && <p style={{ color: '#666' }}>Loading...</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map(p => (
          <li
            key={p.name}
            onMouseEnter={() => setHoveredItem(p.name)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => navigate(`/pokemon/${p.name}`)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #ddd',
              marginBottom: '0.75rem',
              cursor: 'pointer',
              borderRadius: '8px',
              backgroundColor: hoveredItem === p.name ? '#fff3cd' : '#fff',
              transition: 'all 0.2s ease',
              textTransform: 'capitalize'
            }}
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
