import { Routes, Route } from 'react-router-dom'
import SearchPage from './SearchPage'
import DetailPage from './DetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/pokemon/:name" element={<DetailPage />} />
    </Routes>
  )
}
