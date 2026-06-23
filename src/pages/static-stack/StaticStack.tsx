import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowDown, ArrowUp, BarChart3, Box, CheckCircle2, ChevronDown, ChevronRight, Code2,
  Copy, Eye, GitBranch, Lightbulb, List, Moon, Play, RotateCcw, Sparkles, StepBack } from 'lucide-react'
import Navbar from '../../components/navbar/Navbar'
import staticStackImage from '../../assets/algoritmos/pilhaEstatica.png'
import { recordSimulation } from '../../data/progressStorage'

type StackTab = 'simulation' | 'code' | 'concept' | 'memory' | 'complexity'
type MainOperation = 'push' | 'pop' | 'peek'

type StackStep = {
  command: string
  values: number[]
  memoryValues?: number[]
  count: number
  capacity: number
  value?: number
  desempilhado?: number
  topIndex?: number
  vectorReady?: boolean
  line: number | number[]
  log: string
}

type StackContent = {
  id: string
  title: string
  description: string
  image: string
  sourceLabel: string
  visualTitle: string
  memoryTitle: string
  conceptTitle: string
  concept: string
  conceptDetails: string[]
  tip: string
  capacityLabel: string
  variables: Array<{ label: string; getValue: (step: StackStep) => string | number }>
  codeLines: string[]
  fullCodeLines: string[]
  steps: StackStep[]
}

const sourceBaseUrl = 'https://github.com/BiiaBraga/DataStructure/tree/main/pilhas'

const staticCodeLines = [
  '// bibliotecas',
  '#include <stdio.h>',
  '#include <stdlib.h>',
  '',
  '#define CAPACIDADE 10',
  '',
  'struct Pilha {',
  '    int vetor[CAPACIDADE];',
  '    int cont;',
  '};',
  'typedef struct Pilha Pilha;',
  '',
  'void empilha(Pilha *pilha, int valor) {',
  '    if (pilha->cont == CAPACIDADE) {',
  '        printf("[ERRO] A PILHA ESTAH CHEIA");',
  '        return;',
  '    }',
  '',
  '    pilha->vetor[pilha->cont] = valor;',
  '    pilha->cont++;',
  '}',
  '',
  'int desempilha(Pilha *pilha) {',
  '    int desempilhado;',
  '',
  '    if (pilha->cont == 0) {',
  '        printf("[ERRO] A PILHA ESTAH VAZIA");',
  '        return -1;',
  '    }',
  '',
  '    pilha->cont--;',
  '    desempilhado = pilha->vetor[pilha->cont];',
  '    return desempilhado;',
  '}',
  '',
  'int topo(Pilha pilha) {',
  '    if (pilha.cont == 0) {',
  '        printf("[ERRO] A PILHA ESTAH VAZIA");',
  '        return -1;',
  '    } else {',
  '        return pilha.vetor[pilha.cont - 1];',
  '    }',
  '}',
]

const staticFullCodeLines = [
  '// bibliotecas',
  '#include <stdio.h>',
  '#include <stdlib.h>',
  '',
  '#define CAPACIDADE 10',
  '',
  '// struct',
  'struct Pilha {',
  '    int vetor[CAPACIDADE];',
  '    int cont;',
  '};',
  'typedef struct Pilha Pilha;',
  '',
  '// prototipação de funções',
  'void empilha(Pilha*, int valor);',
  'int desempilha(Pilha*);',
  'int busca(Pilha, int valor);',
  'int topo(Pilha);',
  'void imprime(Pilha);',
  '',
  '// função que empilha um valor na pilha',
  'void empilha(Pilha *pilha, int valor) {',
  '    if (pilha->cont == CAPACIDADE) {',
  '        printf("[ERRO] A PILHA ESTAH CHEIA");',
  '        return;',
  '    } else {',
  '        pilha->vetor[pilha->cont] = valor;',
  '        pilha->cont++;',
  '    }',
  '}',
  '',
  '// função que desempilha e retorna o valor desempilhado',
  'int desempilha(Pilha *pilha) {',
  '    int desempilhado;',
  '',
  '    if (pilha->cont == 0) {',
  '        printf("[ERRO] A PILHA ESTAH VAZIA");',
  '        return -1;',
  '    } else {',
  '        pilha->cont--;',
  '        desempilhado = pilha->vetor[pilha->cont];',
  '        return desempilhado;',
  '    }',
  '}',
  '',
  '// função que busca um valor na pilha e retorna a posição do valor encontrado',
  'int busca(Pilha pilha, int valor) {',
  '    int i;',
  '',
  '    if (pilha.cont == 0) {',
  '        printf("[ERRO] A PILHA ESTAH VAZIA");',
  '        return -1;',
  '    } else {',
  '        for (i = pilha.cont - 1; i >= 0; i--) {',
  '            if (pilha.vetor[i] == valor) {',
  '                return i;',
  '            }',
  '        }',
  '        return -1;',
  '    }',
  '}',
  '',
  '// função que retorna o valor do topo',
  'int topo(Pilha pilha) {',
  '    if (pilha.cont == 0) {',
  '        printf("[ERRO] A PILHA ESTAH VAZIA");',
  '        return -1;',
  '    } else {',
  '        return pilha.vetor[pilha.cont - 1];',
  '    }',
  '}',
  '',
  '// função que imprime os elementos da pilha',
  'void imprime(Pilha pilha) {',
  '    printf("Pilha:");',
  '',
  '    if (pilha.cont == 0) {',
  '        printf("[ERRO] A PILHA ESTAH VAZIA");',
  '        return;',
  '    } else {',
  '        for (int i = pilha.cont - 1; i >= 0; i--) {',
  '            printf(" [%d] ", pilha.vetor[i]);',
  '        }',
  '    }',
  '}',
  '',
  'int main() {',
  '    Pilha pilha;',
  '    pilha.cont = 0;',
  '',
  '    empilha(&pilha, 3);',
  '    empilha(&pilha, 9);',
  '    empilha(&pilha, 1);',
  '    empilha(&pilha, 7);',
  '    empilha(&pilha, 5);',
  '',
  '    imprime(pilha);',
  '    printf("\\n");',
  '    printf("Topo: %d\\n", topo(pilha));',
  '',
  '    printf("O valor desempilhado eh: %d\\n", desempilha(&pilha));',
  '    printf("O valor desempilhado eh: %d\\n", desempilha(&pilha));',
  '    printf("O valor desempilhado eh: %d\\n", desempilha(&pilha));',
  '    printf("O valor desempilhado eh: %d\\n", desempilha(&pilha));',
  '    printf("O valor desempilhado eh: %d\\n", desempilha(&pilha));',
  '',
  '    imprime(pilha);',
  '    printf("\\n");',
  '',
  '    return 0;',
  '}',
]

