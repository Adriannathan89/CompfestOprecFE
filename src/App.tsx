import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './auth/auth.page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}