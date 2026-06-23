import './App.css'
import Favoritos from './pages/favoritos/Favoritos'
import Home from './pages/home/Home'
import StaticStack from './pages/static-stack/StaticStack'
import { useEffect, useState } from 'react'

function App() {
  const [route, setRoute] = useState(() => window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash)

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (route === '#pilha-estatica') {
    return <StaticStack />
  }

  if (route === '#favoritos') {
    return <Favoritos />
  }

  return <Home />
}

export default App
