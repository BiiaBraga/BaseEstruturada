import type { CSSProperties } from 'react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChartNoAxesCombined, CodeXml, Heart, History, House, Info, Lightbulb, X } from 'lucide-react'
import Footer from '../footer/Footer'
import desenvolvedorImage from '../../assets/desenvolvedor.png'
import logoIcon from '../../assets/icons/icon_logo.png'

type MenuItem = {
  label: string
  Icon: LucideIcon
  href: string
}

const menuItems: MenuItem[] = [
  { label: 'Inicio', Icon: House, href: '#inicio' },
  { label: 'Favoritos', Icon: Heart, href: '#favoritos' },
  { label: 'Histórico', Icon: History, href: '#historico' },
  { label: 'Desempenho', Icon: ChartNoAxesCombined, href: '#desempenho' },
  { label: 'Sobre', Icon: Info, href: '#sobre' },
]

const mentorCardStyle = {
  '--mentor-image': `url(${desenvolvedorImage})`,
} as CSSProperties

function Navbar() {
  const currentRoute = window.location.hash || '#inicio'
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false)
  const [suggestionName, setSuggestionName] = useState('')
  const [suggestionEmail, setSuggestionEmail] = useState('')
  const [suggestionMessage, setSuggestionMessage] = useState('')
  const [suggestionSent, setSuggestionSent] = useState(false)
  const [isSendingSuggestion, setIsSendingSuggestion] = useState(false)
  const [suggestionError, setSuggestionError] = useState('')

  async function handleSuggestionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSendingSuggestion(true)
    setSuggestionError('')

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('https://formsubmit.co/ajax/7523e525f01b659f0c766c31d3136bc3', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Não foi possível enviar a sugestão.')
      }

      setSuggestionSent(true)
      setSuggestionName('')
      setSuggestionEmail('')
      setSuggestionMessage('')
    } catch {
      setSuggestionError('Não foi possível enviar agora. Tente novamente em alguns instantes.')
    } finally {
      setIsSendingSuggestion(false)
    }
  }

  return (
    <>
      <aside className="sidebar" aria-label="Navegacao principal">
        <a className="brand" href="#inicio" aria-label="Base Estruturada - inicio">
          <img className="brand-icon" src={logoIcon} alt="" aria-hidden="true" />
          <span>
            Base
            <strong>Estruturada</strong>
          </span>
        </a>

        <nav className="sidebar-nav">
          {menuItems.map(({ label, Icon, href }) => (
            <a className={`nav-button ${currentRoute === href ? 'active' : ''}`} href={href} key={label}>
              <Icon className="nav-icon" aria-hidden="true" strokeWidth={1.9} />
              {label}
            </a>
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
            cada passo do código
            <br />
            em tempo real!
          </p>
        </section>

        <button
          className="suggest-button"
          type="button"
          onClick={() => {
            setSuggestionSent(false)
            setIsSuggestionOpen(true)
          }}
        >
          <Lightbulb aria-hidden="true" strokeWidth={2} />
          Sugira um algoritmo
        </button>

        <Footer />
      </aside>

      {isSuggestionOpen && (
        <div className="suggest-modal-backdrop" role="presentation">
          <section className="suggest-modal" role="dialog" aria-modal="true" aria-labelledby="suggest-title">
            <header>
              <div>
                <h2 id="suggest-title">Sugira um algoritmo</h2>
                <p>Envie uma ideia para entrar na Base Estruturada.</p>
              </div>
              <button type="button" aria-label="Fechar formulário" onClick={() => setIsSuggestionOpen(false)}>
                <X aria-hidden="true" strokeWidth={1.9} />
              </button>
            </header>

            {suggestionSent ? (
              <div className="suggest-success" role="status">
                <Lightbulb aria-hidden="true" strokeWidth={2} />
                <strong>Sugestão enviada!</strong>
                <p>Obrigada por contribuir com a Base Estruturada. Sua ideia foi registrada para análise.</p>
                <button type="button" onClick={() => setIsSuggestionOpen(false)}>
                  Fechar
                </button>
              </div>
            ) : (
            <form
              onSubmit={handleSuggestionSubmit}
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Sugestão de algoritmo - Base Estruturada" />
              <label>
                Nome
                <input
                  name="nome"
                  type="text"
                  value={suggestionName}
                  onChange={(event) => setSuggestionName(event.target.value)}
                  placeholder="Seu nome"
                />
              </label>
              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  value={suggestionEmail}
                  onChange={(event) => setSuggestionEmail(event.target.value)}
                  placeholder="seuemail@exemplo.com"
                />
              </label>
              <label>
                Sugestão
                <textarea
                  name="mensagem"
                  value={suggestionMessage}
                  onChange={(event) => setSuggestionMessage(event.target.value)}
                  placeholder="Ex.: Quero sugerir Árvore B, Dijkstra, BFS..."
                  required
                />
              </label>
              {suggestionError && <p className="suggest-error">{suggestionError}</p>}
              <div className="suggest-modal-actions">
                <button type="button" onClick={() => setIsSuggestionOpen(false)}>
                  Cancelar
                </button>
                <button className="primary" type="submit" disabled={isSendingSuggestion}>
                  {isSendingSuggestion ? 'Enviando...' : 'Enviar sugestão'}
                </button>
              </div>
            </form>
            )}
          </section>
        </div>
      )}
    </>
  )
}

export default Navbar
