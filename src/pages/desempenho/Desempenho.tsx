import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  Box,
  Clock3,
  Code2,
  Flag,
  Info,
  PlayCircle,
  Star,
  Trash2,
  Zap,
} from 'lucide-react'
import Navbar from '../../components/navbar/Navbar'
import logoIcon from '../../assets/icons/icon_logo.png'
import { categories } from '../../data/learningCatalog'
import {
  clearProgressData,
  getProgressData,
  getTotalLearningItemsCount,
  type ProgressData,
} from '../../data/progressStorage'

function formatDuration(milliseconds: number) {
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes}m`
  }

  return `${hours}h ${minutes}m`
}

function getProgressPercent(visitedCount: number) {
  const totalItems = getTotalLearningItemsCount()
  return totalItems > 0 ? Math.round((visitedCount / totalItems) * 100) : 0
}

function Desempenho() {
  const [progress, setProgress] = useState<ProgressData>(() => getProgressData())
  const [now, setNow] = useState(() => Date.now())
  const [showClearConfirmation, setShowClearConfirmation] = useState(false)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now())
      setProgress(getProgressData())
    }, 15000)

    return () => window.clearInterval(interval)
  }, [])

  const visitedItems = useMemo(
    () => Object.values(progress.visits).sort((first, second) => second.lastVisitedAt - first.lastVisitedAt),
    [progress.visits],
  )
  const simulations = progress.simulations
  const visitedCount = visitedItems.length
  const progressPercent = getProgressPercent(visitedCount)
  const studyTime = now - progress.startedAt

  const summaryItems = [
    { label: 'Estruturas visitadas', detail: 'Nesta sessão', value: String(visitedCount), Icon: Box, tone: 'violet' },
    { label: 'Simulações realizadas', detail: 'Nesta sessão', value: String(simulations.length), Icon: Code2, tone: 'cyan' },
    { label: 'Tempo de estudo', detail: 'Nesta sessão', value: formatDuration(studyTime), Icon: Clock3, tone: 'blue' },
    { label: 'Progresso da sessão', detail: 'Com base no explorado', value: `${progressPercent}%`, Icon: BarChart3, tone: 'yellow' },
  ]

  const categoryProgress = categories.map((category, index) => {
    const exploredCount = category.items.filter((item) => progress.visits[item.title]).length
    const totalCount = category.items.length
    const value = totalCount > 0 ? Math.round((exploredCount / totalCount) * 100) : 0
    const tones = ['violet', 'cyan', 'yellow', 'blue'] as const

    return {
      label: category.title,
      value,
      count: `${exploredCount} / ${totalCount} ${totalCount === 1 ? 'explorada' : 'exploradas'}`,
      Icon: index === 0 ? Box : index === 1 ? Code2 : BarChart3,
      tone: tones[index % tones.length],
    }
  })

  const achievements = [
    {
      title: 'Primeiros passos',
      detail: 'Visitou 3 estruturas',
      achieved: visitedCount >= 3,
      Icon: Flag,
      tone: 'violet',
    },
    {
      title: 'Explorador',
      detail: 'Fez 10 simulações',
      achieved: simulations.length >= 10,
      Icon: PlayCircle,
      tone: 'green',
    },
    {
      title: 'Dedicado',
      detail: 'Estudou por 30 min',
      achieved: studyTime >= 30 * 60000,
      Icon: Zap,
      tone: 'blue',
    },
    {
      title: 'Praticando',
      detail: 'Fez 20 simulações',
      achieved: simulations.length >= 20,
      Icon: Code2,
      tone: 'yellow',
    },
    {
      title: 'Quase lá!',
      detail: 'Progresso acima de 80%',
      achieved: progressPercent >= 80,
      Icon: Star,
      tone: 'violet',
    },
  ]

  function handleClearProgress() {
    setProgress(clearProgressData())
    setNow(Date.now())
    setShowClearConfirmation(false)
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="home performance-page" id="desempenho">
        <header className="performance-header">
          <div>
            <h1>Desempenho</h1>
            <p>Acompanhe seu progresso nesta sessão</p>
          </div>
          <button className="clear-progress-button" type="button" onClick={() => setShowClearConfirmation(true)}>
            <Trash2 aria-hidden="true" strokeWidth={1.9} />
            Limpar progresso
          </button>
        </header>

        {showClearConfirmation && (
          <div className="confirm-toast" role="alertdialog" aria-labelledby="clear-progress-title">
            <div>
              <strong id="clear-progress-title">Tem certeza que deseja limpar o progresso?</strong>
              <p>Essa ação apaga as visitas, simulações e conquistas salvas neste navegador.</p>
            </div>
            <div className="confirm-toast-actions">
              <button type="button" onClick={() => setShowClearConfirmation(false)}>
                Cancelar
              </button>
              <button className="danger" type="button" onClick={handleClearProgress}>
                Limpar progresso
              </button>
            </div>
          </div>
        )}

        <section className="performance-summary" aria-label="Resumo de desempenho">
          {summaryItems.map(({ label, detail, value, Icon, tone }) => (
            <article className={`performance-stat ${tone}`} key={label}>
              <Icon aria-hidden="true" strokeWidth={1.9} />
              <strong>{value}</strong>
              <span>{label}</span>
              <p>{detail}</p>
            </article>
          ))}
        </section>

        <p className="performance-note">
          <Info aria-hidden="true" strokeWidth={1.9} />
          Os dados são salvos apenas neste dispositivo e podem ser perdidos ao limpar o cache.
        </p>

        <section className="performance-panel">
          <h2>Progresso por categoria</h2>
          <p>Baseado nas estruturas que você explorou nesta sessão</p>
          <div className="category-progress-list">
            {categoryProgress.map(({ label, value, count, Icon, tone }) => (
              <div className={`category-progress-item ${tone}`} key={label}>
                <Icon aria-hidden="true" strokeWidth={1.9} />
                <strong>{label}</strong>
                <div className="category-progress-track">
                  <span style={{ width: `${value}%` }} />
                </div>
                <b>{value}%</b>
                <em>{count}</em>
              </div>
            ))}
          </div>
          <p className="continue-tip">
            <Star aria-hidden="true" strokeWidth={1.9} />
            Continue explorando para aumentar seu progresso!
          </p>
        </section>

        <section className="performance-panel achievements-panel">
          <h2>Conquistas desta sessão</h2>
          <p>Badges temporárias baseadas no seu progresso atual</p>
          <div className="achievement-grid">
            {achievements.map(({ title, detail, achieved, Icon, tone }) => (
              <article className={`achievement-card ${tone} ${achieved ? 'achieved' : 'locked'}`} key={title}>
                <Icon aria-hidden="true" strokeWidth={1.8} />
                <strong>{title}</strong>
                <span>{detail}</span>
              </article>
            ))}
          </div>
          <p className="performance-note inside">
            <Info aria-hidden="true" strokeWidth={1.9} />
            Conquistas são temporárias e serão redefinidas ao limpar o progresso.
          </p>
        </section>

        <section className="performance-tip-card">
          <div>
            <h2>Dica para continuar evoluindo</h2>
            <p>
              Explore diferentes estruturas e execute várias simulações para entender melhor seu comportamento e melhorar
              seu raciocínio lógico!
            </p>
          </div>
          <img src={logoIcon} alt="" aria-hidden="true" />
        </section>

        <p className="performance-warning">
          <Info aria-hidden="true" strokeWidth={1.9} />
          Importante: seu progresso é armazenado apenas neste dispositivo usando o cache do navegador. Limpar o cache ou
          usar outro dispositivo irá apagar seus dados locais.
        </p>

      </main>
    </div>
  )
}

export default Desempenho
