import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Box, ChevronRight, Code2, FileText, Heart, History, Info, Trash2 } from 'lucide-react'
import Navbar from '../../components/navbar/Navbar'
import { findLearningItemByTitle, getStoredFavorites } from '../../data/learningCatalog'
import {
  clearProgressData,
  getProgressData,
  type ProgressData,
  type ProgressSimulation,
  type ProgressVisit,
} from '../../data/progressStorage'

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp)
}

function formatLongAccess(timestamp: number) {
  return `hoje às ${formatTime(timestamp)}`
}

function Historico() {
  const [progress, setProgress] = useState<ProgressData>(() => getProgressData())
  const [favorites] = useState(() => getStoredFavorites())
  const [activePopup, setActivePopup] = useState<'visits' | 'activity' | 'codes' | 'favorites' | null>(null)
  const [showClearConfirmation, setShowClearConfirmation] = useState(false)

  useEffect(() => {
    const interval = window.setInterval(() => setProgress(getProgressData()), 15000)
    return () => window.clearInterval(interval)
  }, [])

  const visitedItems = useMemo(
    () => Object.values(progress.visits).sort((first, second) => second.lastVisitedAt - first.lastVisitedAt),
    [progress.visits],
  )
  const simulations = progress.simulations
  const codeViews = progress.codeViews
  const lastVisit = visitedItems[0]
  const favoriteItems = favorites
    .map((title) => findLearningItemByTitle(title))
    .filter((item): item is NonNullable<ReturnType<typeof findLearningItemByTitle>> => Boolean(item))

  function handleClearHistory() {
    setProgress(clearProgressData())
    setShowClearConfirmation(false)
  }

  function renderVisitsList(items: ProgressVisit[]) {
    return items.length > 0 ? (
      <ul className="visited-list history-list">
        {items.map((item) => (
          <li key={item.title}>
            <Box aria-hidden="true" strokeWidth={1.9} />
            <span>
              <strong>{item.title}</strong>
              <small>{item.category}</small>
            </span>
            <time>{formatTime(item.lastVisitedAt)}</time>
          </li>
        ))}
      </ul>
    ) : (
      <p className="empty-performance-message">Nenhuma estrutura visitada ainda.</p>
    )
  }

  function renderActivityList(items: ProgressSimulation[]) {
    return items.length > 0 ? (
      <ul className="activity-list history-list">
        {items.map((simulation) => (
          <li key={simulation.id}>
            <Code2 aria-hidden="true" strokeWidth={1.9} />
            <span>
              <strong>{simulation.title}</strong>
              <small>{simulation.action}</small>
            </span>
            <time>{formatTime(simulation.at)}</time>
          </li>
        ))}
      </ul>
    ) : (
      <p className="empty-performance-message">Nenhuma simulação realizada ainda.</p>
    )
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="home history-page" id="historico">
        <header className="history-header">
          <History aria-hidden="true" strokeWidth={1.8} />
          <div>
            <h1>Histórico</h1>
            <p>Acompanhe suas atividades nesta sessão.</p>
          </div>
        </header>

        <section className="continue-card">
          <h2>Continuar de onde parou</h2>
          <div className="continue-content">
            <Box aria-hidden="true" strokeWidth={1.8} />
            <div>
              <h3>{lastVisit?.title ?? 'Nenhuma estrutura visitada'}</h3>
              <p>Aba: Simulação</p>
              <span>{lastVisit ? `Último acesso: ${formatLongAccess(lastVisit.lastVisitedAt)}` : 'Explore uma estrutura para começar.'}</span>
            </div>
            <a className="primary-action" href={lastVisit?.title === 'Pilha estática' ? '#pilha-estatica' : '#inicio'}>
              Continuar
              <ChevronRight aria-hidden="true" strokeWidth={1.9} />
            </a>
          </div>
        </section>

        <div className="history-grid">
          <section className="history-panel">
            <h2><Box aria-hidden="true" strokeWidth={1.9} />Últimas estruturas visitadas</h2>
            {renderVisitsList(visitedItems.slice(0, 5))}
            <button className="outline-action" type="button" onClick={() => setActivePopup('visits')}>
              Ver todas
              <ChevronRight aria-hidden="true" strokeWidth={1.9} />
            </button>
          </section>

          <section className="history-panel">
            <h2><Code2 aria-hidden="true" strokeWidth={1.9} />Últimas simulações executadas</h2>
            {renderActivityList(simulations.slice(0, 5))}
            <button className="outline-action" type="button" onClick={() => setActivePopup('activity')}>
              Ver todas
              <ChevronRight aria-hidden="true" strokeWidth={1.9} />
            </button>
          </section>

          <section className="history-panel">
            <h2><FileText aria-hidden="true" strokeWidth={1.9} />Últimos códigos visualizados</h2>
            {codeViews.length > 0 ? (
              <ul className="code-history-list">
                {codeViews.slice(0, 5).map((codeView) => (
                  <li key={codeView.fileName}>
                    <FileText aria-hidden="true" strokeWidth={1.9} />
                    <span>
                      <strong>{codeView.fileName}</strong>
                      <small>{codeView.title}</small>
                    </span>
                    <time>{formatTime(codeView.at)}</time>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-performance-message">Nenhum código visualizado ainda.</p>
            )}
            <button className="outline-action" type="button" onClick={() => setActivePopup('codes')}>
              Ver todas
              <ChevronRight aria-hidden="true" strokeWidth={1.9} />
            </button>
          </section>

          <section className="history-panel">
            <h2><Heart aria-hidden="true" strokeWidth={1.9} />Favoritos acessados</h2>
            {favoriteItems.length > 0 ? (
              <ul className="favorite-history-list">
                {favoriteItems.slice(0, 5).map((item, index) => (
                  <li key={item.title}>
                    <Heart aria-hidden="true" strokeWidth={1.9} />
                    <span>{item.title}</span>
                    <time>{index < 2 ? 'Hoje' : index === 2 ? 'Ontem' : '2 dias atrás'}</time>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-performance-message">Nenhum favorito salvo ainda.</p>
            )}
            <button className="outline-action" type="button" onClick={() => setActivePopup('favorites')}>
              Ver todas
              <ChevronRight aria-hidden="true" strokeWidth={1.9} />
            </button>
          </section>
        </div>

        <section className="history-manage-card">
          <div>
            <h2><Trash2 aria-hidden="true" strokeWidth={1.9} />Gerenciar histórico local</h2>
            <p>Seus dados de navegação e atividades são armazenados apenas neste navegador.</p>
            <p>Ao limpar, todo o histórico será removido permanentemente.</p>
          </div>
          <button type="button" onClick={() => setShowClearConfirmation(true)}>
            Limpar histórico
          </button>
        </section>

        {showClearConfirmation && (
          <div className="confirm-toast" role="alertdialog" aria-labelledby="clear-history-title">
            <div>
              <strong id="clear-history-title">Tem certeza que deseja limpar o histórico?</strong>
              <p>Essa ação apaga as visitas e simulações salvas neste navegador.</p>
            </div>
            <div className="confirm-toast-actions">
              <button type="button" onClick={() => setShowClearConfirmation(false)}>
                Cancelar
              </button>
              <button className="danger" type="button" onClick={handleClearHistory}>
                Limpar histórico
              </button>
            </div>
          </div>
        )}

        <p className="history-warning">
          <Info aria-hidden="true" strokeWidth={1.9} />
          Importante: ao limpar o cache do navegador, seu histórico também será apagado.
        </p>

        {activePopup && (
          <div className="performance-popup-backdrop" role="presentation">
            <section className="performance-popup" role="dialog" aria-modal="true" aria-labelledby="history-popup-title">
              <header>
                <button type="button" onClick={() => setActivePopup(null)}>
                  <ArrowLeft aria-hidden="true" strokeWidth={1.9} />
                  Voltar
                </button>
                <div>
                  <h2 id="history-popup-title">
                    {activePopup === 'visits'
                      ? 'Todas as estruturas visitadas'
                      : activePopup === 'activity'
                        ? 'Histórico desta sessão'
                        : activePopup === 'codes'
                          ? 'Códigos visualizados'
                          : 'Favoritos acessados'}
                  </h2>
                  <p>Lista completa salva localmente neste navegador.</p>
                </div>
              </header>

              <div className="performance-popup-content">
                {activePopup === 'visits' && renderVisitsList(visitedItems)}
                {activePopup === 'activity' && renderActivityList(simulations)}
                {activePopup === 'codes' && (
                  codeViews.length > 0 ? (
                    <ul className="code-history-list history-list">
                      {codeViews.map((codeView) => (
                        <li key={codeView.fileName}>
                          <FileText aria-hidden="true" strokeWidth={1.9} />
                          <span>
                            <strong>{codeView.fileName}</strong>
                            <small>{codeView.title}</small>
                          </span>
                          <time>{formatTime(codeView.at)}</time>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-performance-message">Nenhum código visualizado ainda.</p>
                  )
                )}
                {activePopup === 'favorites' && (
                  favoriteItems.length > 0 ? (
                    <ul className="favorite-history-list history-list">
                      {favoriteItems.map((item, index) => (
                        <li key={item.title}>
                          <Heart aria-hidden="true" strokeWidth={1.9} />
                          <span>{item.title}</span>
                          <time>{index < 2 ? 'Hoje' : index === 2 ? 'Ontem' : '2 dias atrás'}</time>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-performance-message">Nenhum favorito salvo ainda.</p>
                  )
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default Historico