function makeStaticPushSteps(value: number, beforeValues: number[], callLine: number, desempilhado = 0): StackStep[] {
  const capacity = 10
  const index = beforeValues.length
  const topIndex = index > 0 ? Math.min(index - 1, capacity - 1) : 0
  const firstSteps: StackStep[] = [
    {
      command: `empilha(&pilha, ${value});`,
      values: beforeValues,
      count: index,
      capacity,
      value,
      desempilhado,
      topIndex,
      vectorReady: true,
      line: callLine,
      log: `main chama empilha com valor ${value}`,
    },
    {
      command: `void empilha(..., valor = ${value})`,
      values: beforeValues,
      count: index,
      capacity,
      value,
      desempilhado,
      topIndex,
      vectorReady: true,
      line: 13,
      log: `a função recebe valor = ${value}`,
    },
  ]

  if (index >= capacity) {
    return [
      ...firstSteps,
      {
        command: 'if (pilha->cont == CAPACIDADE)',
        values: beforeValues,
        count: capacity,
        capacity,
        value,
        desempilhado,
        topIndex,
        vectorReady: true,
        line: 14,
        log: `${capacity} == ${capacity}? sim; a pilha está cheia`,
      },
      {
        command: 'printf("[ERRO] A PILHA ESTAH CHEIA");',
        values: beforeValues,
        count: capacity,
        capacity,
        value,
        desempilhado,
        topIndex,
        vectorReady: true,
        line: 15,
        log: 'o programa avisa: [ERRO] A PILHA ESTAH CHEIA',
      },
      {
        command: 'return;',
        values: beforeValues,
        count: capacity,
        capacity,
        value,
        desempilhado,
        topIndex,
        vectorReady: true,
        line: 16,
        log: 'a função retorna sem inserir valor no vetor',
      },
    ]
  }

  const afterValues = [...beforeValues, value]

  return [
    ...firstSteps,
    {
      command: 'if (pilha->cont == CAPACIDADE)',
      values: beforeValues,
      count: index,
      capacity,
      value,
      desempilhado,
      topIndex,
      vectorReady: true,
      line: 14,
      log: `${index} == ${capacity}? não; a pilha ainda tem espaço`,
    },
    {
      command: 'pilha->vetor[pilha->cont] = valor;',
      values: beforeValues,
      memoryValues: afterValues,
      count: index,
      capacity,
      value,
      desempilhado,
      topIndex,
      vectorReady: true,
      line: 19,
      log: `${value} é colocado em vetor[${index}]`,
    },
    {
      command: 'pilha->cont++;',
      values: afterValues,
      count: index + 1,
      capacity,
      value,
      desempilhado,
      topIndex: index,
      vectorReady: true,
      line: 20,
      log: `cont passa de ${index} para ${index + 1}`,
    },
  ]
}

function makeStaticPopSteps(beforeValues: number[], currentDesempilhado = 0): StackStep[] {
  if (beforeValues.length === 0) {
    return [{
      command: 'desempilha(&pilha);',
      values: [],
      count: 0,
      capacity: 10,
      desempilhado: currentDesempilhado,
      topIndex: 0,
      vectorReady: true,
      line: 26,
      log: 'pilha vazia; não há elemento para desempilhar',
    }]
  }

  const nextValues = beforeValues.slice(0, -1)
  const removedValue = beforeValues[beforeValues.length - 1]
  const nextTopIndex = nextValues.length > 0 ? nextValues.length - 1 : 0

  return [
    {
      command: 'desempilha(&pilha);',
      values: beforeValues,
      count: beforeValues.length,
      capacity: 10,
      desempilhado: currentDesempilhado,
      topIndex: beforeValues.length - 1,
      vectorReady: true,
      line: 0,
      log: 'main chama desempilha para remover o topo',
    },
    {
      command: 'if (pilha->cont == 0)',
      values: beforeValues,
      count: beforeValues.length,
      capacity: 10,
      desempilhado: currentDesempilhado,
      topIndex: beforeValues.length - 1,
      vectorReady: true,
      line: 26,
      log: `${beforeValues.length} == 0? não; existe elemento no topo`,
    },
    {
      command: 'pilha->cont--;',
      values: nextValues,
      memoryValues: beforeValues,
      count: beforeValues.length - 1,
      capacity: 10,
      value: removedValue,
      desempilhado: currentDesempilhado,
      topIndex: nextTopIndex,
      vectorReady: true,
      line: 31,
      log: `cont decrementa de ${beforeValues.length} para ${beforeValues.length - 1}`,
    },
    {
      command: 'desempilhado = pilha->vetor[pilha->cont];',
      values: nextValues,
      memoryValues: beforeValues,
      count: nextValues.length,
      capacity: 10,
      value: removedValue,
      desempilhado: removedValue,
      topIndex: nextTopIndex,
      vectorReady: true,
      line: 32,
      log: `desempilhado recebe vetor[${nextValues.length}], que ainda guarda ${removedValue}`,
    },
    {
      command: 'return desempilhado;',
      values: nextValues,
      memoryValues: beforeValues,
      count: nextValues.length,
      capacity: 10,
      value: removedValue,
      desempilhado: removedValue,
      topIndex: nextTopIndex,
      vectorReady: true,
      line: 33,
      log: `return desempilhado; retorna ${removedValue}`,
    },
  ]
}

