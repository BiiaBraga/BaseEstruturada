import './App.css'
import Desempenho from './pages/desempenho/Desempenho'
import Favoritos from './pages/favoritos/Favoritos'
import Home from './pages/home/Home'
import Sobre from './pages/sobre/Sobre'
import StaticStack from './pages/static-stack/StaticStack'
import { useEffect, useState } from 'react'
import { recordRouteVisit } from './data/progressStorage'

function App() {
  const [route, setRoute] = useState(() => window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash)

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    recordRouteVisit(route)
  }, [route])

  if (route === '#pilha-estatica') {
    return <StaticStack />
  }

  if (route === '#favoritos') {
    return <Favoritos />
  }

  if (route === '#sobre') {
    return <Sobre />
  }

  if (route === '#desempenho') {
    return <Desempenho />
  }

  return <Home />
}

export default App
