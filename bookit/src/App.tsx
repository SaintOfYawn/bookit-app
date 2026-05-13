import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import AdminPage from './pages/AdminPage'
import MainPage from './pages/MainPage'
import SpacesPage from './pages/SpacesPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/spaces" element={<SpacesPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