function makeStaticPeekSteps(values: number[], desempilhado = 0): StackStep[] {
  const topValue = values[values.length - 1] ?? 0
  const topIndex = values.length > 0 ? values.length - 1 : 0
  const baseStep = {
    values,
    count: values.length,
    capacity: 10,
    value: topValue,
    desempilhado,
    topIndex,
    vectorReady: true,
  }

  if (values.length === 0) {
    return [
      { ...baseStep, command: 'topo(pilha);', line: 36, log: 'main chama topo para consultar a pilha' },
      { ...baseStep, command: 'int topo(Pilha pilha)', line: 36, log: 'a função topo recebe uma cópia da pilha' },
      { ...baseStep, command: 'if (pilha.cont == 0)', line: 37, log: '0 == 0? sim; a pilha está vazia' },
      { ...baseStep, command: 'printf("[ERRO] A PILHA ESTAH VAZIA");', line: 38, log: 'o programa avisa: [ERRO] A PILHA ESTAH VAZIA' },
      { ...baseStep, command: 'return -1;', line: 39, log: 'return -1; indica que não existe topo' },
    ]
  }

  return [
    { ...baseStep, command: 'topo(pilha);', line: 36, log: 'main chama topo para consultar o último elemento' },
    { ...baseStep, command: 'int topo(Pilha pilha)', line: 36, log: 'a função topo recebe uma cópia da pilha' },
    { ...baseStep, command: 'if (pilha.cont == 0)', line: 37, log: `${values.length} == 0? não; existe elemento no topo` },
    { ...baseStep, command: 'else', line: 40, log: 'o fluxo entra no else para retornar o valor do topo' },
    { ...baseStep, command: 'return pilha.vetor[pilha.cont - 1];', line: 41, log: `return pilha.vetor[${values.length - 1}]; retorna ${topValue}` },
  ]
}

const staticSetupSteps: StackStep[] = [
  {
    command: '#include <stdio.h> / <stdlib.h>',
    values: [],
    count: 0,
    capacity: 0,
    vectorReady: false,
    line: [2, 3],
    log: 'Bibliotecas preparadas; variáveis atuais ainda estão zeradas',
  },
  {
    command: '#define CAPACIDADE 10',
    values: [],
    count: 0,
    capacity: 10,
    vectorReady: false,
    line: 5,
    log: 'CAPACIDADE recebe 10',
  },
  {
    command: 'struct Pilha { vetor, cont }',
    values: [],
    count: 0,
    capacity: 10,
    vectorReady: true,
    line: [8, 9],
    log: 'struct Pilha define vetor[CAPACIDADE] e a variável cont',
  },
  {
    command: 'Pilha pilha; pilha.cont = 0;',
    values: [],
    count: 0,
    capacity: 10,
    vectorReady: true,
    line: 0,
    log: 'pilha é criada na main; cont começa em 0',
  },
  {
    command: 'aguardando operação na main',
    values: [],
    count: 0,
    capacity: 10,
    topIndex: 0,
    vectorReady: true,
    line: 0,
    log: 'Aguardando operação: escolha Empilhar, Desempilhar ou Topo na Main',
  },
]

const staticSteps: StackStep[] = [
  ...staticSetupSteps,
]

const stackContent: StackContent = {
    id: 'pilha-estatica',
    title: 'Pilha Estática',
    description: 'Código derivado de pilhas/pilha_estatica.c, usando vetor e contador.',
    image: staticStackImage,
    sourceLabel: 'pilha_estatica.c',
    visualTitle: 'Visualização do vetor',
    memoryTitle: 'Memória (vetor[])',
    conceptTitle: 'Sobre Pilhas Estáticas',
    concept: 'Pense na pilha estática como uma pilha de pratos guardada dentro de um armário com espaço limitado. Você sempre coloca um prato por cima e também sempre tira o prato de cima.',
    conceptDetails: [
      'No código do repositório, esse armário é o vetor: int vetor[CAPACIDADE]. Como a capacidade é fixa, a pilha só aceita novos valores enquanto ainda existe espaço.',
      'A variável cont marca quantos elementos estão guardados. Quando cont vale 0, a pilha está vazia. Quando empilhamos, o valor entra em vetor[cont] e depois cont aumenta.',
      'O topo não precisa ser salvo em outra variável: ele fica em cont - 1. Por isso, depois de empilhar 3, 9, 1, 7 e 5, o topo está no índice 4 e o valor do topo é 5.',
      'Ao desempilhar, o código primeiro reduz cont e depois lê vetor[cont]. Assim o último valor inserido é o primeiro removido.',
    ],
    tip: 'Dica: na pilha estática do repositório, empilhar escreve em vetor[cont] e depois incrementa cont.',
    capacityLabel: 'Capacidade: 10',
    variables: [
      { label: 'valor', getValue: (step) => step.value ?? 0 },
      { label: 'cont', getValue: (step) => step.count },
      { label: 'topo', getValue: (step) => step.count > 0 ? step.values[step.count - 1] ?? 0 : 0 },
      { label: 'desempilhado', getValue: (step) => step.desempilhado ?? 0 },
      { label: 'CAPACIDADE', getValue: (step) => step.capacity },
    ],
    codeLines: staticCodeLines,
    fullCodeLines: staticFullCodeLines,
    steps: staticSteps,
}

