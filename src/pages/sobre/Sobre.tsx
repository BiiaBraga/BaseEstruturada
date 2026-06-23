import {
  BarChart3,
  Box,
  Code2,
  Eye,
  Heart,
  MousePointerClick,
  Rocket,
  Target,
} from 'lucide-react'
import Navbar from '../../components/navbar/Navbar'
import beatrizImage from '../../assets/BeatrizBraga.png'
import alvoIcon from '../../assets/icons/icon_alvo.png'
import githubIcon from '../../assets/icons/icon_github.png'
import linkIcon from '../../assets/icons/icon_link.png'
import linkedinIcon from '../../assets/icons/icon_linkedin.png'

const featureItems = [
  {
    title: 'Estruturas de Dados',
    description: 'Explore estruturas lineares e não lineares com visualizações passo a passo.',
    Icon: Box,
    tone: 'violet',
  },
  {
    title: 'Execução Interativa',
    description: 'Acompanhe cada operação em tempo real com animações e explicações detalhadas.',
    Icon: Code2,
    tone: 'cyan',
  },
  {
    title: 'Algoritmos de Ordenação',
    description: 'Visualize o funcionamento dos principais algoritmos e compare desempenhos.',
    Icon: BarChart3,
    tone: 'blue',
  },
  {
    title: 'Testes de Performance',
    description: 'Compare complexidade de tempo e espaço com gráficos simples e claros.',
    Icon: Target,
    tone: 'yellow',
  },
]

const valueItems = [
  {
    title: 'Visual',
    description: 'Aprenda vendo o que acontece em cada passo.',
    Icon: Eye,
    tone: 'violet',
  },
  {
    title: 'Interativo',
    description: 'Participe ativamente do processo de aprendizado.',
    Icon: MousePointerClick,
    tone: 'cyan',
  },
  {
    title: 'Prático',
    description: 'Consolide seu conhecimento com exemplos reais.',
    Icon: Rocket,
    tone: 'yellow',
  },
  {
    title: 'Feito com paixão',
    description: 'Criado por quem ama ensinar e compartilhar.',
    Icon: Heart,
    tone: 'pink',
  },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/beatriz-braga-silva/',
    icon: linkedinIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/BiiaBraga',
    icon: githubIcon,
  },
  {
    label: 'Portfólio',
    href: 'https://biiabraga.github.io/Portfolio/',
    icon: linkIcon,
  },
]

function Sobre() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="home about-page" id="sobre">
        <section className="about-hero">
          <h1>
            Sobre a <span>Base Estruturada</span>
          </h1>
          <p>
            Uma plataforma criada para tornar o aprendizado de estruturas de dados e algoritmos mais{' '}
            <strong>visual</strong>, <strong>interativo</strong> e <strong>eficiente</strong>.
          </p>
        </section>

        <section className="about-panel mission-panel">
          <div className="mission-icon" aria-hidden="true">
            <img src={alvoIcon} alt="" />
          </div>
          <div>
            <h2>Nossa Missão</h2>
            <p>
              Democratizar o conhecimento em programação através de visualizações intuitivas e interatividade,
              permitindo que desenvolvedores de todos os níveis aprendam de forma prática e envolvente.
            </p>
          </div>
        </section>

        <section className="about-panel">
          <h2>O que você encontra aqui</h2>
          <div className="about-feature-grid">
            {featureItems.map(({ title, description, Icon, tone }) => (
              <article className={`about-feature ${tone}`} key={title}>
                <Icon aria-hidden="true" strokeWidth={1.9} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-panel">
          <h2>Por que criamos a Base Estruturada?</h2>
          <p className="about-text">
            Acreditamos que aprender programação vai muito além de decorar códigos. É sobre entender a lógica,
            visualizar processos e praticar constantemente. Por isso, criamos esta plataforma para ser uma ponte entre
            teoria e prática.
          </p>

          <div className="about-values-grid">
            {valueItems.map(({ title, description, Icon, tone }) => (
              <article className={`about-value ${tone}`} key={title}>
                <Icon aria-hidden="true" strokeWidth={1.9} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-panel developer-section">
          <h2>Quem desenvolveu</h2>
          <article className="developer-card">
            <div className="developer-photo">
              <img src={beatrizImage} alt="Beatriz Braga" />
            </div>
            <div className="developer-copy">
              <h3>Beatriz Braga</h3>
              <p className="developer-role">Desenvolvedora FullStack</p>
              <p>
                Apaixonada por tecnologia, educação e resolver problemas com código. A Base Estruturada nasceu da minha
                experiência estudando e auxiliando alunos em Estruturas de Dados. Como aprendi a programar através
                dessas estruturas, quis criar uma plataforma que tornasse esse aprendizado mais visual, intuitivo e
                acessível, conectando teoria, código e execução em um único lugar.
              </p>
              <div className="social-row">
                {socialLinks.map(({ label, href, icon }) => (
                  <a href={href} target="_blank" rel="noreferrer" aria-label={label} key={label}>
                    <img src={icon} alt="" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </article>
          <p className="thanks-message">Obrigado por fazer parte dessa jornada!</p>
        </section>
      </main>
    </div>
  )
}

export default Sobre
