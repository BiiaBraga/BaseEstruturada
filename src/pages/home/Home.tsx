import type { LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  ArrowUpDown,
  ChartColumn,
  Code2,
  Gauge,
  List,
  LockKeyhole,
  Moon,
  Network,
  Rocket,
  Search,
  Star,
} from 'lucide-react'
import Navbar from '../../components/navbar/Navbar'
import {
  categories,
  favoritesStorageKey,
  getStoredFavorites,
  type Category,
  type LearningItem,
} from '../../data/learningCatalog'
import computadorImage from '../../assets/computador.png'
import conteudosIcon from '../../assets/icons/icon_conteudos.png'
import possibilidadesIcon from '../../assets/icons/icon_possibilidades.png'
import playIcon from '../../assets/icons/icon_play.png'

const complexityItems = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)']

const sectionIcons: Record<Category['icon'], LucideIcon> = {
  linear: List,
  network: Network,
  sort: ArrowUpDown,
}

function normalizeSearchTerm(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function LockIcon() {
  return <LockKeyhole className="lock-icon" aria-hidden="true" strokeWidth={2.4} />
}

function PlayImageIcon() {
  return <img className="lock-icon play-image-icon" src={playIcon} alt="" aria-hidden="true" />
}

function SectionIcon({ type }: { type: Category['icon'] }) {
  const Icon = sectionIcons[type]

  return <Icon className="section-icon" aria-hidden="true" strokeWidth={2.2} />
}

function CardVisual({ item }: { item: LearningItem }) {
  if (item.image) {
    return <img className={`card-image ${item.visualClassName ?? ''}`} src={item.image} alt="" aria-hidden="true" />
  }

  if (item.customVisual === 'sortBars') {
    return (
      <div className="sort-bars-icon" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    )
  }

  const Icon = item.Icon ?? ChartColumn

  return <Icon className="card-library-icon" aria-hidden="true" strokeWidth={1.9} />
}

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [favoriteTitles, setFavoriteTitles] = useState<string[]>(getStoredFavorites)
  const normalizedSearchTerm = normalizeSearchTerm(searchTerm)
  const filteredCategories = useMemo(() => {
    if (!normalizedSearchTerm) {
      return categories
    }

    return categories
      .map((category) => {
        const items = category.items.filter((item) => normalizeSearchTerm(item.title).includes(normalizedSearchTerm))

        return { ...category, items }
      })
      .filter((category) => category.items.length > 0)
  }, [normalizedSearchTerm])
  const hasSearchResults = filteredCategories.length > 0

  function isFavorite(item: LearningItem) {
    return favoriteTitles.includes(item.title) || item.aliases?.some((alias) => favoriteTitles.includes(alias))
  }

  function toggleFavorite(item: LearningItem) {
    setFavoriteTitles((currentFavorites) => {
      const itemTitles = [item.title, ...(item.aliases ?? [])]
      const nextFavorites = itemTitles.some((title) => currentFavorites.includes(title))
        ? currentFavorites.filter((favoriteTitle) => !itemTitles.includes(favoriteTitle))
        : [...currentFavorites, item.title]

      window.localStorage.setItem(favoritesStorageKey, JSON.stringify(nextFavorites))
      return nextFavorites
    })
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="home" id="inicio">
        <header className="topbar">
          <label className="search-field">
            <span className="sr-only">Buscar estrutura ou algoritmo</span>
            <input
              type="search"
              placeholder="Buscar estrutura ou algoritmo..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <Search className="field-icon" aria-hidden="true" strokeWidth={1.9} />
          </label>
          <button className="theme-toggle" aria-label="Alternar tema">
            <Moon aria-hidden="true" strokeWidth={2.1} />
          </button>
        </header>

        <section className="hero-panel">
          <div className="hero-copy">
            <h1>
              Base <span>Estruturada</span>
            </h1>
            <p>Aprenda estruturas de dados e algoritmos visualizando o código e a execução, passo a passo.</p>
            <div className="hero-actions">
              <a href="#catalogo" className="primary-action">
                <Rocket aria-hidden="true" strokeWidth={2.2} />
                Explorar agora
              </a>
              <button className="ghost-action">
                <img className="button-image-icon" src={playIcon} alt="" aria-hidden="true" />
                Como funciona?
              </button>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <img src={computadorImage} alt="" />
          </div>

          <aside className="hero-stats" aria-label="Resumo da plataforma">
            <h2>
              <span className="tone-green">Visualize.</span>
              <span className="tone-cyan"> Entenda.</span>
              <span className="tone-purple"> Domine.</span>
            </h2>
            <p>
              Cada linha de <span className="text-purple">código é executada</span> e{' '}
              <span className="text-purple">explicada visualmente</span> para você entender de verdade.
            </p>
            <dl>
              <div className="stat-item purple">
                <img className="stat-icon image-icon" src={conteudosIcon} alt="" aria-hidden="true" />
                <dt>
                  <span className="stat-value">20+</span>
                </dt>
                <dd className="stat-label">Conteúdos</dd>
              </div>
              <div className="stat-item cyan">
                <Code2 className="stat-icon" aria-hidden="true" strokeWidth={2.2} />
                <dt>
                  <span className="stat-value">C</span>
                </dt>
                <dd className="stat-label">Linguagem inicial</dd>
              </div>
              <div className="stat-item green">
                <img className="stat-icon image-icon" src={possibilidadesIcon} alt="" aria-hidden="true" />
                <dt>
                  <span className="stat-value">∞</span>
                </dt>
                <dd className="stat-label">Possibilidades</dd>
              </div>
            </dl>
          </aside>
        </section>

        <div className="content-grid" id="catalogo">
          {hasSearchResults ? (
            filteredCategories.map((category) => (
              <section className={`category-section ${category.icon}`} key={category.title}>
                <div className="category-header">
                  <SectionIcon type={category.icon} />
                  <div>
                    <h2>{category.title}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>

                <div className="cards-grid">
                  {category.items.map((item) => (
                    <article className={`learning-card ${item.theme}`} key={item.title}>
                      <button
                        className={`favorite-button ${isFavorite(item) ? 'active' : ''}`}
                        type="button"
                        aria-label={`${isFavorite(item) ? 'Remover dos favoritos' : 'Favoritar'} ${item.title}`}
                        aria-pressed={isFavorite(item)}
                        onClick={() => toggleFavorite(item)}
                      >
                        <Star aria-hidden="true" strokeWidth={1.8} />
                      </button>
                      <CardVisual item={item} />
                      <div className="card-copy">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      {item.href ? (
                        <a className="locked-button card-action-button" href={item.href}>
                          <PlayImageIcon />
                          Visualizar
                        </a>
                      ) : (
                        <button className="locked-button" disabled>
                          <LockIcon />
                          EM BREVE
                        </button>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <section className="empty-search" aria-live="polite">
              <Search aria-hidden="true" strokeWidth={1.9} />
              <h2>Nenhum resultado encontrado</h2>
              <p>Tente buscar por nomes como pilha, fila, lista, hash ou sort.</p>
            </section>
          )}
        </div>

        <section className="performance-strip" aria-label="Teste de performance">
          <Gauge className="performance-icon" aria-hidden="true" strokeWidth={1.8} />
          <div className="performance-copy">
            <h2>Teste de performance</h2>
            <p>Compare complexidade de tempo e espaço com gráficos simples quando as visualizações forem liberadas.</p>
            <button className="locked-button" disabled>
              <LockIcon />
              EM BREVE
            </button>
          </div>
          <div className="complexity-grid">
            {complexityItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
