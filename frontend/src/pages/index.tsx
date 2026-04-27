import { GameCard } from '@/components/game-card/game-card';
import { MediaCarousel } from '@/components/media-carousel/media-carousel';
import ProjectSection from '@/components/project-section/project-section';
import { SlideUp } from '@/components/utils/animations';
import { FlexCol, FlexRow } from '@/components/utils/flex';
import { faGithub, faItchIo, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}

const NAV_KEYS = ['home', 'about', 'projects', 'experience', 'education', 'skills'] as const;
type NavKey = (typeof NAV_KEYS)[number];

const Index = () => {
  const t = useTranslations();
  const [active, setActive] = useState<NavKey>('home');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef<Record<NavKey, HTMLButtonElement | null>>({} as any);
  const navRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<NavKey, HTMLElement | null>>({} as any);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 'running' → character is animating in; 'idle' → swapped to idle sprite
  const [charState, setCharState] = useState<'running' | 'idle'>('running');

  useEffect(() => {
    const t = setTimeout(() => {
      setCharState('idle');
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (key: NavKey) => {
    setActive(key);
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);

    if (key === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [heroScale, setHeroScale] = useState(1);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
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
    const activeBtn = buttonRefs.current[active];
    const nav = navRef.current;
    if (!activeBtn || !nav) return;

    const btnRect = activeBtn.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    setPillStyle({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
    });
  }, [active]);

  const ICON_SIZE = 30;

  type SkillIconProps = {
    name: string;
    hover?: string;
    width?: number;
    height?: number;
  };

  function renderSkillIcons(icons: SkillIconProps[]) {
    return icons.map((o) => {
      const displayName = o.hover ?? o.name.replace(/\.[^.]+$/, '');
      const isSvg = o.name.endsWith('.svg');
      const size = o.width ?? ICON_SIZE;

      return (
        <div key={o.name} className="group relative inline-flex transition hover:scale-110">
          {isSvg ? (
            <img
              src={`/skills/${o.name}`}
              alt={displayName}
              width={size}
              height={size}
              style={{ width: size, height: size }}
            />
          ) : (
            <div style={{ width: size, height: size }}>
              <Image
                src={`/skills/${o.name}`}
                alt={displayName}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="bg-accent text-secondary relative block rounded-md px-2 py-1 text-sm whitespace-nowrap shadow-md">
              {displayName}
              <span className="bg-accent absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 shadow-md" />
            </span>
          </div>
        </div>
      );
    });
  }

  const GAMES = [
    {
      title: "Press 'em",
      description: t('pressEmDescription'),
      url: 'https://rafael-cavalinhos.itch.io/press-em',
      tags: [t('collegeProject')],
      tech: ['Unity', 'C#', 'Aseprite'],
      images: ['/projects/press-em1.png', '/projects/press-em2.png', '/projects/press-em3.png'],
    },
    {
      title: 'Castaway',
      description: t('castawayDescription'),
      url: 'https://rafael-cavalinhos.itch.io/castaway',
      tags: [t('collegeProject')],
      tech: ['Unity', 'C#', 'Aseprite'],
      images: ['/projects/castaway1.png', '/projects/castaway2.png', '/projects/castaway3.png'],
    },
    {
      title: 'Factory Dealings',
      description: t('factoryDealingsDescription'),
      url: 'https://rafael-cavalinhos.itch.io/factory-dealings',
      tags: [t('collegeProject'), 'Game Jam'],
      tech: ['Unity', 'C#', 'Aseprite'],
      images: [
        '/projects/factory-dealings1.png',
        '/projects/factory-dealings2.png',
        '/projects/factory-dealings3.png',
      ],
    },
    {
      title: 'Snake Game',
      description: t('snakeGameDescription'),

      url: 'https://rafael-cavalinhos.itch.io/snake-game',
      tags: ['Hobby'],
      tech: ['Unity', 'C#', 'Aseprite'],
      images: [
        '/projects/snake-game1.png',
        '/projects/snake-game2.png',
        '/projects/snake-game3.png',
      ],
    },
  ];

  return (
    <main className="text-primary bg-background relative">
      {/* Nav */}
      {/* <div
        ref={navRef}
        className="bg-accent/60 border-background/30 fixed top-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-x-1 rounded-full border p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
      >
        <span
          className="bg-accent/50 pointer-events-none absolute top-1 h-[calc(100%-8px)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
          style={{ left: pillStyle.left, width: pillStyle.width }}
        />
        {NAV_KEYS.map((key) => (
          <button
            key={key}
            ref={(el) => {
              buttonRefs.current[key] = el;
            }}
            onClick={() => scrollTo(key)}
            className={`relative z-10 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
              active === key ? 'text-secondary' : 'text-secondary/70 hover:text-secondary'
            }`}
          >
            {t(key)}
          </button>
        ))}
      </div> */}

      {/* Home */}
      <div
        id="home"
        ref={(el: HTMLDivElement | null) => {
          sectionRefs.current['home'] = el;
        }}
        className="fixed top-40 left-0 z-0 flex w-full flex-col items-center justify-start bg-inherit px-100"
        style={{ transform: `scale(${heroScale})`, transformOrigin: 'top' }}
      >
        <FlexRow className="gap-x-4 pb-10">
          {/* Character wrapper — slides in from the left, then swaps to idle */}
          <div
            className="character-run"
            style={{ position: 'relative', width: 128, height: 148, flexShrink: 0 }}
          >
            <Image
              src="https://2wcolulh7c.ufs.sh/f/lQW7uGAXRWdDQmOmyEYpNsKptcm4WTiRGVl7DfL6AqSgr9XY"
              alt="shadow"
              width={128}
              height={148}
              priority
              style={{
                position: 'absolute',
                top: 20,
                left: 0,
              }}
              unoptimized
            />

            {/* Running sprite — visible while animating in */}
            <Image
              src="https://2wcolulh7c.ufs.sh/f/lQW7uGAXRWdDHONKPLtDCunkeJMUlW08VPREZGx6ch1qiaLN"
              alt="character running"
              width={128}
              height={148}
              priority
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: charState === 'running' ? 1 : 0,
              }}
              unoptimized
            />
            {/* Idle sprite — fades in once the character arrives */}
            <Image
              src="https://2wcolulh7c.ufs.sh/f/lQW7uGAXRWdDlW2ExSAXRWdDiz15U6jTKhoQt87aA3OMuIHL"
              alt="character idle"
              width={128}
              height={148}
              priority
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: charState === 'idle' ? 1 : 0,
              }}
              unoptimized
            />
          </div>

          <FlexCol className="h-full items-start justify-between text-2xl font-semibold whitespace-nowrap">
            <SlideUp delay={0}>
              <p className="mb-2">
                {t('heroTitle1')} <span className="text-gradient font-bold">Rafael Cavalinhos</span>
                {t('heroTitle2')}
              </p>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-5xl font-semibold">{t('heroTitle3')}</p>
            </SlideUp>
            <SlideUp delay={0.2}>
              <p className="text-5xl font-semibold">{t('heroTitle4')}</p>
            </SlideUp>
            <SlideUp className="" delay={0.3}>
              <p className="mt-4">{t('heroTitle5')}</p>
            </SlideUp>
          </FlexCol>
        </FlexRow>

        <FlexRow className="gap-x-8">
          {[
            { icon: faGithub, onClick: () => undefined },
            { icon: faLinkedin, onClick: () => undefined },
            { icon: faEnvelope, onClick: () => undefined },
            { icon: faFileLines, onClick: () => undefined },
          ].map((b, i) => (
            <SlideUp delay={(i + 1) * 0.1 + 0.3}>
              <FlexCol
                key={`social-button-${i}`}
                className="group bg-accent text-background border-border h-10 w-10 cursor-pointer items-center justify-center rounded-full border-3 text-xl transition hover:scale-115"
                onClick={b.onClick}
              >
                <FontAwesomeIcon
                  icon={b.icon}
                  className="transition duration-300 ease-in-out group-hover:scale-120"
                />
              </FlexCol>
            </SlideUp>
          ))}
        </FlexRow>
      </div>

      {/* Projects */}
      <section
        id="projects"
        ref={(el) => {
          sectionRefs.current['projects'] = el;
        }}
        className="slide-up-in border-primary bg-surface relative z-10 mt-[85vh] flex justify-center border-y-4 py-10 pb-20 text-2xl"
      >
        <FlexCol className="w-full items-center px-50">
          <h2 className="mb-10 text-4xl font-semibold">{t('projects')}</h2>

          {/* Solo */}
          <SlideUp>
            <FlexRow className="text-accent/50 w-full items-center gap-x-2 text-sm tracking-wider uppercase">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              <div className="whitespace-nowrap">{t('soloProjects')}</div>
              <div className="h-min w-full border-b"></div>
            </FlexRow>
            <FlexRow className="border-border bg-background mt-4 mb-10 w-full items-stretch gap-x-6 overflow-hidden rounded-xl border p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <FlexCol className="flex-1 justify-center">
                <h3 className="text-3xl font-bold">Axon</h3>
                <p className="text-accent text-lg">{t('axonSubtitle')}</p>
                <p className="text-muted mt-6 text-base leading-relaxed">{t('axonDescription')}</p>
                <FlexRow className="mt-4 gap-x-2">
                  {/* {['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Fastify', 'Docker'].map(
                  (t, i) => (
                    <div
                      key={`axon-tech-${i}`}
                      className="border-muted/30 bg-muted/10 text-muted rounded-2xl border px-2 text-sm"
                    >
                      {t}
                    </div>
                  ),
                )} */}

                  {renderSkillIcons([
                    { width: 25, height: 25, name: 'nextjs.webp', hover: 'Next.js' },
                    { width: 25, height: 25, name: 'typescript.webp', hover: 'TypeScript' },
                    { width: 25, height: 25, name: 'tailwind.svg', hover: 'Tailwind' },
                    { width: 25, height: 25, name: 'nodejs.webp', hover: 'NodeJS' },
                    { width: 25, height: 25, name: 'postgresql.webp', hover: 'PostgreSQL' },
                    { width: 25, height: 25, name: 'fastify.webp', hover: 'Fastify' },
                    { width: 25, height: 25, name: 'docker.svg', hover: 'Docker' },
                    { width: 25, height: 25, name: 'cloudflare.svg', hover: 'Cloudflare' },
                    { width: 25, height: 25, name: 'vercel.svg', hover: 'Vercel' },
                    { width: 25, height: 25, name: 'railway.svg', hover: 'Railway' },
                    { width: 25, height: 25, name: 'github.svg', hover: 'Github' },
                  ])}
                </FlexRow>
                <a
                  href="https://getaxon.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border group bg-accent text-secondary mt-4 w-min rounded-lg border-2 px-2 text-base font-semibold whitespace-nowrap transition hover:scale-110 focus:outline-none"
                >
                  <FlexRow className="items-center gap-1 transition group-hover:scale-115">
                    {t('visit')}{' '}
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                  </FlexRow>
                </a>
              </FlexCol>

              <FlexCol className="relative min-h-[300px] flex-1">
                <Image
                  alt="axon"
                  src="/projects/saas1.png"
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </FlexCol>
            </FlexRow>
          </SlideUp>

          {/* Professional */}
          <SlideUp>
            <FlexRow className="text-accent/50 w-full items-center gap-x-2 text-sm tracking-wider uppercase">
              <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
              <div className="whitespace-nowrap">{t('professionalProjects')}</div>
              <div className="h-min w-full border-b"></div>
            </FlexRow>
            <FlexRow className="w-full gap-x-4">
              {/* Território Participado */}
              <FlexCol className="border-border bg-background mt-4 w-full items-stretch gap-x-6 overflow-hidden rounded-xl border p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <FlexCol className="flex-1 justify-center">
                  <FlexCol className="relative mb-4 min-h-[300px] flex-1">
                    <Image
                      alt="axon"
                      src="/projects/tp.png"
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 500px) 100vw, 50vw"
                    />
                  </FlexCol>
                  <h3 className="text-2xl font-bold">Território Participado</h3>
                  <p className="text-accent text-lg">{t('tpSubtitle')}</p>
                  <p className="text-muted mt-6 text-base leading-relaxed">{t('tpDescription')}</p>
                  <FlexRow className="mt-4 gap-x-2">
                    {renderSkillIcons([
                      { width: 25, height: 25, name: 'figma.svg', hover: 'Figma' },
                      { width: 25, height: 25, name: 'nextjs.webp', hover: 'Next.js' },
                      { width: 25, height: 25, name: 'typescript.webp', hover: 'TypeScript' },
                      { width: 25, height: 25, name: 'nodejs.webp', hover: 'NodeJS' },
                      { width: 25, height: 25, name: 'postgresql.webp', hover: 'PostgreSQL' },
                      { width: 25, height: 25, name: 'fastify.webp', hover: 'Fastify' },
                      { width: 25, height: 25, name: 'github.svg', hover: 'Github' },
                    ])}
                  </FlexRow>
                  <a
                    href="https://territorioparticipado.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border group bg-accent text-secondary mt-4 w-min rounded-lg border-2 px-2 text-base font-semibold whitespace-nowrap transition hover:scale-110 focus:outline-none"
                  >
                    <FlexRow className="items-center gap-1 transition group-hover:scale-115">
                      {t('visit')}{' '}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                    </FlexRow>
                  </a>
                </FlexCol>
              </FlexCol>
              {/* Estágio Bee Engineering */}
              <FlexCol className="bg-background border-border mt-4 w-full items-stretch gap-x-6 overflow-hidden rounded-xl border p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <FlexCol className="flex-1 justify-center">
                  <FlexCol className="relative mb-4 flex-1">
                    <MediaCarousel
                      images={[
                        '/projects/beach-rolling.mp4',
                        '/projects/spooky-hunt.mp4',
                        '/projects/brawl-fighters.mp4',
                        '/projects/wave-racer.mp4',
                        '/projects/feng-shui.mp4',
                        '/projects/flames-out.mp4',
                      ]}
                      videos={true}
                    ></MediaCarousel>
                  </FlexCol>
                  <h3 className="text-2xl font-bold">{t('internshipTitle')}</h3>
                  <p className="text-accent text-lg">{t('internshipSubtitle')}</p>
                  <p className="text-muted mt-6 text-base leading-relaxed">
                    {t('internshipDescription')}
                  </p>
                  <FlexRow className="mt-4 gap-x-2">
                    {renderSkillIcons([
                      { width: 25, height: 25, name: 'unity.webp', hover: 'Unity' },
                      { width: 25, height: 25, name: 'csharp.svg', hover: 'C#' },
                    ])}
                  </FlexRow>
                  <a
                    href="https://rafael-cavalinhos.itch.io/estgio-bee-engeneering"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border group bg-accent text-secondary mt-4 w-min rounded-lg border-2 px-2 text-base font-semibold whitespace-nowrap transition hover:scale-110 focus:outline-none"
                  >
                    <FlexRow className="items-center transition group-hover:scale-115">
                      <FontAwesomeIcon icon={faItchIo} className="text-xs" />
                      &nbsp;{`${t('seeOn')} itch.io`}
                    </FlexRow>
                  </a>
                </FlexCol>
              </FlexCol>
            </FlexRow>
          </SlideUp>

          {/* Games */}
          <SlideUp>
            <FlexRow className="text-accent/50 mt-10 w-full items-center gap-x-2 text-sm tracking-wider uppercase">
              <FontAwesomeIcon icon={faGamepad}></FontAwesomeIcon>
              <div className="whitespace-nowrap">{t('games')}</div>
              <div className="h-min w-full border-b"></div>
            </FlexRow>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {GAMES.map((g, i) => (
                <GameCard key={g.title} seeOn={t('seeOn')} project={g} delay={0.05 * (i + 1)} />
              ))}
            </div>
          </SlideUp>
        </FlexCol>
      </section>

      {/* Skills */}
      <section
        id="skills"
        ref={(el) => {
          sectionRefs.current['skills'] = el;
        }}
        className="relative flex flex-col items-center px-50 py-10 text-2xl"
      >
        <h2 className="mb-20 text-4xl font-semibold">{t('skills')}</h2>
        <SlideUp delay={0.1}>
          <FlexRow className="mb-4 gap-x-4">
            {/* Frontend */}
            <FlexCol className="border-border bg-background/50 justify-between gap-y-4 rounded-2xl border p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <FlexCol>
                <h3 className="mb-2 text-xl font-semibold">{t('frontend')}</h3>
                <p className="text-muted text-base">{t('frontendDescription1')}</p>
              </FlexCol>
              <FlexRow className="mt-2 gap-4">
                {renderSkillIcons([
                  { name: 'nextjs.webp', hover: 'Next.js' },
                  { name: 'typescript.webp', hover: 'TypeScript' },
                  { name: 'javascript.svg', hover: 'JavaScript' },
                  { name: 'csharp.svg', hover: 'C#' },
                  { name: 'tailwind.svg', hover: 'Tailwind' },
                  { name: 'html.webp', hover: 'HTML' },
                  { name: 'unity.webp', hover: 'Unity' },
                  { name: 'figma.svg', hover: 'Figma' },
                  { name: 'aseprite.svg', hover: 'Aseprite' },
                ])}
              </FlexRow>
            </FlexCol>
            {/* Backend */}
            <FlexCol className="border-border bg-background/50 translate-y-10 justify-between gap-y-4 rounded-2xl border p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <FlexCol>
                <h3 className="mb-2 text-xl font-semibold">{t('backend')}</h3>
                <p className="text-muted text-base">{t('backendDescription1')}</p>
                <p className="text-muted text-base">{t('backendDescription2')}</p>
              </FlexCol>
              <FlexRow className="mt-2 gap-4">
                {renderSkillIcons([
                  { name: 'nodejs.webp', hover: 'NodeJS' },
                  { name: 'fastify.webp', hover: 'Fastify' },
                  { name: 'postgresql.webp', hover: 'PostgreSQL' },
                  { name: 'puppeteer.webp', hover: 'Puppeteer' },
                ])}
              </FlexRow>
            </FlexCol>
          </FlexRow>
        </SlideUp>
        <SlideUp delay={0.2}>
          <FlexRow className="gap-x-4">
            {/* DevOps */}
            <FlexCol className="border-border bg-background/50 flex-1 justify-between gap-y-4 rounded-2xl border p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <FlexCol>
                <h3 className="mb-2 text-xl font-semibold">{t('devOps')}</h3>
                <p className="text-muted text-base">{t('devOpsDescription1')}</p>
              </FlexCol>
              <FlexRow className="mt-2 gap-4">
                {renderSkillIcons([
                  { name: 'vercel.svg', hover: 'Vercel' },
                  { name: 'railway.svg', hover: 'Railway' },
                  { name: 'docker.svg', hover: 'Docker' },
                  { name: 'cloudflare.svg', hover: 'Cloudflare' },
                  { name: 'github.svg', hover: 'Github' },
                  { name: 'git.svg', hover: 'Git' },
                ])}
              </FlexRow>
            </FlexCol>
            {/* Managment */}
            <FlexCol className="border-border bg-background/50 flex-1 translate-y-10 justify-between gap-y-4 rounded-2xl border p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <FlexCol>
                <h3 className="mb-2 text-xl font-semibold">{t('managment')}</h3>
                <p className="text-muted text-base">{t('managmentDescription1')}</p>
              </FlexCol>
              <FlexRow className="mt-2 gap-4">
                {['Agile', 'Scrum', 'Jira'].map((name) => (
                  <span
                    key={name}
                    className="bg-accent text-secondary cursor-default rounded-xl px-3 py-1 text-sm font-medium transition hover:scale-110"
                  >
                    {name}
                  </span>
                ))}
              </FlexRow>
            </FlexCol>
          </FlexRow>
        </SlideUp>
      </section>

      {/* Experience */}
      <section
        id="experience"
        ref={(el) => {
          sectionRefs.current['experience'] = el;
        }}
        className="flex h-screen items-center justify-center text-2xl"
      >
        Experience
      </section>

      {/* Education */}
      <section
        id="education"
        ref={(el) => {
          sectionRefs.current['education'] = el;
        }}
        className="flex h-screen items-center justify-center text-2xl"
      >
        Education
      </section>
    </main>
  );
};

export default Index;
