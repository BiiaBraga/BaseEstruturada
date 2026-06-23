import { categories, getAllLearningItems } from './learningCatalog'

export type ProgressVisit = {
  title: string
  category: string
  visits: number
  lastVisitedAt: number
}

export type ProgressSimulation = {
  id: string
  title: string
  category: string
  action: string
  at: number
}

export type ProgressCodeView = {
  fileName: string
  title: string
  at: number
}

export type ProgressData = {
  startedAt: number
  visits: Record<string, ProgressVisit>
  simulations: ProgressSimulation[]
  codeViews: ProgressCodeView[]
}

const progressStorageKey = 'base-estruturada:progress'

const routeStructureMap: Record<string, string> = {
  '#pilha-estatica': 'Pilha estática',
}

function createEmptyProgress(): ProgressData {
  return {
    startedAt: Date.now(),
    visits: {},
    simulations: [],
    codeViews: [],
  }
}

function findItemCategory(title: string) {
  const category = categories.find((itemCategory) =>
    itemCategory.items.some((item) => item.title === title || item.aliases?.includes(title)),
  )

  return category?.title ?? 'Conteúdos'
}

export function getProgressData(): ProgressData {
  const storedProgress = window.localStorage.getItem(progressStorageKey)

  if (!storedProgress) {
    const initialProgress = createEmptyProgress()
    window.localStorage.setItem(progressStorageKey, JSON.stringify(initialProgress))
    return initialProgress
  }

  try {
    const parsedProgress = JSON.parse(storedProgress) as Partial<ProgressData>
    return {
      startedAt: typeof parsedProgress.startedAt === 'number' ? parsedProgress.startedAt : Date.now(),
      visits: parsedProgress.visits && typeof parsedProgress.visits === 'object' ? parsedProgress.visits : {},
      simulations: Array.isArray(parsedProgress.simulations) ? parsedProgress.simulations : [],
      codeViews: Array.isArray(parsedProgress.codeViews) ? parsedProgress.codeViews : [],
    }
  } catch {
    const initialProgress = createEmptyProgress()
    window.localStorage.setItem(progressStorageKey, JSON.stringify(initialProgress))
    return initialProgress
  }
}

export function saveProgressData(progress: ProgressData) {
  window.localStorage.setItem(progressStorageKey, JSON.stringify(progress))
}

export function clearProgressData() {
  const initialProgress = createEmptyProgress()
  saveProgressData(initialProgress)
  return initialProgress
}

export function recordStructureVisit(title: string) {
  const progress = getProgressData()
  const category = findItemCategory(title)
  const existingVisit = progress.visits[title]

  progress.visits[title] = {
    title,
    category,
    visits: (existingVisit?.visits ?? 0) + 1,
    lastVisitedAt: Date.now(),
  }

  saveProgressData(progress)
}

export function recordRouteVisit(route: string) {
  const title = routeStructureMap[route]

  if (title) {
    recordStructureVisit(title)
  }
}

export function recordSimulation(title: string, action: string) {
  const progress = getProgressData()
  const category = findItemCategory(title)

  progress.simulations.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title,
    category,
    action,
    at: Date.now(),
  })

  progress.simulations = progress.simulations.slice(0, 80)
  saveProgressData(progress)
}

export function recordCodeView(title: string, fileName: string) {
  const progress = getProgressData()
  const existingIndex = progress.codeViews.findIndex((codeView) => codeView.fileName === fileName)
  const nextCodeView = {
    fileName,
    title,
    at: Date.now(),
  }

  progress.codeViews =
    existingIndex >= 0
      ? [nextCodeView, ...progress.codeViews.filter((_, index) => index !== existingIndex)]
      : [nextCodeView, ...progress.codeViews]

  progress.codeViews = progress.codeViews.slice(0, 40)
  saveProgressData(progress)
}

export function getTotalLearningItemsCount() {
  return getAllLearningItems().length
}
