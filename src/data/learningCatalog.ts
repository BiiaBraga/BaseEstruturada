import type { LucideIcon } from 'lucide-react'
import arvoreBinariaImage from '../assets/algoritmos/arvoreBinaria.png'
import arvoreMultiplosFilhosImage from '../assets/algoritmos/arvoreMultiplosFilhos.png'
import avlImage from '../assets/algoritmos/AVL.png'
import bstImage from '../assets/algoritmos/BST.png'
import filaEncadeadaImage from '../assets/algoritmos/filaEncadeada.png'
import filaEstaticaImage from '../assets/algoritmos/filaEstatica.png'
import grafosImage from '../assets/algoritmos/grafos.png'
import heapImage from '../assets/algoritmos/heap.png'
import listaCircularImage from '../assets/algoritmos/listaCircular.png'
import listaDuplamenteEncadeadaImage from '../assets/algoritmos/listaDuplamenteEncadeada.png'
import listaEncadeadaImage from '../assets/algoritmos/listaEncadeada.png'
import listaEstaticaImage from '../assets/algoritmos/listaEstatica.png'
import pilhaEncadeadaImage from '../assets/algoritmos/pilhaEncadeada.png'
import pilhaEstaticaImage from '../assets/algoritmos/pilhaEstatica.png'
import rubroNegraImage from '../assets/algoritmos/rubroNegra.png'
import tabelaHashImage from '../assets/algoritmos/tabelaHash.png'

export type CardTheme = 'green' | 'blue' | 'orange' | 'violet' | 'pink' | 'cyan' | 'yellow' | 'red'

export type LearningItem = {
  aliases?: string[]
  title: string
  description: string
  theme: CardTheme
  image?: string
  Icon?: LucideIcon
  visualClassName?: string
  customVisual?: 'sortBars'
  href?: string
}

export type Category = {
  title: string
  description: string
  icon: 'linear' | 'network' | 'sort'
  items: LearningItem[]
}

export const favoritesStorageKey = 'base-estruturada:favorites'