const memoryAddresses = ['0x100', '0x104', '0x108', '0x10C', '0x110', '0x114', '0x118', '0x11C', '0x120', '0x124']
function StaticStack() {
  const content = stackContent
  const [stepIndex, setStepIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<StackTab>('simulation')
  const [operationSteps, setOperationSteps] = useState<StackStep[]>([])
  const [selectedOperation, setSelectedOperation] = useState<MainOperation>('push')
  const [inputValue, setInputValue] = useState('')
  const activeLogItemRef = useRef<HTMLLIElement | null>(null)
  const activeCodeLineRef = useRef<HTMLSpanElement | null>(null)
  const currentSteps = [...content.steps, ...operationSteps]
  const currentStep = currentSteps[Math.min(stepIndex, currentSteps.length - 1)]
  const staticCapacity = currentStep.capacity || 10
  const staticMemoryValues = currentStep.memoryValues ?? currentStep.values
  const staticSlots = Array.from({ length: staticCapacity }, (_, index) => staticMemoryValues[index])
  const lastVisibleMemoryIndex = staticSlots.reduce((lastIndex, value, index) => (value !== undefined ? index : lastIndex), -1)
  const visualTopIndex = currentStep.count > 0
    ? currentStep.count - 1
    : currentStep.values.length > 0
      ? currentStep.values.length - 1
      : lastVisibleMemoryIndex
  const sourceUrl = `${sourceBaseUrl}/${content.sourceLabel}`
  const activeLines = Array.isArray(currentStep.line) ? currentStep.line : [currentStep.line]
  const isEmpilhaStep = currentStep.command.includes('empilha') || activeLines.some((line) => line >= 13 && line <= 20)
  const isDesempilhaStep = currentStep.command.includes('desempilha') || activeLines.some((line) => line >= 23 && line <= 33)
  const isTopoStep = currentStep.command.includes('topo') || activeLines.some((line) => line >= 36 && line <= 42)
  const contextualTip = isEmpilhaStep
    ? 'Empilhar sempre adiciona um novo elemento no topo da pilha. Como a pilha segue o princípio FILO, esse será o primeiro elemento removido futuramente.'
    : isDesempilhaStep
      ? 'Desempilhar remove o elemento que está no topo. Nenhum outro elemento da pilha pode ser removido antes dele.'
      : isTopoStep
        ? 'A operação topo apenas consulta o último elemento inserido. A pilha permanece exatamente igual após a execução.'
        : null

  const canGoNext = stepIndex < currentSteps.length - 1
  const canExecuteOperation = selectedOperation !== 'push' || inputValue.trim() !== ''

  useEffect(() => {
    activeLogItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
    activeCodeLineRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [activeTab, stepIndex])

  const nextStep = () => {
    if (!canGoNext) return
    setStepIndex((index) => Math.min(index + 1, currentSteps.length - 1))
  }
  const previousStep = () => setStepIndex((index) => Math.max(index - 1, 0))
  const restart = () => {
    setOperationSteps([])
    setInputValue('')
    setStepIndex(0)
  }
  const executeOperation = () => {
    if (!canExecuteOperation) return

    const lastStep = currentSteps[currentSteps.length - 1]
    const currentValues = lastStep.values
    const currentDesempilhado = lastStep.desempilhado ?? 0
    let stepsToAdd: StackStep[]
    let actionLabel: string

    if (selectedOperation === 'push') {
      const parsedValue = Number(inputValue)
      if (!Number.isFinite(parsedValue)) return
      const value = parsedValue
      stepsToAdd = makeStaticPushSteps(value, currentValues, 0, currentDesempilhado)
      actionLabel = `Empilhar: ${value}`
      setInputValue('')
    } else if (selectedOperation === 'pop') {
      stepsToAdd = makeStaticPopSteps(currentValues, currentDesempilhado)
      actionLabel = 'Desempilhar'
    } else {
      stepsToAdd = makeStaticPeekSteps(currentValues, currentDesempilhado)
      actionLabel = 'Consultar topo'
    }

    setOperationSteps((steps) => [...steps, ...stepsToAdd])
    setStepIndex(currentSteps.length)
    recordSimulation('Pilha estática', actionLabel)
  }
  const isSimulation = activeTab === 'simulation'
  const tabs: Array<{ id: StackTab; label: string; Icon: typeof Play }> = [
    { id: 'simulation', label: 'Simulação', Icon: Play },
    { id: 'code', label: 'Código C', Icon: Code2 },
    { id: 'concept', label: 'Conceito', Icon: Sparkles },
    { id: 'memory', label: 'Memória', Icon: Box },
    { id: 'complexity', label: 'Complexidade', Icon: BarChart3 },
  ]

  const renderCodeBlock = (lines: string[], activeLine?: number | number[]) => {
    const activeLines = Array.isArray(activeLine) ? activeLine : activeLine ? [activeLine] : []

    return (
      <pre className="code-block">
        {lines.map((line, index) => {
          const isActive = activeLines.includes(index + 1)

          return (
            <span
              className={isActive ? 'active-line' : ''}
              key={`${line}-${index}`}
              ref={isActive && activeLines[0] === index + 1 ? activeCodeLineRef : undefined}
            >
              <i>{index + 1}</i>
              <code>{line || ' '}</code>
            </span>
          )
        })}
      </pre>
    )
  }

  const renderVisualizer = () => (
    currentStep.vectorReady ? (
      <div className="stack-visual">
        <div className="stack-indexes">
          {[...staticSlots].map((_, index) => staticSlots.length - 1 - index).map((index) => <span key={index}>{index}</span>)}
        </div>
        <div className="stack-column">
          {[...staticSlots].reverse().map((value, reverseIndex) => {
            const index = staticSlots.length - 1 - reverseIndex
            const isFilled = value !== undefined
            const isStale = isFilled && index >= currentStep.count

            return (
              <div className={`stack-cell ${isFilled ? 'filled' : 'empty'} ${isStale ? 'stale' : ''} ${index === visualTopIndex ? 'top' : ''}`} key={index}>
                {value ?? '-'}
              </div>
            )
          })}
        </div>
        {visualTopIndex >= 0 ? (
          <div className="top-pointer" style={{ gridRow: staticSlots.length - visualTopIndex }}>
            <span>TOPO</span>
            <small>(índice {visualTopIndex})</small>
          </div>
        ) : (
          <div className="top-pointer empty" style={{ gridRow: '1 / -1' }}>
            <span>PILHA VAZIA</span>
          </div>
        )}
      </div>
    ) : (
      <div className="stack-empty-state">
        <strong>Vetor ainda não criado</strong>
        <span>Acompanhe o código até a struct Pilha definir vetor[CAPACIDADE].</span>
      </div>
    )
  )

  const renderVariables = () => (
    <div className="visual-variables">
      <h3>Variáveis atuais</h3>
      <dl>
        {content.variables.map((variable) => (
          <div key={variable.label}>
            <dt>{variable.label}</dt>
            <dd>{variable.getValue(currentStep)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )

  const renderStaticMemoryPage = () => {
    const topIndex = currentStep.count > 0 ? currentStep.count - 1 : -1
    const validCount = Math.max(currentStep.count, 0)
    const totalBytes = staticCapacity * 4
    const finalAddress = memoryAddresses[staticCapacity - 1] ?? memoryAddresses[0]

    return (
      <section className="stack-tab-panel static-memory-layout">
        <article className="panel static-memory-main">
          <h2>Memória da Pilha Estática</h2>

          <div className="memory-stat-grid">
            <div className="memory-stat-card tone-purple">
              <ArrowUp aria-hidden="true" strokeWidth={1.9} />
              <strong>Índice do topo = {topIndex}</strong>
              <span>Índice do último elemento</span>
            </div>
            <div className="memory-stat-card tone-green">
              <Code2 aria-hidden="true" strokeWidth={1.9} />
              <strong>cont = {validCount}</strong>
              <span>Quantidade de elementos válidos</span>
            </div>
            <div className="memory-stat-card tone-blue">
              <Box aria-hidden="true" strokeWidth={1.9} />
              <strong>capacidade = {staticCapacity}</strong>
              <span>Tamanho máximo do vetor</span>
            </div>
          </div>

          <div className="memory-vector-board">
            {topIndex >= 0 && (
              <div className="memory-top-marker" style={{ gridColumn: topIndex + 2 }}>
                <span>índice do topo</span>
              </div>
            )}
            <span className="memory-row-label" style={{ gridColumn: 1, gridRow: 2 }}>Índice</span>
            {staticSlots.map((_, index) => <b style={{ gridColumn: index + 2, gridRow: 2 }} key={`mi-${index}`}>{index}</b>)}
            <span className="memory-row-label" style={{ gridColumn: 1, gridRow: 3 }}>Valor</span>
            {staticSlots.map((value, index) => {
              const isValid = index < currentStep.count
              const isStale = value !== undefined && !isValid
              const isTop = index === topIndex

              return (
                <strong
                  className={`${isValid ? 'filled' : ''} ${isStale ? 'stale' : ''} ${isTop ? 'top' : ''}`}
                  style={{ gridColumn: index + 2, gridRow: 3 }}
                  key={`mv-${index}`}
                >
                  {value ?? '-'}
                </strong>
              )
            })}
            <span className="memory-row-label" style={{ gridColumn: 1, gridRow: 4 }}>Endereço</span>
            {memoryAddresses.map((address, index) => (
              <small style={{ gridColumn: index + 2, gridRow: 4 }} key={`ma-${address}`}>{address}</small>
            ))}
            <div className="memory-valid-range" style={{ gridColumn: `2 / span ${Math.max(validCount, 1)}`, gridRow: 5 }}>
              <span>{validCount > 0 ? 'Elementos armazenados' : 'Nenhum elemento armazenado'}</span>
            </div>
            <div className="memory-empty-range" style={{ gridColumn: `${validCount + 2} / span ${Math.max(staticCapacity - validCount, 1)}`, gridRow: 5 }}>
              <span>Espaços vazios</span>
            </div>
          </div>
        </article>

        <aside className="panel memory-interpret-card">
          <h2>Como interpretar</h2>
          <p>A pilha estática é implementada usando um vetor de tamanho fixo.</p>
          {[
            ['Os elementos são inseridos a partir do índice 0.', Box],
            ['O índice do topo aponta para a posição do último elemento válido.', ArrowUp],
            ['Posições vazias ainda existem na memória, mas não contêm valores válidos.', List],
            ['Cada posição do vetor do tipo int ocupa 4 bytes de memória.', Code2],
          ].map(([text, Icon]) => {
            const TypedIcon = Icon as typeof Box
            return (
              <div className="memory-help-item" key={text as string}>
                <TypedIcon aria-hidden="true" strokeWidth={1.8} />
                <span>{text as string}</span>
              </div>
            )
          })}
        </aside>

        <article className="panel memory-stack-card">
          <h2>Visualização da pilha</h2>
          <div className="memory-stack-preview">
            {staticSlots.map((value, index) => ({ value, index })).filter((item) => item.value !== undefined).reverse().map(({ value, index }) => {
              const isValid = index < currentStep.count
              const isTop = index === topIndex
              return (
                <div className={`memory-stack-row ${isValid ? 'filled' : 'stale'} ${isTop ? 'top' : ''}`} key={`ms-${index}`}>
                  <span>{index}</span>
                  <strong>{value}</strong>
                  {isTop && <small>índice do topo</small>}
                </div>
              )
            })}
            {staticSlots.every((value) => value === undefined) && <p>A pilha ainda não possui elementos.</p>}
          </div>
        </article>

        <article className="panel memory-info-card">
          <h2>Informações da memória</h2>
          <dl>
            <div><dt>Tipo do vetor</dt><dd>int</dd></div>
            <div><dt>Tamanho de cada elemento</dt><dd>4 bytes</dd></div>
            <div><dt>Tamanho total do vetor</dt><dd>{staticCapacity} x 4 = {totalBytes} bytes</dd></div>
            <div><dt>Endereço inicial</dt><dd>{memoryAddresses[0]}</dd></div>
            <div><dt>Endereço final</dt><dd>{finalAddress}</dd></div>
          </dl>
        </article>

        <article className="panel memory-legend-card">
          <h2>Legenda</h2>
          <div><span className="legend-box filled" />Elemento armazenado</div>
          <div><span className="legend-box empty" />Espaço vazio</div>
          <div><span className="legend-box stale" />Valor antigo fora da pilha</div>
          <div><span className="legend-box top" />Índice do topo atual</div>
          <div><span className="legend-chip">0...</span>Índice do vetor</div>
          <div><span className="legend-chip">0x...</span>Endereço de memória</div>
        </article>

        <p className="memory-bottom-tip">
          <Lightbulb aria-hidden="true" strokeWidth={2} />
          Dica: na pilha estática, `cont` define até onde os valores são considerados válidos.
        </p>
      </section>
    )
  }

  const renderStaticConcept = () => (
    <section className="stack-tab-panel concept-study-grid">
      <article className="panel concept-study-card concept-intro-card">
        <h2>O que é uma Pilha Estática?</h2>
        <p>
          Uma pilha estática é uma estrutura de dados linear que segue o princípio
          <strong> FILO</strong>: o último elemento a entrar é o primeiro a sair.
          No código, ela é guardada em um vetor de tamanho fixo e controlada por
          uma variável contadora.
        </p>
        <p>
          Na implementação deste projeto, `vetor[CAPACIDADE]` reserva os espaços
          da pilha e `cont` indica quantos elementos estão válidos. O topo fica em
          `cont - 1`, quando a pilha não está vazia.
        </p>
        <div className="concept-pillars">
          {[
            ['Linear', 'Elementos organizados em sequência.', 'purple'],
            ['FILO', 'First In, Last Out: último a entrar, primeiro a sair.', 'green'],
            ['Tamanho fixo', 'A capacidade é definida antes da execução.', 'blue'],
          ].map(([title, text, tone]) => (
            <div className={`concept-mini-card tone-${tone}`} key={title}>
              <Box aria-hidden="true" strokeWidth={1.8} />
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="panel concept-study-card concept-flow-card">
        <h2>Como funciona?</h2>
        <p>Elementos são inseridos e removidos apenas pelo topo da pilha.</p>
        <div className="concept-flow">
          {[
            { title: '1. Pilha vazia', values: ['-', '-', '-', '-'], footer: 'cont = 0' },
            { title: '2. Empilhando elementos', values: ['-', '30', '20', '10'], footer: 'cont = 3' },
            { title: '3. Desempilhando o topo', values: ['-', '-', '20', '10'], footer: 'cont = 2' },
          ].map((stage, stageIndex) => (
            <div className="concept-stage" key={stage.title}>
              <strong>{stage.title}</strong>
              <div className="concept-stack-demo">
                {stage.values.map((value, index) => (
                  <span className={value === '-' ? 'empty' : 'filled'} key={`${stage.title}-${index}`}>{value}</span>
                ))}
              </div>
              <small>{stage.footer}</small>
              {stageIndex < 2 && <ChevronRight aria-hidden="true" strokeWidth={1.8} />}
            </div>
          ))}
        </div>
        <p className="concept-note">Operações principais: <b>empilha</b> insere, <b>desempilha</b> remove e <b>topo</b> consulta o último elemento.</p>
      </article>

      <article className="panel concept-study-card operations-card">
        <h2>Operações</h2>
          {[
          ['empilha(x)', 'Insere o elemento x no topo da pilha.', 'O(1)', 'green'],
          ['desempilha()', 'Remove e retorna o elemento do topo.', 'O(1)', 'red'],
          ['topo()', 'Retorna o topo sem removê-lo.', 'O(1)', 'blue'],
          ['estaVazio()', 'Verifica se a pilha está vazia.', 'O(1)', 'purple'],
          ['estaCheio()', 'Verifica se a pilha está cheia.', 'O(1)', 'orange'],
        ].map(([name, description, cost, tone]) => (
          <div className={`operation-row tone-${tone}`} key={name}>
            <code>{name}</code>
            <span>{description}</span>
            <b>{cost}</b>
          </div>
        ))}
      </article>

      <article className="panel concept-study-card example-card">
        <h2>Exemplo Prático</h2>
        <p>Considere uma pilha de capacidade 5, inicialmente vazia.</p>
        <table>
          <thead>
            <tr>
              <th>Operação</th>
              <th>Elemento</th>
              <th>Estado da pilha</th>
              <th>Índice do topo</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['empilha(10)', '10', ['10', '-', '-', '-', '-'], '0'],
              ['empilha(20)', '20', ['10', '20', '-', '-', '-'], '1'],
              ['empilha(30)', '30', ['10', '20', '30', '-', '-'], '2'],
              ['desempilha()', '30 removido', ['10', '20', '-', '-', '-'], '1'],
            ].map(([operation, element, state, top]) => (
              <tr key={operation as string}>
                <td>{operation}</td>
                <td>{element}</td>
                <td>
                  <div className="concept-vector-row">
                    {(state as string[]).map((value, index) => <span key={`${operation}-${index}`}>{value}</span>)}
                  </div>
                </td>
                <td>{top}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <article className="panel concept-study-card usage-card">
        <h2>Quando usar?</h2>
        {[
          ['Chamadas de funções', 'Gerenciamento de chamadas e retornos.'],
          ['Desfazer ações', 'Editores e navegadores usam pilhas para voltar estados.'],
          ['Avaliação de expressões', 'Conversão e avaliação de expressões matemáticas.'],
          ['Balanceamento', 'Verificação de parênteses, colchetes e chaves.'],
        ].map(([title, text]) => (
          <div className="concept-list-item" key={title}>
            <Code2 aria-hidden="true" strokeWidth={1.8} />
            <span><strong>{title}</strong>{text}</span>
          </div>
        ))}
      </article>

      <article className="panel concept-study-card pros-cons-card">
        <h2>Vantagens</h2>
        {['Implementação simples e eficiente.', 'Acesso rápido ao topo.', 'Uso previsível de memória.', 'Boa quando a capacidade máxima é conhecida.'].map((item) => (
          <span className="positive" key={item}><CheckCircle2 aria-hidden="true" strokeWidth={2} />{item}</span>
        ))}
        <h2>Desvantagens</h2>
        {['Tamanho fixo pode limitar a quantidade de elementos.', 'Pode ocorrer overflow quando a pilha está cheia.'].map((item) => (
          <span className="negative" key={item}><List aria-hidden="true" strokeWidth={2} />{item}</span>
        ))}
      </article>

      <article className="panel concept-study-card real-world-card">
        <h2>Exemplos do Mundo Real</h2>
            {[
              ['Navegadores', 'Histórico de voltar e avançar páginas.', 'blue'],
              ['Editores de texto', 'Desfazer e refazer alterações.', 'slate'],
              ['Compiladores', 'Análise de expressões e símbolos.', 'purple'],
              ['Calculadoras', 'Avaliação de expressões matemáticas.', 'violet'],
            ].map(([title, text, tone]) => (
          <div className={`concept-list-item tone-${tone}`} key={title}>
            <Sparkles aria-hidden="true" strokeWidth={1.8} />
            <span><strong>{title}</strong>{text}</span>
          </div>
        ))}
      </article>

      <p className="concept-summary">
        A pilha estática é ótima quando você quer simplicidade, desempenho O(1)
        nas operações principais e sabe que a quantidade de elementos não passará
        da capacidade definida.
      </p>
    </section>
  )

  const renderStaticComplexityPage = () => (
    <section className="stack-tab-panel static-complexity-layout">
      <article className="panel complexity-table-card">
        <h2>Complexidade das Operações</h2>
        <p>Análise de tempo e espaço para as operações da Pilha Estática.</p>
        <div className="complexity-table">
          <div className="complexity-table-head">Operação</div>
          <div className="complexity-table-head">Descrição</div>
          <div className="complexity-table-head time-group">Complexidade de Tempo</div>
          <div className="complexity-table-head">Complexidade de Espaço</div>
          <div className="complexity-subhead empty" />
          <div className="complexity-subhead empty" />
          <div className="complexity-subhead">Melhor Caso</div>
          <div className="complexity-subhead">Caso Médio</div>
          <div className="complexity-subhead">Pior Caso</div>
          <div className="complexity-subhead empty" />
          {[
            ['empilha', 'Insere um elemento no topo da pilha.', 'green', ArrowUp],
            ['desempilha', 'Remove o elemento do topo da pilha.', 'red', ArrowDown],
            ['topo', 'Consulta o elemento do topo da pilha.', 'blue', Eye],
          ].map(([operation, description, tone, Icon]) => {
            const TypedIcon = Icon as typeof ArrowUp
            return (
              <div className="complexity-row" key={operation as string}>
                <div className={`complexity-operation tone-${tone}`}>
                  <TypedIcon aria-hidden="true" strokeWidth={2} />
                  <strong>{operation as string}</strong>
                </div>
                <span>{description as string}</span>
                <b>O(1)</b>
                <b>O(1)</b>
                <b>O(1)</b>
                <b className="space-cost">O(1)</b>
              </div>
            )
          })}
        </div>
      </article>

      <aside className="panel complexity-space-card">
        <h2>Complexidade de Espaço</h2>
        <p>Pilha estática utiliza um vetor de tamanho fixo para armazenar os elementos.</p>
        <strong>O(n)</strong>
        <small>onde n é a capacidade da pilha.</small>
        <div><Box aria-hidden="true" strokeWidth={1.9} />A memória é alocada uma única vez na criação da pilha.</div>
        <div><List aria-hidden="true" strokeWidth={1.9} />A quantidade de memória não varia durante as operações.</div>
      </aside>

      <article className="panel complexity-chart-card">
        <h2>Crescimento da Complexidade de Tempo</h2>
        <div className="constant-chart">
          <div className="chart-axis y">
            <span>1</span><span>0.75</span><span>0.5</span><span>0.25</span><span>0</span>
          </div>
          <div className="chart-area">
            <span className="chart-line" />
            {['1', '10', '100', '1k', '10k', '100k'].map((label, index) => (
              <i style={{ left: `${index * 20}%` }} key={label}>
                <b />
                <small>{label}</small>
              </i>
            ))}
          </div>
          <div className="chart-note">
            <strong>Todas as operações têm complexidade constante: O(1)</strong>
            <span>O tempo de execução não aumenta conforme o tamanho da pilha cresce.</span>
            <em>Excelente!</em>
          </div>
        </div>
        <div className="chart-legend">
          <span className="tone-green">empilha</span>
          <span className="tone-red">desempilha</span>
          <span className="tone-blue">topo</span>
        </div>
      </article>

      <article className="panel complexity-meaning-card">
        <h2>O que isso significa?</h2>
        {[
          ['Operações muito rápidas', 'Como todas as operações são O(1), o tempo de execução é praticamente o mesmo, independentemente do tamanho da pilha.', 'green', Lightbulb],
          ['Previsibilidade', 'O desempenho da pilha estática é previsível e consistente.', 'orange', BarChart3],
          ['Limitação de capacidade', 'Por ser estática, a capacidade é fixa. Ao atingir o limite, novos elementos não podem ser inseridos.', 'purple', Box],
        ].map(([title, text, tone, Icon]) => {
          const TypedIcon = Icon as typeof Lightbulb
          return (
            <div className={`meaning-item tone-${tone}`} key={title as string}>
              <TypedIcon aria-hidden="true" strokeWidth={1.9} />
              <span><strong>{title as string}</strong>{text as string}</span>
            </div>
          )
        })}
      </article>

      <article className="panel complexity-summary-card">
        <h2>Resumo</h2>
        <p>A pilha estática é extremamente eficiente para suas operações principais, oferecendo tempo constante O(1) para empilhar, desempilhar e acessar o topo.</p>
      </article>
    </section>
  )

  return (
    <div className="app-shell stack-shell">
      <Navbar />

      <main className="stack-page" id={content.id}>
        <header className="stack-header">
          <div className="breadcrumb">
            <a href="#inicio">
              <ArrowLeft aria-hidden="true" strokeWidth={1.9} />
              Voltar
            </a>
            <ChevronRight aria-hidden="true" strokeWidth={1.6} />
            <span>Estruturas Lineares</span>
            <ChevronRight aria-hidden="true" strokeWidth={1.6} />
            <strong>{content.title}</strong>
          </div>

          <div className="stack-header-row">
            <img className="stack-title-image" src={content.image} alt="" aria-hidden="true" />
            <div>
              <h1>{content.title}</h1>
              <p>{content.description}</p>
            </div>
          </div>

          <div className="stack-header-actions">
            <a className="mode-button" href={sourceUrl} target="_blank" rel="noreferrer">
              <GitBranch aria-hidden="true" strokeWidth={1.8} />
              {content.sourceLabel}
              <ChevronDown aria-hidden="true" strokeWidth={1.8} />
            </a>
            <button className="stack-icon-button" aria-label="Alternar tema">
              <Moon aria-hidden="true" strokeWidth={2} />
            </button>
          </div>
        </header>

        <nav className="stack-tabs" aria-label={`Secoes da ${content.title.toLowerCase()}`}>
          {tabs.map(({ id, label, Icon }) => (
            <button className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)} key={id}>
              <Icon aria-hidden="true" strokeWidth={1.9} />
              {label}
            </button>
          ))}
        </nav>

        {isSimulation && (
          <>
            <section className="stack-layout simulation-layout">
              <article className="panel code-panel simulation-code-panel">
                <div className="panel-title">
                  <Code2 aria-hidden="true" strokeWidth={1.9} />
                  <h2>Código usado na simulação</h2>
                  <button><Copy aria-hidden="true" strokeWidth={1.7} />Copiar código</button>
                </div>
                {renderCodeBlock(content.codeLines, currentStep.line)}
                <div className="compile-status">
                  <CheckCircle2 aria-hidden="true" strokeWidth={2} />
                  Trecho executado passo a passo
                </div>
              </article>

              <section className="simulation-center">
                <article className="panel visual-panel">
                  <div className="panel-title">
                    <Box aria-hidden="true" strokeWidth={1.9} />
                    <h2>{content.visualTitle}</h2>
                  </div>
                  <div className="visual-content">
                    {renderVisualizer()}
                  </div>
                </article>

                <article className="panel variables-overview-panel">
                  <div className="panel-title">
                    <Code2 aria-hidden="true" strokeWidth={1.9} />
                    <h2>Variáveis atuais</h2>
                  </div>
                  {renderVariables()}
                </article>
              </section>

              <aside className="simulation-side">
                <article className="panel main-control-panel">
                  <h2>Main <span>(controle da pilha)</span></h2>
                  <p>Escolha a operação e informe o valor quando for empilhar.</p>
                  <div className="operation-grid" aria-label="Operações da main">
                    <button className={selectedOperation === 'push' ? 'active' : ''} onClick={() => setSelectedOperation('push')}>
                      <ArrowUp aria-hidden="true" strokeWidth={2.1} />
                      Empilhar
                      <small>push</small>
                    </button>
                    <button className={selectedOperation === 'pop' ? 'active' : ''} onClick={() => setSelectedOperation('pop')}>
                      <ArrowDown aria-hidden="true" strokeWidth={2.1} />
                      Desempilhar
                      <small>pop</small>
                    </button>
                    <button className={selectedOperation === 'peek' ? 'active' : ''} onClick={() => setSelectedOperation('peek')}>
                      <Eye aria-hidden="true" strokeWidth={2.1} />
                      Topo
                      <small>peek</small>
                    </button>
                  </div>
                  <label className="main-value-field">
                    <span>Valor</span>
                    <input
                      type="number"
                      placeholder="Digite o valor inteiro"
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      disabled={selectedOperation !== 'push'}
                    />
                  </label>
                  <button className="main-run-button" onClick={executeOperation} disabled={!canExecuteOperation}>
                    <Play aria-hidden="true" strokeWidth={2} />
                    Executar operação
                  </button>
                </article>

                <article className="panel log-panel">
                  <div className="panel-title">
                    <List aria-hidden="true" strokeWidth={1.9} />
                    <h2>Log de execução</h2>
                  </div>
                  <ul>
                    <li>Iniciando execução...</li>
                    {currentSteps.slice(0, stepIndex + 1).map((step, index) => (
                      <li
                        className={index === stepIndex ? 'active' : ''}
                        key={step.log}
                        ref={index === stepIndex ? activeLogItemRef : undefined}
                      >
                        {step.log}
                      </li>
                    ))}
                  </ul>
                  <div className="progress-row">
                    <span>Passo {stepIndex + 1} de {currentSteps.length}</span>
                    <progress value={stepIndex + 1} max={currentSteps.length} />
                  </div>
                </article>
              </aside>
            </section>

            <section className="stack-controls" aria-label="Controles da simulação">
              <div className="control-buttons">
                <button onClick={previousStep}><StepBack aria-hidden="true" strokeWidth={2} />Passo anterior</button>
                <button onClick={nextStep} disabled={!canGoNext}><Play aria-hidden="true" strokeWidth={2} />Próximo passo</button>
                <button onClick={restart}><RotateCcw aria-hidden="true" strokeWidth={2} />Reiniciar</button>
              </div>
              {contextualTip && (
                <p className="tip-bar">
                  <Lightbulb aria-hidden="true" strokeWidth={2} />
                  {contextualTip}
                </p>
              )}
            </section>
          </>
        )}

        {activeTab === 'code' && (
          <section className="stack-tab-panel">
            <article className="panel full-code-panel">
              <div className="panel-title">
                <Code2 aria-hidden="true" strokeWidth={1.9} />
                <h2>Código C completo</h2>
                <a href={sourceUrl} target="_blank" rel="noreferrer">
                  <GitBranch aria-hidden="true" strokeWidth={1.7} />
                  Código original
                </a>
              </div>
              {renderCodeBlock(content.fullCodeLines)}
            </article>
          </section>
        )}

        {activeTab === 'concept' && renderStaticConcept()}

        {activeTab === 'memory' && renderStaticMemoryPage()}

        {activeTab === 'complexity' && renderStaticComplexityPage()}

      </main>
    </div>
  )
}

export default StaticStack

