import type { LucideIcon } from 'lucide-react'
import { ChartColumn, Heart, LockKeyhole, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import {
  favoritesStorageKey,
  findLearningItemByTitle,
  getStoredFavorites,
  type LearningItem,
} from '../../data/learningCatalog'
import playIcon from '../../assets/icons/icon_play.png'

function LockIcon() {
  return <LockKeyhole className="lock-icon" aria-hidden="true" strokeWidth={2.4} />
}

function PlayImageIcon() {
  return <img className="lock-icon play-image-icon" src={playIcon} alt="" aria-hidden="true" />
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

  const Icon: LucideIcon = item.Icon ?? ChartColumn

  return <Icon className="card-library-icon" aria-hidden="true" strokeWidth={1.9} />
}

function Favoritos() {
  const [favoriteTitles, setFavoriteTitles] = useState<string[]>(getStoredFavorites)
  const favoriteItems = useMemo(() => {
    return favoriteTitles
      .map((title) => findLearningItemByTitle(title))
      .filter((item): item is LearningItem => Boolean(item))
  }, [favoriteTitles])

  function removeFavorite(item: LearningItem) {
    setFavoriteTitles((currentFavorites) => {
      const itemTitles = [item.title, ...(item.aliases ?? [])]
      const nextFavorites = currentFavorites.filter((favoriteTitle) => !itemTitles.includes(favoriteTitle))
      window.localStorage.setItem(favoritesStorageKey, JSON.stringify(nextFavorites))
      return nextFavorites
    })
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="home favorites-page" id="favoritos">
        <section className="page-heading">
          <div>
            <p>Minha lista</p>
            <h1>Favoritos</h1>
          </div>
          <Heart aria-hidden="true" strokeWidth={2.1} />
        </section>

        {favoriteItems.length > 0 ? (
          <section className="category-section">
            <div className="cards-grid favorites-grid">
              {favoriteItems.map((item) => (
                <article className={`learning-card ${item.theme}`} key={item.title}>
                  <button
                    className="favorite-button active"
                    type="button"
                    aria-label={`Remover ${item.title} dos favoritos`}
                    aria-pressed={true}
                    onClick={() => removeFavorite(item)}
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
        ) : (
          <section className="empty-search favorites-empty" aria-live="polite">
            <Heart aria-hidden="true" strokeWidth={1.9} />
            <h2>Nenhum favorito ainda</h2>
            <p>Volte para o início e clique na estrela dos conteúdos que você quer guardar.</p>
            <a className="primary-action" href="#inicio">
              Ver conteúdos
            </a>
          </section>
        )}
      </main>
    </div>
  )
}

export default Favoritos
