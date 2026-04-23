import { FlexCenter, FlexCol, FlexRow } from '@/components/utils/flex';
import Project from '@/components/items/project';
import { SlideUp } from '@/components/utils/animations';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCalendar,
  faDownload,
  faEnvelope,
  faLocationDot,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { TextAnchor, TextButton } from '@/components/utils/buttons';

type Project = {
  images: string[];
  title: string;
  description: string;
  technologies: string[];
  downloadUrl: string;
  tags?: string[];
  videos?: boolean;
  featured?: boolean;
  wip?: boolean;
};

export default function Home() {
  const techInterests = [
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'TypeScript',
    'Fastify',
    'Kysely',
    'Vercel',
    'Railway',
    'Web Design',
    'Tailwind CSS',
    'Automação',
    'Full-Stack',
    'Desempenho Web',
    'Segurança Web',
    'Desenvolvimento de Jogos',
    'Unity',
    'C#',
    'Arte Digital',
    'Aseprite',
    'Edição de Vídeo',
  ];

  const softSkills = [
    'Resolução de Problemas',
    'Trabalho em Equipa',
    'Comunicação',
    'Gestão do Tempo',
    'Adaptabilidade',
    'Pensamento Crítico',
    'Rápida Aprendizagem',
  ];

  const hobbies = ['Guitarra', 'Jogos', 'Programação', 'Animais', 'Desporto'];

  const projects: Project[] = [
    {
      tags: ['Em Desenvolvimento', 'Projeto Pessoal'],
      featured: true,
      wip: true,
      images: ['/projects/saas1.jpg', '/projects/saas2.jpg', '/projects/saas3.jpg'],
      title: 'Plataforma de Gestão de Manutenção',
      description:
        'Plataforma B2B desenvolvida de raiz para empresa de manutenção gerir os seus colaboradores, produtos e ferramentas numa única solução. Inclui painéis de controlo, gestão de inventário e ferramentas, validação de documentação e acompanhamento de equipas e colaboradores.',
      technologies: ['Next.js', 'Fastify', 'PostgreSQL', 'TypeScript', 'Vercel', 'Railway'],
      downloadUrl: '#',
    },
    {
      tags: ['Estágio', 'Projeto em Equipa'],
      videos: true,
      images: [
        '/projects/beach-rolling.mp4',
        '/projects/spooky-hunt.mp4',
        '/projects/brawl-fighters.mp4',
        '/projects/wave-racer.mp4',
        '/projects/feng-shui.mp4',
        '/projects/flames-out.mp4',
      ],
      title: 'Jogos Mobile — Estágio',
      description:
        'Estes jogos mobile foram desenvolvidos como protótipos de demonstração para fins publicitários, com o objetivo de avaliar o seu potencial antes de decidir quais os conceitos a avançar para desenvolvimento completo. Por isso, apenas os anúncios estão disponíveis.',
      technologies: ['Unity', 'C#'],
      downloadUrl: 'https://rafael-cavalinhos.itch.io/estgio-bee-engeneering',
    },
    {
      tags: ['Projeto Escolar'],
      images: ['/projects/press-em1.png', '/projects/press-em2.png', '/projects/press-em3.png'],
      title: "Press 'em",
      description:
        "Em Press 'em tens de derrotar robôs e resolver puzzles agarrando caixas e premindo botões para completar os níveis!",
      technologies: ['Unity', 'C#', 'Aseprite'],
      downloadUrl: 'https://rafael-cavalinhos.itch.io/press-em',
    },
    {
      tags: ['Projeto Escolar'],
      images: ['/projects/castaway1.png', '/projects/castaway2.png', '/projects/castaway3.png'],
      title: 'Castaway',
      description:
        'Castaway é um jogo onde tentas sobreviver dias e noites numa ilha enquanto combates inimigos e recolhes recursos para reparar o teu barco naufragado e escapar.',
      technologies: ['Unity', 'C#', 'Aseprite'],
      downloadUrl: 'https://rafael-cavalinhos.itch.io/castaway',
    },
    {
      tags: ['Projeto Escolar', 'Game Jam'],
      images: [
        '/projects/factory-dealings1.png',
        '/projects/factory-dealings2.png',
        '/projects/factory-dealings3.png',
      ],
      title: 'Factory Dealings',
      description:
        'Factory Dealings é um jogo arcade onde tens de entregar itens a robôs feridos, e depressa, senão explodem e morrem de forma cruel.',
      technologies: ['Unity', 'C#', 'Aseprite'],
      downloadUrl: 'https://rafael-cavalinhos.itch.io/factory-dealings',
    },
    {
      tags: ['Projeto Hobby'],
      images: [
        '/projects/snake-game1.png',
        '/projects/snake-game2.png',
        '/projects/snake-game3.png',
      ],
      title: 'Snake Game',
      description:
        'Um jogo Snake 2D simples desenvolvido como projeto hobby e publicado por diversão.',
      technologies: ['Unity', 'C#', 'Aseprite'],
      downloadUrl: 'https://rafael-cavalinhos.itch.io/snake-game',
    },
  ];

  const [scrollY, setScrollY] = useState(0);
  const [heroScale, setHeroScale] = useState(1);
  const [windowHeight, setWindowHeight] = useState(0);

  const [unlocked, setUnlocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkTheme, setDarkTheme] = useState(false);

  const ticking = useRef(false);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          setHeroScale(Math.max(0, 1 - window.scrollY / 1000));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
      setUnlocked(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkTheme);
  }, [darkTheme]);

  return (
    <>
      <div id="home" className="background-color">
        {/* Cabeçalho */}
        <header className="text-color fixed z-100">
          <FlexCol
            className="background-color fixed z-99 h-full gap-y-4 p-4 py-18 transition duration-400 ease-in-out"
            style={{ transform: `translateX(${unlocked && menuOpen ? '0%' : '-100%'})` }}
          >
            <FlexCol className="gap-y-4 text-2xl font-semibold">
              {[
                { href: '#home', text: 'Início' },
                { href: '#about', text: 'Sobre' },
                { href: '#education', text: 'Formação' },
                { href: '#projects', text: 'Projetos' },
                { href: '#work-experience', text: 'Experiência' },
                { href: '#contact', text: 'Contacto' },
              ].map(({ href, text }, i) => {
                const fixedOffset = 2;

                return (
                  <TextAnchor
                    key={i}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      transform: menuOpen ? 'translateX(0)' : `translateX(-${i + fixedOffset}rem)`,
                      transition: 'transform 500ms ease-out',
                    }}
                  >
                    {text}
                  </TextAnchor>
                );
              })}
            </FlexCol>

            <div className="pointer-events-auto mb-4 rounded-2xl border-2 border-yellow-100 bg-yellow-300 px-6 py-2 font-semibold text-black shadow-md">
              🚧 Em Construção 🚧
            </div>
          </FlexCol>

          <TextButton
            className="absolute z-100 m-4 text-start text-2xl transition duration-400 ease-out"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            style={{
              transform: `scale(${unlocked ? '100%' : '0%'}) rotate(${menuOpen ? '0deg' : '180deg'})`,
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </TextButton>
        </header>

        <main className="">
          <TextButton
            style={{
              transform: `scale(${unlocked ? '100%' : '0%'})`,
            }}
            className="text-color fixed right-0 z-100 m-4 text-2xl transition duration-300 ease-out"
            onClick={() => setDarkTheme((prev) => !prev)}
          >
            <FontAwesomeIcon icon={!darkTheme ? faMoon : faSun} />
          </TextButton>

          <div
            onClick={() => setMenuOpen(false)}
            className={`fixed inset-0 z-80 bg-black/30 transition duration-500 ease-in-out ${
              menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />

          <FlexCol className="text-color w-full">
            {/* Secção Hero */}
            <FlexCol
              style={{ transform: `scale(${heroScale})`, transformOrigin: 'top' }}
              className="fixed h-screen w-full items-center justify-start gap-y-10 p-4 pt-14 transition-transform duration-100 ease-out"
            >
              <FlexCenter className="">
                <Image
                  src="/guy.gif"
                  alt="eu"
                  width={250}
                  height={250}
                  className="transition hover:scale-105"
                />
                {/* <p className="absolute text-center text-3xl text-yellow-500">
                  Imagem ainda
                  <br />
                  não disponível...
                </p> */}
              </FlexCenter>

              <FlexCol className="items-center gap-y-4 text-center text-5xl font-bold">
                <h1>
                  <SlideUp>
                    Olá!
                    <br />
                  </SlideUp>
                  <SlideUp delay={0.1}>
                    Sou o <span className="text-gradient">Rafael Cavalinhos</span>,<br />
                  </SlideUp>
                  <SlideUp delay={0.2}>Programador Full-Stack</SlideUp>
                </h1>

                <SlideUp delay={0.3}>
                  <button
                    onClick={() => window.open('/cv.pdf', '_blank')}
                    className="group foreground-color border-color cursor-pointer rounded-2xl border-3 px-10 py-2 text-xl transition duration-200 hover:scale-120"
                  >
                    <span className="inline-flex items-center gap-2 text-white transition duration-300 group-hover:scale-125">
                      Descarregar CV <FontAwesomeIcon icon={faDownload} />
                    </span>
                  </button>
                </SlideUp>

                <FlexRow className="gap-x-2 text-white">
                  <SlideUp delay={0.4}>
                    <button
                      onClick={() =>
                        window.open(
                          'https://www.linkedin.com/in/rafael-cavalinhos-39937624a/',
                          '_blank',
                        )
                      }
                      className="group foreground-color border-color h-10 w-10 cursor-pointer rounded-full border-3 text-xl transition duration-200 hover:scale-120"
                    >
                      <FontAwesomeIcon
                        className="inline-flex items-center transition duration-300 group-hover:scale-120"
                        icon={faLinkedin}
                      />
                    </button>
                  </SlideUp>

                  <SlideUp delay={0.5}>
                    <button
                      onClick={() => window.open('https://github.com/rafaelcavalinhos', '_blank')}
                      className="group foreground-color border-color h-10 w-10 cursor-pointer rounded-full border-3 text-xl transition duration-200 hover:scale-120"
                    >
                      <FontAwesomeIcon
                        className="inline-flex items-center transition duration-300 group-hover:scale-120"
                        icon={faGithub}
                      />
                    </button>
                  </SlideUp>

                  <SlideUp delay={0.6}>
                    <button
                      onClick={() =>
                        (window.location.href = 'mailto:rafaelcavalinhos2002@gmail.com')
                      }
                      className="group foreground-color border-color h-10 w-10 cursor-pointer rounded-full border-3 text-xl transition duration-200 hover:scale-120"
                    >
                      <FontAwesomeIcon
                        className="inline-flex items-center transition duration-300 group-hover:scale-120"
                        icon={faEnvelope}
                      />
                    </button>
                  </SlideUp>
                </FlexRow>
              </FlexCol>
            </FlexCol>

            {/* Secção Sobre */}
            <FlexCol
              id="about"
              className="background-secundary-color z-10 mt-[100vh] w-full items-center p-4"
            >
              <SlideUp>
                <h1 className="title">Sobre</h1>
              </SlideUp>

              <FlexCol className="w-full items-center gap-y-8">
                <FlexCol className="w-full items-center gap-y-4 text-lg font-medium">
                  <SlideUp delay={0.1}>
                    <h2 className="text-gradient text-center text-xl">Apresentação</h2>
                  </SlideUp>

                  <FlexCol className="w-full text-justify">
                    <SlideUp delay={0.2}>
                      <p className="text-center">
                        Sou licenciado em Engenharia Informática com um foco crescente em
                        desenvolvimento web, e gosta de resolver problemas reais construindo
                        aplicações. Passo grande parte do meu tempo livre a criar projetos pessoais
                        e a estudar para aperfeiçoar as minhas competências e explorar novas
                        tecnologias úteis. Sinto-me confortável a trabalhar em toda a stack, pois
                        gosto de perceber como tudo se liga, desde a base de dados até à interface.
                        Também gosto de desenvolvimento de videojogos e estou sempre à procura de
                        oportunidades para crescer, colaborar e contribuir para projetos reais.
                      </p>
                    </SlideUp>
                  </FlexCol>
                </FlexCol>

                <FlexCol className="w-full items-center gap-y-4 text-lg font-medium text-white">
                  <SlideUp delay={0.2}>
                    <h2
                      style={{ animationDelay: `${Math.random() * 0.5}s` }}
                      className="text-gradient text-xl"
                    >
                      Interesses Técnicos
                    </h2>
                  </SlideUp>

                  <FlexRow className="flex-wrap justify-center gap-x-1 gap-y-2">
                    {techInterests.map((interest, i) => {
                      return (
                        <SlideUp key={i} delay={0.05 * i}>
                          <div className="group border-color foreground-color rounded-3xl border-2 p-1 px-3 transition duration-300 hover:scale-125">
                            <p className="transition duration-200 group-hover:scale-120">
                              {interest}
                            </p>
                          </div>
                        </SlideUp>
                      );
                    })}
                  </FlexRow>

                  <h2
                    style={{ animationDelay: `${Math.random() * 0.5}s` }}
                    className="text-gradient text-xl"
                  >
                    Competências
                  </h2>
                  <FlexRow className="flex-wrap justify-center gap-x-1 gap-y-2">
                    {softSkills.map((skill, i) => {
                      return (
                        <SlideUp key={i} delay={0.05 * i}>
                          <div className="group border-color foreground-color rounded-3xl border-2 p-1 px-3 transition duration-300 hover:scale-125">
                            <p className="transition duration-200 group-hover:scale-120">{skill}</p>
                          </div>
                        </SlideUp>
                      );
                    })}
                  </FlexRow>

                  <h2
                    style={{ animationDelay: `${Math.random() * 0.5}s` }}
                    className="text-gradient text-xl"
                  >
                    Passatempos
                  </h2>
                  <FlexRow className="flex-wrap justify-center gap-x-1 gap-y-2">
                    {hobbies.map((hobby, i) => {
                      return (
                        <SlideUp key={i} delay={0.05 * i}>
                          <div className="group border-color foreground-color rounded-3xl border-2 p-1 px-3 transition duration-300 hover:scale-125">
                            <p className="transition duration-200 group-hover:scale-120">{hobby}</p>
                          </div>
                        </SlideUp>
                      );
                    })}
                  </FlexRow>
                </FlexCol>
              </FlexCol>
            </FlexCol>

            {/* Secção Formação */}
            <FlexCol id="education" className="background-color z-10 items-center p-4">
              <SlideUp>
                <h1 className="title">Formação</h1>
              </SlideUp>

              <SlideUp delay={0.1}>
                <FlexCol className="w-full gap-x-4 gap-y-4 text-white">
                  <FlexCol className="group foreground-color border-color w-full justify-start rounded-2xl border-4 p-4 transition duration-300 hover:scale-105">
                    <FlexCol className="transition group-hover:scale-102">
                      <p
                        style={{ animationDelay: `${Math.random() * 0.5}s` }}
                        className="text-gradient-waves text-xl font-bold"
                      >
                        Técnico de Gestão de Equipamentos Informáticos
                      </p>
                      <p className="text-base">Escola Tecnológica do Litoral Alentejano</p>
                      <FlexRow className="mt-2 mb-4 items-center gap-x-4 text-sm font-semibold">
                        <p>
                          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 09/2017 - 07/2020
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Sines - Portugal
                        </p>
                      </FlexRow>
                    </FlexCol>
                  </FlexCol>

                  <FlexCol className="group foreground-color border-color w-full justify-start rounded-2xl border-4 p-4 transition duration-300 hover:scale-105">
                    <span className="transition group-hover:scale-102">
                      <p
                        style={{ animationDelay: `${Math.random() * 0.5}s` }}
                        className="text-gradient-waves text-xl font-bold"
                      >
                        Desenvolvimento de Videojogos e Aplicações Multimédia
                      </p>
                      <p className="text-base">Instituto Politécnico de Setúbal</p>
                      <FlexRow className="mt-2 mb-4 items-center gap-x-4 text-sm font-semibold">
                        <p>
                          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 10/2020 - 06/2023
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Setúbal -
                          Portugal
                        </p>
                      </FlexRow>
                    </span>
                  </FlexCol>

                  <FlexCol className="group foreground-color border-color w-full justify-start rounded-2xl border-4 p-4 transition duration-300 hover:scale-105">
                    <span className="transition group-hover:scale-102">
                      <p
                        style={{ animationDelay: `${Math.random() * 0.5}s` }}
                        className="text-gradient-waves text-xl font-bold"
                      >
                        Licenciatura em Engenharia Informática e de Computadores
                      </p>
                      <p className="text-base">Instituto Politécnico de Setúbal</p>
                      <FlexRow className="mt-2 mb-4 items-center gap-x-4 text-sm font-semibold">
                        <p>
                          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 10/2023 - 10/2025
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Setúbal -
                          Portugal
                        </p>
                      </FlexRow>
                    </span>
                  </FlexCol>
                </FlexCol>
              </SlideUp>
            </FlexCol>

            {/* Secção Projetos */}
            <FlexCol id="projects" className="background-secundary-color z-10 w-full items-center">
              <SlideUp delay={0.1}>
                <h1 className="title p-4">Projetos</h1>
              </SlideUp>

              <FlexRow className="w-full gap-x-2 gap-y-2 overflow-x-auto px-4 pb-4">
                {projects.map(
                  (
                    {
                      tags,
                      images,
                      title,
                      description,
                      technologies,
                      downloadUrl,
                      videos,
                      featured,
                      wip,
                    },
                    i,
                  ) => (
                    <SlideUp key={i} delay={0.1 * (i + 1)}>
                      <Project
                        tags={tags}
                        images={images}
                        title={title}
                        description={description}
                        technologies={technologies}
                        downloadUrl={downloadUrl}
                        videos={videos}
                        featured={featured}
                        wip={wip}
                      />
                    </SlideUp>
                  ),
                )}
              </FlexRow>
            </FlexCol>

            {/* Secção Experiência Profissional */}
            <FlexCol id="work-experience" className="background-color z-10 w-full items-center p-4">
              <SlideUp delay={0.1}>
                <h1 className="title">Experiência Profissional</h1>
              </SlideUp>

              <FlexCol className="w-full gap-y-4">
                <SlideUp delay={0.2}>
                  <FlexCol className="group border-color text-color w-full justify-start border-y-4 p-4 transition duration-300 hover:scale-101">
                    <span className="transition group-hover:scale-102">
                      <p
                        style={{ animationDelay: `${Math.random() * 0.5}s` }}
                        className="text-gradient-waves-black text-xl font-bold"
                      >
                        Estágio na Albatroz Digital
                      </p>
                      <p className="text-base">Albatroz Digital</p>
                      <FlexRow className="mt-2 mb-4 items-center justify-between text-sm font-semibold">
                        <p>
                          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 07/2025 - 09/2025
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Almada - Portugal
                        </p>
                      </FlexRow>

                      <p className="text-justify">
                        Concebi e implementei uma interface completa para criação e gestão de
                        entidades. <br />
                        Desenvolvi componentes de front-end reutilizáveis para garantir consistência
                        visual e facilidade de manutenção. <br />
                        Desenvolvi a lógica de back-end, endpoints de API e a comunicação com a base
                        de dados necessários para suportar a nova interface.
                      </p>
                    </span>
                  </FlexCol>
                </SlideUp>

                <SlideUp delay={0.3}>
                  <FlexCol className="group border-color text-color w-full justify-start border-y-4 px-5 py-3 transition duration-300 hover:scale-101">
                    <span className="transition group-hover:scale-102">
                      <p
                        style={{ animationDelay: `${Math.random() * 0.5}s` }}
                        className="text-gradient-waves-black text-xl font-bold"
                      >
                        Estágio na Bee Engineering
                      </p>
                      <p className="text-base">Bee Engineering</p>
                      <FlexRow className="mt-2 mb-4 items-center justify-between text-sm font-semibold">
                        <p>
                          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 04/2022 - 08/2022
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Remoto <br />{' '}
                          (Lisboa - Portugal)
                        </p>
                      </FlexRow>

                      <p className="text-justify">
                        Desenvolvi protótipos de jogos mobile em Unity, tratando da lógica central
                        de gameplay, fluxo de UI e estrutura de níveis. <br />
                        Desenhei e ajustei níveis, integrei animações, áudio e feedback de gameplay
                        para melhorar a sensação de jogo. <br />
                        Trabalhei em ciclos de prototipagem rápida, iterando com base em testes
                        internos e feedback da equipa.
                      </p>
                    </span>
                  </FlexCol>
                </SlideUp>
              </FlexCol>
            </FlexCol>

            {/* Secção Contacto */}
            <FlexCol
              id="contact"
              className="foreground-strong-color z-10 w-full items-center p-4 text-white"
            >
              <h1 className="title">Contacto</h1>

              <FlexCol className="w-full items-center gap-y-4">
                <FlexCol className="items-center gap-y-2 text-center">
                  <p
                    style={{ animationDelay: `${Math.random() * 0.5}s` }}
                    className="text-gradient text-xl font-semibold"
                  >
                    Email
                  </p>
                  <p>rafaelcavalinhos2002@gmail.com</p>
                  <button
                    onClick={() => window.open('/cv.pdf', '_blank')}
                    className="group cursor-pointer rounded-full border-2 border-white bg-inherit px-4 py-2 text-base font-semibold transition duration-200 hover:scale-110"
                  >
                    <span className="inline-flex items-center transition duration-300 group-hover:scale-115">
                      Descarregar CV <FontAwesomeIcon icon={faDownload} />
                    </span>
                  </button>
                </FlexCol>

                <FlexCol className="gap-y-2 text-center">
                  <p
                    style={{ animationDelay: `${Math.random() * 0.5}s` }}
                    className="text-gradient text-xl font-semibold"
                  >
                    Redes Sociais
                  </p>
                  <FlexRow className="justify-center gap-x-2">
                    <FontAwesomeIcon
                      onClick={() =>
                        window.open(
                          'https://www.linkedin.com/in/rafael-cavalinhos-39937624a/',
                          '_blank',
                        )
                      }
                      className="cursor-pointer text-2xl transition hover:scale-125"
                      icon={faLinkedin}
                    />
                    <FontAwesomeIcon
                      onClick={() => window.open('https://github.com/rafaelcavalinhos', '_blank')}
                      className="cursor-pointer text-2xl transition hover:scale-125"
                      icon={faGithub}
                    />
                    <FontAwesomeIcon
                      onClick={() =>
                        (window.location.href = 'mailto:rafaelcavalinhos2002@gmail.com')
                      }
                      className="cursor-pointer text-2xl transition hover:scale-125"
                      icon={faEnvelope}
                    />
                  </FlexRow>
                </FlexCol>
              </FlexCol>
            </FlexCol>
          </FlexCol>
        </main>
      </div>
    </>
  );
}
