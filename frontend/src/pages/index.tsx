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

export default function Home() {
  const techInterests = [
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'TypeScript',
    'Fastify',
    'Kysely',
    'Web Design',
    'Tailwind CSS',
    'Automation',
    'Full-Stack',
    'Web Performance',
    'Web Security',
    'Docker',
    'Game Development',
    'Unity',
    'C#',
    'Digital Art',
    'Aseprite',
    'Video Editing',
  ];

  const softSkills = [
    'Problem Solving',
    'Team Collaboration',
    'Communication',
    'Time Managment',
    'Adaptability',
    'Critical Thinking',
  ];

  const hobbies = ['Guitar', 'Gaming', 'Programming', 'Animals', 'Cars'];

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
        {/* Header */}
        <header className="text-color fixed z-99 flex h-full flex-row">
          <FlexCol
            className="background-color gap-y-4 p-4 pt-18 transition duration-400 ease-in-out"
            style={{ transform: `translateX(${unlocked && menuOpen ? '0%' : '-100%'})` }}
          >
            <FlexCol className="gap-y-4 text-2xl font-semibold">
              {[
                { href: '#home', text: 'Home' },
                { href: '#about', text: 'About' },
                { href: '#education', text: 'Education' },
                { href: '#projects', text: 'Projects' },
                { href: '#work-experience', text: 'Work Experience' },
                { href: '#contact', text: 'Contact' },
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
              🚧 Under Construction 🚧
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

        <main>
          <TextButton
            style={{
              //transform: `scale(${scrollY >= windowHeight * 0.9 || !unlocked ? 0 : 1})`,
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

          <TextButton
            className="fixed left-1/2 z-99 mt-4 -translate-x-1/2 whitespace-nowrap transition-transform duration-300 ease-out"
            style={{ scale: scrollY >= windowHeight * 0.9 ? 1 : 0 }}
          >
            <h1
              onClick={() => {
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gradient text-2xl font-bold"
            >
              Rafael Cavalinhos
            </h1>
          </TextButton>

          <FlexCol className="text-color w-full">
            {/* Hero Section */}
            <FlexCol
              style={{ transform: `scale(${heroScale})`, transformOrigin: 'top' }}
              className="fixed h-screen w-full items-center justify-start gap-y-10 p-4 pt-14 transition-transform duration-100 ease-out"
            >
              <FlexCenter className="">
                <Image
                  src="/cat.gif"
                  alt="me"
                  width={250}
                  height={250}
                  className="rounded-full transition hover:scale-105"
                />
                <p className="absolute text-center text-3xl text-yellow-500">
                  Image not
                  <br />
                  available yet...
                </p>
              </FlexCenter>

              <FlexCol className="items-center gap-y-4 text-center text-5xl font-bold">
                <h1>
                  <SlideUp>
                    Hello!
                    <br />
                  </SlideUp>
                  <SlideUp delay={0.1}>
                    I'm <span className="text-gradient">Rafael Cavalinhos</span>,<br />
                  </SlideUp>
                  <SlideUp delay={0.2}>a Full-Stack Developer</SlideUp>
                </h1>

                <SlideUp delay={0.3}>
                  <button
                    onClick={() => window.open('/cv.pdf', '_blank')}
                    className="group foreground-color border-color cursor-pointer rounded-2xl border-3 px-10 py-2 text-xl transition duration-200 hover:scale-120"
                  >
                    <span className="inline-flex items-center gap-2 text-white transition duration-300 group-hover:scale-125">
                      Download CV <FontAwesomeIcon icon={faDownload} />
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

            {/* About Section*/}
            <FlexCol
              id="about"
              className="background-secundary-color z-10 mt-[100vh] w-full items-center gap-y-4 px-20 py-30 shadow-2xl"
            >
              <SlideUp>
                <h1 className="title">About</h1>
              </SlideUp>

              <FlexRow className="gap-x-10">
                <FlexCol className="w-[50%] items-center gap-y-4 text-lg font-medium">
                  <SlideUp delay={0.1}>
                    <h2 className="text-gradient text-3xl">Professional Bio</h2>
                  </SlideUp>

                  <FlexCol className="text-justify">
                    <SlideUp delay={0.2}>
                      <p>
                        I am Computer Engineering graduate with a growing focus on web development,
                        who likes to solve real problems by building applications. I spend a lot of
                        my free time building personal projects and studying to sharpen my skills
                        and explore new usefull technologies. I’m comfortable working across the
                        stack as I like understanding how everything connects, from the database to
                        the UI. I also like video game development and I'm always looking for
                        opportunities to grow, collaborate, and contribute to real-world projects.
                      </p>
                    </SlideUp>
                  </FlexCol>
                </FlexCol>

                <FlexCol className="w-[50%] items-center gap-y-4 text-lg font-medium text-white">
                  <SlideUp delay={0.2}>
                    <h2
                      style={{ animationDelay: `${Math.random() * 0.5}s` }}
                      className="text-gradient text-3xl"
                    >
                      Tech Interests
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
                    className="text-gradient mt-5 text-3xl"
                  >
                    Soft Skills
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
                    className="text-gradient mt-5 text-3xl"
                  >
                    Hobbies
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
              </FlexRow>
            </FlexCol>

            {/* Education Section */}
            <FlexCol
              id="education"
              className="background-color z-10 items-center gap-y-4 px-20 py-30"
            >
              <SlideUp>
                <h1 className="title">Education</h1>
              </SlideUp>

              {/* <FlexRow className="w-full justify-between px-[18%] absolute pt-12">

              <SlideUp delay={0.1}>
                <FlexCenter className="mt-20 group hover:scale-110 transition duration-300 w-10 h-10 foreground-color rounded-full text-reverse-color border-3 border-color font-semibold">
                    <p className="group-hover:scale-125 transition">1</p>
                </FlexCenter>
              </SlideUp>

              <SlideUp delay={0.2}>
                <FlexCenter className="mt-10 group hover:scale-110 transition duration-300 w-10 h-10 foreground-color rounded-full text-reverse-color border-3 border-color font-semibold">
                  <p className="group-hover:scale-125 transition">2</p>
                </FlexCenter>
              </SlideUp>

              <SlideUp delay={0.3}>
                <FlexCenter className="group hover:scale-110 transition duration-300 w-10 h-10 foreground-color rounded-full text-reverse-color border-3 border-color font-semibold">
                    <p className="group-hover:scale-125 transition">3</p>
                </FlexCenter>
              </SlideUp>

            </FlexRow> */}

              <SlideUp delay={0.1}>
                <FlexCol className="w-full gap-x-4 text-white">
                  <FlexCol className="group foreground-color border-color mt-20 w-full justify-start rounded-2xl border-4 px-5 py-3 transition duration-300 hover:scale-105">
                    <span className="transition group-hover:scale-102">
                      <p
                        style={{ animationDelay: `${Math.random() * 0.5}s` }}
                        className="text-gradient-waves text-xl font-bold"
                      >
                        IT Management Technician
                      </p>
                      <p className="text-base">Escola Tecnológica do Litoral Alentejano</p>
                      <FlexRow className="mt-2 mb-4 items-center gap-x-4 font-semibold">
                        <p>
                          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 09/2017 - 07/2020
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Sines - Portugal
                        </p>
                      </FlexRow>

                      <p className="text-justify">
                        Focused on the development and maintenance of IT solutions for business
                        environments, creating websites and company portals, installing and
                        configuring operating systems and application software, managing relational
                        databases and building management-oriented software applications.
                      </p>
                    </span>
                  </FlexCol>

                  <FlexCol className="group foreground-color border-color mt-10 w-full justify-start rounded-2xl border-4 px-5 py-3 transition duration-300 hover:scale-105">
                    <span className="transition group-hover:scale-102">
                      <p
                        style={{ animationDelay: `${Math.random() * 0.5}s` }}
                        className="text-gradient-waves text-xl font-bold"
                      >
                        Video Games and Multimedia Applications Development
                      </p>
                      <p className="text-base">Instituto Politécnico de Setúbal</p>
                      <FlexRow className="mt-2 mb-4 items-center gap-x-4 font-semibold">
                        <p>
                          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 10/2020 - 06/2023
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Setúbal -
                          Portugal
                        </p>
                      </FlexRow>

                      <p className="text-justify">
                        Focused on game development and multimedia applications, covering game
                        design techniques, interface design and core programming concepts. It
                        includes work with graphic APIs and game engines, as well as the creation
                        and editing of multimedia assets such as audio, video, textures and 3D
                        models.
                      </p>
                    </span>
                  </FlexCol>

                  <FlexCol className="group foreground-color border-color w-full justify-start rounded-2xl border-4 px-5 py-3 transition duration-300 hover:scale-105">
                    <span className="transition group-hover:scale-102">
                      <p
                        style={{ animationDelay: `${Math.random() * 0.5}s` }}
                        className="text-gradient-waves text-xl font-bold"
                      >
                        Bachelor’s Degree in Computer Science and Engineering
                      </p>
                      <p className="text-base">Instituto Politécnico de Setúbal</p>
                      <FlexRow className="mt-2 mb-4 items-center gap-x-4 font-semibold">
                        <p>
                          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 10/2023 - 10/2025
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Setúbal -
                          Portugal
                        </p>
                      </FlexRow>

                      <p className="text-justify">
                        Bachelor’s degree focused on developing technical and scientific skills in
                        the field of computer science. It covers programming, databases, networks,
                        software development, and technology integration. The program combines
                        theory and practice through laboratory projects and teamwork, preparing
                        professionals for the design, analysis, and implementation of modern IT
                        solutions.
                      </p>
                    </span>
                  </FlexCol>
                </FlexCol>
              </SlideUp>
            </FlexCol>

            {/* Projects Section */}
            <FlexCol
              id="projects"
              className="background-secundary-color z-10 w-full items-center gap-y-4 px-20 py-30"
            >
              <SlideUp delay={0.1}>
                <h1 className="title">Projects</h1>
              </SlideUp>

              <FlexRow className="flex-wrap justify-center gap-2">
                <SlideUp delay={0.1}>
                  <Project
                    tags={['College Project']}
                    images={[
                      '/projects/press-em1.png',
                      '/projects/press-em2.png',
                      '/projects/press-em3.png',
                    ]}
                    title="Press 'em"
                    description="In Press 'em you need to defeat robots and solve puzzles by grabbing crates and pressing buttons to complete the levels!"
                    technologies={['Unity', 'C#', 'Aseprite']}
                    downloadUrl="https://rafael-cavalinhos.itch.io/press-em"
                  />
                </SlideUp>

                <SlideUp delay={0.2}>
                  <Project
                    tags={['College Project']}
                    images={[
                      '/projects/castaway1.png',
                      '/projects/castaway2.png',
                      '/projects/castaway3.png',
                    ]}
                    title="Castaway"
                    description="Castaway is a game where you will try to survive the days and nights in an island whilst fighting enemies and gathering resources to finally fix and escape in your until then wrecked ship."
                    technologies={['Unity', 'C#', 'Aseprite']}
                    downloadUrl="https://rafael-cavalinhos.itch.io/castaway"
                  />
                </SlideUp>

                <SlideUp delay={0.3}>
                  <Project
                    tags={['College Project', 'Game Jam']}
                    images={[
                      '/projects/factory-dealings1.png',
                      '/projects/factory-dealings2.png',
                      '/projects/factory-dealings3.png',
                    ]}
                    title="Factory Dealings"
                    description="Factory Dealings is an arcade game where you'll have to give items for injured robots, and fast, or else they will explode and die a cruel death."
                    technologies={['Unity', 'C#', 'Aseprite']}
                    downloadUrl="https://rafael-cavalinhos.itch.io/factory-dealings"
                  />
                </SlideUp>

                <SlideUp delay={0.4}>
                  <Project
                    tags={['Hobby Project']}
                    images={[
                      '/projects/snake-game1.png',
                      '/projects/snake-game2.png',
                      '/projects/snake-game3.png',
                    ]}
                    title="Snake Game"
                    description="A basic 2D Snake game made as a hobby project and published for fun."
                    technologies={['Unity', 'C#', 'Aseprite']}
                    downloadUrl="https://rafael-cavalinhos.itch.io/snake-game"
                  />
                </SlideUp>

                <SlideUp delay={0.5}>
                  <Project
                    tags={['Internship', 'Team Project']}
                    videos
                    images={[
                      '/projects/beach-rolling.mp4',
                      '/projects/spooky-hunt.mp4',
                      '/projects/brawl-fighters.mp4',
                      '/projects/wave-racer.mp4',
                      '/projects/feng-shui.mp4',
                      '/projects/flames-out.mp4',
                    ]}
                    title="Internship Mobile Games"
                    description="These mobile games were developed as demonstration prototypes for advertising purposes, with the objective of evaluating their potential before deciding which concepts would proceed to full development. As a result, only the advertisements are available."
                    technologies={['Unity', 'C#']}
                    downloadUrl="https://rafael-cavalinhos.itch.io/estgio-bee-engeneering"
                  />
                </SlideUp>
              </FlexRow>
            </FlexCol>

            {/* Work Experience Section */}
            <FlexCol
              id="work-experience"
              className="background-color z-10 w-full items-center gap-y-4 px-20 py-30"
            >
              <SlideUp delay={0.1}>
                <h1 className="title">Work Experience</h1>
              </SlideUp>

              {/* <SlideUp delay={0.2}>
              <p className="text-center text-6xl text-gradient py-6">Under construction</p>
            </SlideUp> */}

              <FlexRow className="w-full">
                {/* <FlexCol className="justify-around p-10">
                <FontAwesomeIcon icon={faArrowCircleRight} className="text-blue-400"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faArrowCircleRight} className="text-blue-400"></FontAwesomeIcon>
              </FlexCol> */}

                <FlexCol className="w-full gap-y-2">
                  <SlideUp delay={0.2}>
                    <FlexCol className="group border-color text-color w-full justify-start border-y-4 px-5 py-3 transition duration-300 hover:scale-105">
                      <span className="transition group-hover:scale-102">
                        <p
                          style={{ animationDelay: `${Math.random() * 0.5}s` }}
                          className="text-gradient-waves-black text-xl font-bold"
                        >
                          Internship at Albatroz Digital
                        </p>
                        <p className="text-base">Albatroz Digital</p>
                        <FlexRow className="mt-2 mb-4 items-center gap-x-4 font-semibold">
                          <p>
                            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 07/2025 - 09/2025
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Almada -
                            Portugal
                          </p>
                        </FlexRow>

                        <p className="text-justify">
                          Designed and implemented a full interface for creating and managing
                          entities. <br />
                          Built reusable front-end components to ensure visual consistency and
                          maintainability. <br />
                          Developed the backend logic, API endpoints and database communication
                          needed to support the new interface.
                        </p>
                      </span>
                    </FlexCol>
                  </SlideUp>

                  <SlideUp delay={0.3}>
                    <FlexCol className="group border-color text-color w-full justify-start border-y-4 px-5 py-3 transition duration-300 hover:scale-105">
                      <span className="transition group-hover:scale-102">
                        <p
                          style={{ animationDelay: `${Math.random() * 0.5}s` }}
                          className="text-gradient-waves-black text-xl font-bold"
                        >
                          Internship at Bee Engineering
                        </p>
                        <p className="text-base">Bee Engineering</p>
                        <FlexRow className="mt-2 mb-4 items-center gap-x-4 font-semibold">
                          <p>
                            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> 04/2022 - 08/2022
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> Remote (Lisbon
                            - Portugal)
                          </p>
                        </FlexRow>

                        <p className="text-justify">
                          Developed mobile game prototypes in Unity, handling core gameplay logic,
                          UI flow and level structure. <br />
                          Designed and tuned levels, integrated animations, audio and gameplay
                          feedback to enhance game feel. <br />
                          Worked in rapid prototyping cycles, iterating based on internal
                          playtesting and feedback.
                        </p>
                      </span>
                    </FlexCol>
                  </SlideUp>
                </FlexCol>
              </FlexRow>
            </FlexCol>

            {/* Contact Section */}
            <FlexCol
              id="contact"
              className="foreground-strong-color selection:foreground-color z-10 m-0 w-full items-center gap-y-4 px-20 py-30 text-white"
            >
              <h1 className="title">Contact</h1>

              <FlexRow className="w-full items-start justify-between">
                <FlexCol className="w-[33%] items-center text-center">
                  <p
                    style={{ animationDelay: `${Math.random() * 0.5}s` }}
                    className="text-gradient text-xl font-semibold"
                  >
                    Email
                  </p>
                  <p>rafaelcavalinhos2002@gmail.com</p>
                  <button
                    onClick={() => window.open('/cv.pdf', '_blank')}
                    className="group w-[45%] cursor-pointer rounded-2xl border-2 border-white bg-inherit text-base font-semibold transition duration-200 hover:scale-110"
                  >
                    <span className="inline-flex items-center transition duration-300 group-hover:scale-115">
                      Download CV <FontAwesomeIcon icon={faDownload} />
                    </span>
                  </button>
                </FlexCol>

                <FlexCol className="w-[33%] items-center text-center">
                  <p
                    style={{ animationDelay: `${Math.random() * 0.5}s` }}
                    className="text-gradient text-xl font-semibold"
                  >
                    Overview
                  </p>
                  <a href="#about" className="">
                    About
                  </a>
                  <a href="#education" className="">
                    Education
                  </a>
                  <a href="#projects" className="">
                    Projects
                  </a>
                  <a href="#work" className="">
                    Work Experience
                  </a>
                  <a href="#contact" className="">
                    Contact
                  </a>
                </FlexCol>

                <FlexCol className="w-[33%] text-center">
                  <p
                    style={{ animationDelay: `${Math.random() * 0.5}s` }}
                    className="text-gradient text-xl font-semibold"
                  >
                    Socials
                  </p>
                  <FlexRow className="justify-center gap-x-10">
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
              </FlexRow>
            </FlexCol>
          </FlexCol>
        </main>
      </div>

      {/* <FlexCenter className="block lg:hidden h-full font-bold text-2xl">
      <p className="text-gradient text-center">Please open this webpage on a computer.</p>
    </FlexCenter> */}
    </>
  );
}
