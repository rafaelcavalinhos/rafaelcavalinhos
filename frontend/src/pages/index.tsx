import { GameCard } from '@/components/game-card/game-card';
import { MediaCarousel } from '@/components/media-carousel/media-carousel';
import ProjectSection from '@/components/project-section/project-section';
import { SlideUp } from '@/components/utils/animations';
import { FlexCol, FlexRow } from '@/components/utils/flex';
import { faGithub, faItchIo, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpRightFromSquare,
  faCalendar,
  faGraduationCap,
  faLocationDot,
  faMoon,
  faSun,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}

const Index = () => {
  const t = useTranslations();

  const [charState, setCharState] = useState<'running' | 'idle'>('running');

  const hasPlayed = useRef(false);

  useEffect(() => {
    const start = () => {
      if (hasPlayed.current) return;
      if (document.visibilityState !== 'visible') return;

      const timer = setTimeout(() => {
        setCharState('idle');
        hasPlayed.current = true;
      }, 3000);

      return () => clearTimeout(timer);
    };

    // run immediately in case already visible
    const cleanup = start();

    // handle coming back to tab
    const handleVisibility = () => {
      start();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      cleanup?.();
    };
  }, []);

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
            <div style={{ width: size, height: size }} className="relative">
              <Image
                src={`/skills/${o.name}`}
                alt={displayName}
                fill
                sizes={`${size}px`}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="bg-accent relative block rounded-md px-2 py-1 text-sm whitespace-nowrap text-white shadow-md">
              {displayName}
              <span className="bg-accent absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 shadow-md" />
            </span>
          </div>
        </div>
      );
    });
  }

  const COLLEGE_PROJECTS = [
    {
      title: 'WattSwap',
      description: t('wattSwapDescription'),
      images: ['/projects/watt-swap1.png', '/projects/watt-swap2.png', '/projects/watt-swap3.png'],
    },
    {
      title: "Press 'em",
      description: t('pressEmDescription'),
      url: 'https://rafael-cavalinhos.itch.io/press-em',
      images: ['/projects/press-em1.png', '/projects/press-em2.png', '/projects/press-em3.png'],
    },
    {
      title: 'Castaway',
      description: t('castawayDescription'),
      url: 'https://rafael-cavalinhos.itch.io/castaway',
      images: ['/projects/castaway1.png', '/projects/castaway2.png', '/projects/castaway3.png'],
    },
    {
      title: 'Factory Dealings',
      description: t('factoryDealingsDescription'),
      url: 'https://rafael-cavalinhos.itch.io/factory-dealings',
      tags: ['gameJam'],
      images: [
        '/projects/factory-dealings1.png',
        '/projects/factory-dealings2.png',
        '/projects/factory-dealings3.png',
      ],
    },
  ];

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {
      root.classList.add('dark');
      setTheme('dark');
    } else if (saved === 'light') {
      root.classList.remove('dark');
      setTheme('light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const router = useRouter();
  const { locale } = router;

  const toggleLocale = () => {
    const next = locale === 'pt' ? 'en' : 'pt';
    router.push(router.pathname, router.asPath, { locale: next });
  };

  const baseUrl = 'https://rafaelcavalinhos.com';
  const canonicalUrl = locale === 'en' ? `${baseUrl}/en` : baseUrl;
  const ogLocale = locale === 'en' ? 'en_US' : 'pt_PT';

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
        <meta name="author" content="Rafael Cavalinhos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="Y9BahKKxFlbONlcfbHGizRvJiJuETVbGsi2BxRSPgIs"
        />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="pt" href={baseUrl} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t('metaTitle')} />
        <meta property="og:description" content={t('metaDescription')} />
        <meta property="og:image" content={`${baseUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={ogLocale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('metaTitle')} />
        <meta name="twitter:description" content={t('metaDescription')} />
        <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <main className="text-primary relative w-full">
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[url('/bg.jpg')] bg-repeat opacity-20"
          style={{ backgroundSize: '2000px', filter: 'blur(2px)' }}
        />

        {/* ── Navbar ── */}
        <FlexRow className="mt-6 justify-between px-6 sm:px-10 md:px-20 xl:px-30">
          <p className="text-xl font-semibold">Rafael Cavalinhos.</p>
          <FlexRow className="items-center gap-x-2">
            <img
              src={locale === 'pt' ? '/en.svg' : '/pt.svg'}
              alt={locale === 'pt' ? 'UK flag' : 'Portugal flag'}
              className="h-8 w-8 cursor-pointer rounded-md transition hover:scale-115"
              onClick={toggleLocale}
            />
            <FontAwesomeIcon
              onClick={toggleTheme}
              icon={theme === 'dark' ? faSun : faMoon}
              className="cursor-pointer text-2xl transition hover:scale-120"
            />
          </FlexRow>
        </FlexRow>

        {/* ── Hero ── */}
        <div
          id="home"
          className="z-0 flex min-h-[85vh] w-full flex-col items-center justify-center bg-transparent px-6 sm:px-10 md:px-20 xl:px-30"
        >
          {/* Character + text — stack on mobile, row on md+ */}
          <FlexRow className="w-full max-w-4xl flex-wrap items-center justify-center gap-6 pb-10 md:flex-nowrap md:justify-start">
            {/* Character sprite */}
            <div
              className="character-run shrink-0"
              style={{ position: 'relative', width: 128, height: 148 }}
            >
              <Image
                src="https://2wcolulh7c.ufs.sh/f/lQW7uGAXRWdDQmOmyEYpNsKptcm4WTiRGVl7DfL6AqSgr9XY"
                alt="shadow"
                width={128}
                height={148}
                priority
                style={{ position: 'absolute', top: 20, left: 0 }}
                unoptimized
              />
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

            {/* Hero text — centered on mobile, left-aligned on md+ */}
            <FlexCol className="items-center gap-y-2 text-center md:items-start md:text-left">
              <SlideUp delay={0}>
                <p className="text-lg font-semibold sm:text-xl md:text-2xl">
                  {t('heroTitle1')}{' '}
                  <span className="text-gradient font-bold">Rafael Cavalinhos</span>
                  {t('heroTitle2')}
                </p>
              </SlideUp>
              <SlideUp delay={0.1}>
                <p className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:whitespace-nowrap">
                  {t('heroTitle3')}
                </p>
              </SlideUp>
              <SlideUp delay={0.2}>
                <p className="text-3xl font-semibold sm:text-4xl md:text-5xl">{t('heroTitle4')}</p>
              </SlideUp>
              <SlideUp delay={0.3}>
                <p className="mt-2 text-base sm:text-lg md:text-xl">{t('heroTitle5')}</p>
              </SlideUp>
            </FlexCol>
          </FlexRow>

          {/* Social buttons */}
          <FlexRow className="gap-x-6 sm:gap-x-8">
            {[
              {
                hover: 'Github',
                icon: faGithub,
                onClick: () => window.open('https://github.com/rafaelcavalinhos', '_blank'),
              },
              {
                hover: 'LinkedIn',
                icon: faLinkedin,
                onClick: () =>
                  window.open('https://www.linkedin.com/in/rafael-cavalinhos-39937624a', '_blank'),
              },
              {
                hover: t('email'),
                icon: faEnvelope,
                onClick: () => (window.location.href = 'mailto:rafaelcavalinhos2002@gmail.com'),
              },
              {
                hover: t('resume'),
                icon: faFileLines,
                onClick: () =>
                  window.open(
                    locale === 'pt' ? '/cv-rafaelcavalinhos.pdf' : '/cv-rafaelcavalinhos-en.pdf',
                    '_blank',
                  ),
              },
            ].map((b, i) => (
              <SlideUp key={`social-${i}`} delay={(i + 1) * 0.1 + 0.3}>
                <FlexCol
                  className="group bg-accent border-border relative h-10 w-10 cursor-pointer items-center justify-center rounded-full border-3 text-xl text-white transition hover:scale-115"
                  onClick={b.onClick}
                >
                  <FontAwesomeIcon
                    icon={b.icon}
                    className="transition duration-300 ease-in-out group-hover:scale-120"
                  />
                  <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="bg-accent relative block rounded-md px-2 py-1 text-sm whitespace-nowrap shadow-md">
                      {b.hover}
                      <span className="bg-accent absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 shadow-md" />
                    </span>
                  </div>
                </FlexCol>
              </SlideUp>
            ))}
          </FlexRow>
        </div>

        {/* ── Projects ── */}
        <section
          id="projects"
          className="slide-up-in border-primary bg-surface relative z-10 flex w-full justify-center border-y-2 py-10 pb-20 text-2xl"
        >
          <FlexCol className="w-full items-center px-6 sm:px-10 md:px-20 xl:px-30">
            <h2 className="mb-10 text-4xl font-semibold">{t('projects')}</h2>

            <FlexCol className="w-full">
              {/* Solo */}
              <SlideUp>
                <FlexRow className="text-accent/50 w-full items-center gap-x-2 text-sm tracking-wider uppercase">
                  <FontAwesomeIcon icon={faUser} />
                  <div className="whitespace-nowrap">{t('soloProjects')}</div>
                  <div className="h-min w-full border-b" />
                </FlexRow>

                {/* Axon card — stacks on mobile, row on lg+ */}
                <div className="border-rim bg-background mt-4 mb-10 w-full overflow-hidden rounded-xl border p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
                    <FlexCol className="flex-1 justify-center">
                      <h3 className="text-3xl font-bold">Axon</h3>
                      <p className="text-accent text-lg">{t('axonSubtitle')}</p>
                      <p className="text-muted mt-6 text-base leading-relaxed">
                        {t('axonDescription')}
                      </p>
                      <FlexRow className="mt-4 w-full flex-wrap gap-2">
                        {renderSkillIcons([
                          { width: 25, height: 25, name: 'nextjs.webp', hover: 'Next.js' },
                          { width: 25, height: 25, name: 'react.svg', hover: 'React' },
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
                        className="border-border group bg-accent mt-4 w-min rounded-lg border-2 px-2 text-base font-semibold whitespace-nowrap text-white transition hover:scale-110 focus:outline-none"
                      >
                        <FlexRow className="items-center gap-1 transition group-hover:scale-115">
                          {t('visit')}{' '}
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                        </FlexRow>
                      </a>
                    </FlexCol>

                    <div className="relative min-h-[220px] flex-1 sm:min-h-[280px] lg:min-h-[300px]">
                      <Image
                        alt="axon"
                        src="/projects/saas1.png"
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </SlideUp>

              {/* Professional */}
              <SlideUp>
                <FlexRow className="text-accent/50 w-full items-center gap-x-2 text-sm tracking-wider uppercase">
                  <FontAwesomeIcon icon={faUsers} />
                  <div className="whitespace-nowrap">{t('professionalProjects')}</div>
                  <div className="h-min w-full border-b" />
                </FlexRow>

                {/* Stacks on mobile, row on lg+ */}
                <div className="mt-4 flex flex-col gap-4 lg:flex-row">
                  {/* Território Participado */}
                  <FlexCol className="border-rim bg-background w-full overflow-hidden rounded-xl border p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                    <div className="relative mb-4 min-h-[200px] w-full sm:min-h-[260px] lg:min-h-[300px]">
                      <Image
                        alt="território participado"
                        src="/projects/tp.png"
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <h3 className="text-2xl font-bold">Território Participado</h3>
                    <p className="text-accent text-lg">{t('tpSubtitle')}</p>
                    <p className="text-muted mt-6 text-base leading-relaxed">
                      {t('tpDescription')}
                    </p>
                    <FlexRow className="mt-4 flex-wrap gap-2">
                      {renderSkillIcons([
                        { width: 25, height: 25, name: 'figma.svg', hover: 'Figma' },
                        { width: 25, height: 25, name: 'nextjs.webp', hover: 'Next.js' },
                        { width: 25, height: 25, name: 'react.svg', hover: 'React' },
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
                      className="border-border group bg-accent mt-4 w-min rounded-lg border-2 px-2 text-base font-semibold whitespace-nowrap text-white transition hover:scale-110 focus:outline-none"
                    >
                      <FlexRow className="items-center gap-1 transition group-hover:scale-115">
                        {t('visit')}{' '}
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                      </FlexRow>
                    </a>
                  </FlexCol>

                  {/* Estágio Bee Engineering */}
                  <FlexCol className="bg-background border-rim w-full overflow-hidden rounded-xl border p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                    <div className="mb-4">
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
                      />
                    </div>
                    <h3 className="text-2xl font-bold">{t('internshipTitle')}</h3>
                    <p className="text-accent text-lg">{t('internshipSubtitle')}</p>
                    <p className="text-muted mt-6 text-base leading-relaxed">
                      {t('internshipDescription')}
                    </p>
                    <FlexRow className="mt-4 flex-wrap gap-2">
                      {renderSkillIcons([
                        { width: 25, height: 25, name: 'unity.webp', hover: 'Unity' },
                        { width: 25, height: 25, name: 'csharp.svg', hover: 'C#' },
                      ])}
                    </FlexRow>
                    <a
                      href="https://rafael-cavalinhos.itch.io/estgio-bee-engeneering"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border group bg-accent mt-4 w-min rounded-lg border-2 px-2 text-base font-semibold whitespace-nowrap text-white transition hover:scale-110 focus:outline-none"
                    >
                      <FlexRow className="items-center transition group-hover:scale-115">
                        <FontAwesomeIcon icon={faItchIo} className="text-xs" />
                        &nbsp;{`${t('seeOn')} itch.io`}
                      </FlexRow>
                    </a>
                  </FlexCol>
                </div>
              </SlideUp>

              {/* College Projects */}
              <SlideUp>
                <FlexRow className="text-accent/50 mt-10 w-full items-center gap-x-2 text-sm tracking-wider uppercase">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <div className="whitespace-nowrap">{t('collegeProjects')}</div>
                  <div className="h-min w-full border-b" />
                </FlexRow>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {COLLEGE_PROJECTS.map((g, i) => (
                    <GameCard key={g.title} seeOn={t('seeOn')} project={g} delay={0.05 * (i + 1)} />
                  ))}
                </div>
              </SlideUp>
            </FlexCol>
          </FlexCol>
        </section>

        {/* ── Skills ── */}
        <section
          id="skills"
          className="relative mb-20 flex flex-col items-center px-6 py-10 text-2xl sm:px-10 md:px-20 xl:px-30"
        >
          <h2 className="mb-10 text-4xl font-semibold">{t('skills')}</h2>
          <FlexCol className="w-full gap-y-4">
            <SlideUp delay={0.1}>
              {/* Frontend + Backend — stack on mobile, row on md+ */}
              <div className="flex flex-col gap-4 md:flex-row">
                {/* Frontend */}
                <FlexCol className="border-border bg-background/70 flex-1 justify-between gap-y-4 rounded-2xl border p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <FlexCol>
                    <h3 className="mb-2 text-xl font-semibold">{t('frontend')}</h3>
                    <p className="text-muted text-base">{t('frontendDescription1')}</p>
                  </FlexCol>
                  <FlexRow className="mt-2 flex-wrap gap-4">
                    {renderSkillIcons([
                      { name: 'nextjs.webp', hover: 'Next.js' },
                      { name: 'react.svg', hover: 'React' },
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

                {/* Backend — removed the broken translate-y-10 on mobile */}
                <FlexCol className="border-border bg-background/70 flex-1 justify-between gap-y-4 rounded-2xl border p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] md:translate-y-10 dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <FlexCol>
                    <h3 className="mb-2 text-xl font-semibold">{t('backend')}</h3>
                    <p className="text-muted text-base">{t('backendDescription1')}</p>
                    <p className="text-muted text-base">{t('backendDescription2')}</p>
                  </FlexCol>
                  <FlexRow className="mt-2 flex-wrap gap-4">
                    {renderSkillIcons([
                      { name: 'nodejs.webp', hover: 'NodeJS' },
                      { name: 'fastify.webp', hover: 'Fastify' },
                      { name: 'postgresql.webp', hover: 'PostgreSQL' },
                      { name: 'puppeteer.webp', hover: 'Puppeteer' },
                      { name: 'dotnet.svg', hover: '.NET Core' },
                    ])}
                  </FlexRow>
                </FlexCol>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              {/* DevOps + Management — stack on mobile, row on md+ */}
              <div className="flex flex-col gap-4 md:flex-row">
                {/* DevOps */}
                <FlexCol className="border-border bg-background/70 flex-1 justify-between gap-y-4 rounded-2xl border p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <FlexCol>
                    <h3 className="mb-2 text-xl font-semibold">{t('devOps')}</h3>
                    <p className="text-muted text-base">{t('devOpsDescription1')}</p>
                  </FlexCol>
                  <FlexRow className="mt-2 flex-wrap gap-4">
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

                {/* Management — removed translate-y-10 on mobile */}
                <FlexCol className="border-border bg-background/70 flex-1 justify-between gap-y-4 rounded-2xl border p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] md:translate-y-10 dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <FlexCol>
                    <h3 className="mb-2 text-xl font-semibold">{t('managment')}</h3>
                    <p className="text-muted text-base">{t('managmentDescription1')}</p>
                  </FlexCol>
                  <FlexRow className="mt-2 flex-wrap gap-3">
                    {['Agile', 'Scrum', 'Jira'].map((name) => (
                      <span
                        key={name}
                        className="bg-accent cursor-default rounded-xl px-3 py-1 text-sm font-medium text-white transition hover:scale-110"
                      >
                        {name}
                      </span>
                    ))}
                  </FlexRow>
                </FlexCol>
              </div>
            </SlideUp>
          </FlexCol>
        </section>

        {/* ── Experience & Education ── */}
        <section
          id="experience"
          className="relative flex flex-col items-center px-6 py-10 pb-20 text-2xl sm:px-10 md:px-20 xl:px-30"
        >
          {/* Stack on mobile, side-by-side on lg+ */}
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:gap-4">
            {/* Experience column */}
            <FlexCol className="flex-1 items-center gap-y-4 lg:translate-y-1/4">
              <h2 className="mb-6 text-4xl font-semibold">{t('experience')}</h2>

              <SlideUp delay={0.2}>
                <FlexRow className="border-border bg-background/70 w-full gap-x-6 rounded-2xl border p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <FlexCol className="flex-1 gap-y-1">
                    <p className="text-primary text-xl font-bold">{t('exp1Title')}</p>
                    <p className="text-accent text-base font-semibold">{t('exp1Company')}</p>
                    <FlexRow className="text-muted mt-1 mb-3 flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
                      <span>
                        <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                        {t('exp1Date')}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                        {t('exp1Location')}
                      </span>
                    </FlexRow>
                    <p className="text-muted text-base leading-relaxed">{t('exp1Description')}</p>
                  </FlexCol>
                </FlexRow>
              </SlideUp>

              <SlideUp delay={0.3}>
                <FlexRow className="border-border bg-background/70 w-full gap-x-6 rounded-2xl border p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <FlexCol className="flex-1 gap-y-1">
                    <p className="text-primary text-xl font-bold">{t('exp2Title')}</p>
                    <p className="text-accent text-base font-semibold">{t('exp2Company')}</p>
                    <FlexRow className="text-muted mt-1 mb-3 flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
                      <span>
                        <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                        {t('exp2Date')}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                        {t('exp2Location')}
                      </span>
                    </FlexRow>
                    <p className="text-muted text-base leading-relaxed">{t('exp2Description')}</p>
                  </FlexCol>
                </FlexRow>
              </SlideUp>
            </FlexCol>

            {/* Education column */}
            <FlexCol className="flex-1 items-center gap-y-4">
              <h2 className="mb-6 text-4xl font-semibold">{t('education')}</h2>

              <SlideUp delay={0.2}>
                <FlexRow className="border-border bg-background/70 w-full gap-x-6 rounded-2xl border p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <FlexCol className="flex-1 gap-y-1">
                    <p className="text-primary text-xl font-bold">{t('edu3Title')}</p>
                    <p className="text-accent text-base font-semibold">{t('edu3School')}</p>
                    <FlexRow className="text-muted mt-1 mb-3 flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
                      <span>
                        <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                        {t('edu3Date')}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                        {t('edu3Location')}
                      </span>
                    </FlexRow>
                    <p className="text-muted text-base leading-relaxed">{t('edu3Description')}</p>
                  </FlexCol>
                </FlexRow>
              </SlideUp>

              <SlideUp delay={0.3}>
                <FlexRow className="border-border bg-background/70 w-full gap-x-6 rounded-2xl border p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <FlexCol className="flex-1 gap-y-1">
                    <p className="text-primary text-xl font-bold">{t('edu2Title')}</p>
                    <p className="text-accent text-base font-semibold">{t('edu2School')}</p>
                    <FlexRow className="text-muted mt-1 mb-3 flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
                      <span>
                        <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                        {t('edu2Date')}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                        {t('edu2Location')}
                      </span>
                    </FlexRow>
                    <p className="text-muted text-base leading-relaxed">{t('edu2Description')}</p>
                  </FlexCol>
                </FlexRow>
              </SlideUp>

              <SlideUp delay={0.4}>
                <FlexRow className="border-border bg-background/70 w-full gap-x-6 rounded-2xl border p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)]">
                  <FlexCol className="flex-1 gap-y-1">
                    <p className="text-primary text-xl font-bold">{t('edu1Title')}</p>
                    <p className="text-accent text-base font-semibold">{t('edu1School')}</p>
                    <FlexRow className="text-muted mt-1 mb-3 flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
                      <span>
                        <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                        {t('edu1Date')}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                        {t('edu1Location')}
                      </span>
                    </FlexRow>
                    <p className="text-muted text-base leading-relaxed">{t('edu1Description')}</p>
                  </FlexCol>
                </FlexRow>
              </SlideUp>
            </FlexCol>
          </div>
        </section>

        {/* ── Footer ── */}
        <section className="bg-background border-primary border-t-2">
          <FlexCol className="w-full items-center gap-y-6 p-10">
            <p className="text-xl font-semibold">
              {t('builtBy')} <span className="text-gradient font-bold">Rafael Cavalinhos</span>
            </p>
            <FlexRow className="gap-x-4">
              {[
                {
                  hover: 'Github',
                  icon: faGithub,
                  onClick: () => window.open('https://github.com/rafaelcavalinhos', '_blank'),
                },
                {
                  hover: 'LinkedIn',
                  icon: faLinkedin,
                  onClick: () =>
                    window.open(
                      'https://www.linkedin.com/in/rafael-cavalinhos-39937624a',
                      '_blank',
                    ),
                },
                {
                  hover: t('email'),
                  icon: faEnvelope,
                  onClick: () => (window.location.href = 'mailto:rafaelcavalinhos2002@gmail.com'),
                },
                {
                  hover: t('resume'),
                  icon: faFileLines,
                  onClick: () =>
                    window.open(
                      locale === 'pt' ? '/cv-rafaelcavalinhos.pdf' : '/cv-rafaelcavalinhos-en.pdf',
                      '_blank',
                    ),
                },
              ].map((b, i) => (
                <FlexCol
                  key={`footer-social-${i}`}
                  className="group bg-accent border-border relative h-10 w-10 cursor-pointer items-center justify-center rounded-full border-3 text-xl text-white transition hover:scale-115"
                  onClick={b.onClick}
                >
                  <FontAwesomeIcon
                    icon={b.icon}
                    className="transition duration-300 ease-in-out group-hover:scale-120"
                  />
                  <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="bg-accent relative block rounded-md px-2 py-1 text-sm whitespace-nowrap shadow-md">
                      {b.hover}
                      <span className="bg-accent absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 shadow-md" />
                    </span>
                  </div>
                </FlexCol>
              ))}
            </FlexRow>
          </FlexCol>
        </section>
      </main>
    </>
  );
};

export default Index;