export const categories: Category[] = [
  {
    title: 'Estruturas lineares',
    description: 'Listas, pilhas e filas - organização sequencial dos dados.',
    icon: 'linear',
    items: [
      {
        aliases: ['Lista estatica'],
        title: 'Lista estática',
        description: 'Lista baseada em arranjo de tamanho fixo.',
        theme: 'green',
        image: listaEstaticaImage,
        visualClassName: 'linear-image',
      },
      {
        title: 'Lista encadeada',
        description: 'Nós conectados por ponteiros.',
        theme: 'blue',
        image: listaEncadeadaImage,
        visualClassName: 'linear-image',
      },
      {
        title: 'Lista circular',
        description: 'O último nó aponta de volta ao primeiro.',
        theme: 'orange',
        image: listaCircularImage,
        visualClassName: 'linear-image',
      },
      {
        title: 'Lista duplamente encadeada',
        description: 'Cada nó referencia anterior e próximo.',
        theme: 'violet',
        image: listaDuplamenteEncadeadaImage,
        visualClassName: 'linear-image',
      },
      {
        aliases: ['Pilha estatica'],
        title: 'Pilha estática',
        description: 'Pilha baseada em arranjo com topo controlado por índice.',
        theme: 'pink',
        image: pilhaEstaticaImage,
        visualClassName: 'linear-image',
        href: '#pilha-estatica',
      },
      {
        title: 'Pilha encadeada',
        description: 'Pilha usando nós e ponteiros.',
        theme: 'cyan',
        image: pilhaEncadeadaImage,
        visualClassName: 'linear-image',
      },
      {
        aliases: ['Fila estatica'],
        title: 'Fila estática',
        description: 'Fila implementada em arranjo circular.',
        theme: 'yellow',
        image: filaEstaticaImage,
        visualClassName: 'linear-image',
      },
      {
        title: 'Fila encadeada',
        description: 'Fila baseada em ponteiros.',
        theme: 'blue',
        image: filaEncadeadaImage,
        visualClassName: 'linear-image',
      },
    ],
  },
  {
    title: 'Estruturas não lineares',
    description: 'Árvores, grafos e estruturas para relações não sequenciais.',
    icon: 'network',
    items: [
      {
        title: 'Heap',
        description: 'Árvore binária com propriedade de heap.',
        theme: 'green',
        image: heapImage,
        visualClassName: 'heap-image',
      },
      {
        title: 'Tabela Hash',
        description: 'Mapeamento via função de hash com tratamento de colisões.',
        theme: 'violet',
        image: tabelaHashImage,
        visualClassName: 'hash-image',
      },
      {
        title: 'Árvore Binária',
        description: 'Árvore binária básica para diversos usos.',
        theme: 'blue',
        image: arvoreBinariaImage,
        visualClassName: 'heap-image',
      },
      {
        title: 'BST (Árvore de Busca)',
        description: 'Árvore binária ordenada para buscas eficientes.',
        theme: 'red',
        image: bstImage,
        visualClassName: 'heap-image',
      },
      {
        title: 'AVL',
        description: 'Árvore balanceada com rotações automatizadas.',
        theme: 'yellow',
        image: avlImage,
        visualClassName: 'heap-image',
      },
      {
        title: 'Árvore Rubro-Negra',
        description: 'Árvore balanceada por cores e rotações.',
        theme: 'red',
        image: rubroNegraImage,
        visualClassName: 'heap-image',
      },
      {
        title: 'Árvore de Múltiplos Filhos',
        description: 'Árvore em que cada nó pode ter vários filhos.',
        theme: 'orange',
        image: arvoreMultiplosFilhosImage,
        visualClassName: 'heap-image',
      },
      {
        title: 'Grafos',
        description: 'Estrutura formada por vértices conectados por arestas.',
        theme: 'cyan',
        image: grafosImage,
        visualClassName: 'heap-image',
      },
    ],
  },
  {
    title: 'Algoritmos de ordenação',
    description: 'Organize dados de formas diferentes e compare desempenhos.',
    icon: 'sort',
    items: [
      {
        title: 'Bubble Sort',
        description: 'Compara pares vizinhos e empurra maiores para o fim.',
        theme: 'orange',
        customVisual: 'sortBars',
      },
      {
        title: 'Selection Sort',
        description: 'Seleciona o menor valor para cada posição.',
        theme: 'violet',
        customVisual: 'sortBars',
      },
      {
        title: 'Insertion Sort',
        description: 'Insere cada item na parte já ordenada.',
        theme: 'green',
        customVisual: 'sortBars',
      },
      {
        title: 'Shell Sort',
        description: 'Ordena por saltos cada vez menores.',
        theme: 'cyan',
        customVisual: 'sortBars',
      },
      {
        title: 'Merge Sort',
        description: 'Divide, ordena e combina sublistas.',
        theme: 'blue',
        customVisual: 'sortBars',
      },
      {
        title: 'Quick Sort',
        description: 'Particiona usando pivô e resolve recursivamente.',
        theme: 'pink',
        customVisual: 'sortBars',
      },
      {
        title: 'Heap Sort',
        description: 'Usa heap para extrair os maiores valores.',
        theme: 'yellow',
        customVisual: 'sortBars',
      },
    ],
  },
]

export function getAllLearningItems() {
  return categories.flatMap((category) => category.items)
}

export function findLearningItemByTitle(title: string) {
  return getAllLearningItems().find((item) => item.title === title || item.aliases?.includes(title))
}

export function getStoredFavorites() {
  const storedFavorites = window.localStorage.getItem(favoritesStorageKey)

  if (!storedFavorites) {
    return []
  }

  try {
    const parsedFavorites = JSON.parse(storedFavorites)
    return Array.isArray(parsedFavorites) ? parsedFavorites.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}
