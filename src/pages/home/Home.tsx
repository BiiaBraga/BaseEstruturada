import type { LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  ArrowUpDown,
  BookOpen,
  Box,
  ChartColumn,
  Clock3,
  Code2,
  Database,
  Gauge,
  Grid2X2,
  List,
  LockKeyhole,
  MousePointerClick,
  Moon,
  Network,
  Play,
  Rocket,
  Search,
  Star,
  X,
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

const howSteps = [
  {
    title: 'Escolha',
    description: 'Escolha uma estrutura ou algoritmo para explorar.',
    Icon: Box,
  },
  {
    title: 'Código',
    description: 'Veja o código sendo executado linha a linha.',
    Icon: Code2,
  },
  {
    title: 'Simulação',
    description: 'Execute operações e veja cada passo acontecendo.',
    Icon: Play,
  },
  {
    title: 'Memória',
    description: 'Visualize a memória, índices, ponteiros e valores.',
    Icon: Grid2X2,
  },
  {
    title: 'Conceito',
    description: 'Entenda a teoria por trás da estrutura ou algoritmo.',
    Icon: BookOpen,
  },
  {
    title: 'Complexidade',
    description: 'Compare os custos de tempo e espaço.',
    Icon: ChartColumn,
  },
]

const howChoices = [
  {
    title: 'Pilha Estática',
    description: 'Último a entrar, primeiro a sair',
    Icon: Box,
  },
  {
    title: 'Lista Encadeada',
    description: 'Elementos ligados por ponteiros',
    Icon: Network,
  },
  {
    title: 'Fila',
    description: 'Primeiro a entrar, primeiro a sair',
    Icon: ArrowUpDown,
  },
  {
    title: 'Árvore Binária',
    description: 'Estrutura hierárquica de dados',
    Icon: Network,
  },
  {
    title: 'Tabela Hash',
    description: 'Armazenamento por chave',
    Icon: Database,
  },
  {
    title: 'Quick Sort',
    description: 'Ordenação por divisão e conquista',
    Icon: ArrowUpDown,
  },
]

const howExploreItems = [
  { label: 'Conceitos teóricos', Icon: BookOpen },
  { label: 'Código em C', Icon: Code2 },
  { label: 'Simulações interativas', Icon: Play },
  { label: 'Visualização da memória', Icon: Grid2X2 },
  { label: 'Complexidade de tempo e espaço', Icon: Clock3 },
]

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
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)
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

  function goToHomeStart() {
    setIsHowItWorksOpen(false)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)

    window.setTimeout(() => {
      document.getElementById('inicio')?.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
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
              <button className="ghost-action" type="button" onClick={() => setIsHowItWorksOpen(true)}>
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

        {isHowItWorksOpen && (
          <div className="how-modal-backdrop" role="presentation" onClick={() => setIsHowItWorksOpen(false)}>
            <section
              className="how-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="how-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="how-close-button"
                type="button"
                aria-label="Fechar explicação"
                onClick={() => setIsHowItWorksOpen(false)}
              >
                <X aria-hidden="true" strokeWidth={1.9} />
              </button>

              <header className="how-modal-header">
                <h2 id="how-modal-title">
                  Como funciona a <span>Base Estruturada?</span>
                </h2>
                <p>Aprenda estruturas de dados e algoritmos visualizando o código e a execução, passo a passo.</p>
              </header>

              <div className="how-modal-layout">
                <aside className="how-steps" aria-label="Etapas da plataforma">
                  {howSteps.map(({ title, description, Icon }, index) => (
                    <div className="how-step" key={title}>
                      <span className="how-step-number">{index + 1}</span>
                      <span className="how-step-icon">
                        <Icon aria-hidden="true" strokeWidth={2} />
                      </span>
                      <span className="how-step-copy">
                        <strong>{title}</strong>
                        <small>{description}</small>
                      </span>
                    </div>
                  ))}
                </aside>

                <div className="how-main">
                  <section className="how-choice-panel">
                    <div className="how-section-title">
                      <span>1</span>
                      <div>
                        <h3>Escolha uma estrutura ou algoritmo</h3>
                        <p>Explore diferentes estruturas de dados e algoritmos disponíveis.</p>
                      </div>
                    </div>

                    <div className="how-choice-grid">
                      {howChoices.map(({ title, description, Icon }) => (
                        <article className="how-choice-card" key={title}>
                          <Icon aria-hidden="true" strokeWidth={1.9} />
                          <strong>{title}</strong>
                          <p>{description}</p>
                        </article>
                      ))}
                    </div>
                  </section>

                  <div className="how-demo-grid">
                    <section className="how-demo-card">
                      <div className="how-section-title compact">
                        <span>2</span>
                        <h3>Veja o código sendo executado</h3>
                      </div>
                      <p>As linhas do código são destacadas conforme a execução avança.</p>
                      <pre className="how-code-preview" aria-label="Exemplo de código">
                        <code>{`01  void empilhar(Pilha* p, int valor) {
02    if (p->topo == MAX - 1) {
03      printf("Pilha cheia!\\n");
04      return;
05    }
06    p->vetor[p->topo] = valor;
07    p->topo++;
08  }`}</code>
                      </pre>
                    </section>

                    <section className="how-demo-card">
                      <div className="how-section-title compact">
                        <span>3</span>
                        <h3>Simule as operações passo a passo</h3>
                      </div>
                      <p>Execute operações e acompanhe cada passo da execução.</p>
                      <div className="how-operation-actions" aria-hidden="true">
                        <span>
                          <Play aria-hidden="true" strokeWidth={2} />
                          Executar
                        </span>
                        <span>Pausar</span>
                        <span>Resetar</span>
                      </div>
                      <ol className="how-operation-list">
                        <li>
                          <span>1</span>
                          empilhar(10)
                        </li>
                        <li>
                          <span>2</span>
                          empilhar(20)
                        </li>
                        <li className="active">
                          <span>3</span>
                          empilhar(30)
                        </li>
                        <li>
                          <span>4</span>
                          desempilhar()
                        </li>
                      </ol>
                    </section>

                    <section className="how-demo-card">
                      <div className="how-section-title compact">
                        <span>4</span>
                        <h3>Visualize a estrutura em tempo real</h3>
                      </div>
                      <p>Acompanhe a estrutura de dados mudando durante a execução.</p>
                      <div className="how-stack-preview" aria-hidden="true">
                        <div className="how-stack-column">
                          <span>Índice</span>
                          <span>4</span>
                          <span>3</span>
                          <span>2</span>
                          <span>1</span>
                          <span>0</span>
                        </div>
                        <div className="how-stack-cells">
                          <span />
                          <strong>30</strong>
                          <strong>20</strong>
                          <strong>10</strong>
                          <em>-</em>
                        </div>
                        <div className="how-stack-info">
                          <strong>Informações</strong>
                          <span>Tamanho: 3</span>
                          <span>Capacidade: 5</span>
                          <span>Topo: 3</span>
                        </div>
                      </div>
                    </section>
                  </div>

                  <section className="how-footer-panel">
                    <div>
                      <h3>O que você pode explorar?</h3>
                      <div className="how-explore-grid">
                        {howExploreItems.map(({ label, Icon }) => (
                          <span key={label}>
                            <Icon aria-hidden="true" strokeWidth={1.9} />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="how-learn-box">
                      <MousePointerClick aria-hidden="true" strokeWidth={1.9} />
                      <div>
                        <h3>Aprenda fazendo</h3>
                        <p>
                          A Base Estruturada transforma conceitos abstratos em experiências visuais. Você entende não
                          apenas o resultado de uma operação, mas todo o caminho percorrido pelo algoritmo.
                        </p>
                      </div>
                    </div>
                  </section>

                  <button className="how-start-button" type="button" onClick={goToHomeStart}>
                    Começar agora
                    <Rocket aria-hidden="true" strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
