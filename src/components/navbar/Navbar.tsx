import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChartNoAxesCombined, CodeXml, Heart, History, House, Info, Lightbulb } from 'lucide-react'
import Footer from '../footer/Footer'
import desenvolvedorImage from '../../assets/desenvolvedor.png'
import logoIcon from '../../assets/icons/icon_logo.png'

type MenuItem = {
  label: string
  Icon: LucideIcon
}

const menuItems: MenuItem[] = [
  { label: 'Inicio', Icon: House },
  { label: 'Favoritos', Icon: Heart },
  { label: 'Historico', Icon: History },
  { label: 'Desempenho', Icon: ChartNoAxesCombined },
  { label: 'Sobre', Icon: Info },
]

const mentorCardStyle = {
  '--mentor-image': `url(${desenvolvedorImage})`,
} as CSSProperties

function Navbar() {
  return (
    <aside className="sidebar" aria-label="Navegacao principal">
      <a className="brand" href="#inicio" aria-label="Base Estruturada - inicio">
        <img className="brand-icon" src={logoIcon} alt="" aria-hidden="true" />
        <span>
          Base
          <strong>Estruturada</strong>
        </span>
      </a>

      <nav className="sidebar-nav">
        {menuItems.map(({ label, Icon }, index) => (
          <button className={`nav-button ${index === 0 ? 'active' : ''}`} key={label}>
            <Icon className="nav-icon" aria-hidden="true" strokeWidth={1.9} />
            {label}
          </button>
        ))}
      </nav>

      <section
        className="mentor-card"
        style={mentorCardStyle}
        aria-label="Resumo didatico"
      >
        <CodeXml className="code-chip" aria-hidden="true" strokeWidth={1.9} />
        <p>
          Aprenda visualizando
          <br />
          cada passo do codigo
          <br />
          em tempo real!
        </p>
      </section>

      <button className="suggest-button">
        <Lightbulb aria-hidden="true" strokeWidth={2} />
        Sugira um algoritmo
      </button>

      <Footer />
    </aside>
  )
}

export default Navbar
