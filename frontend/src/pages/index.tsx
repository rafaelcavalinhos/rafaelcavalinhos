import { FlexCol, FlexRow } from '@/components/utils/flex';
import { faGit, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';
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

const NAV_KEYS = ['home', 'about', 'projects', 'experience', 'education'] as const;
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

  return (
    <main className="text-primary bg-background relative">
      {/* Nav */}
      <div
        ref={navRef}
        className="bg-accent/50 border-background/30 fixed top-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-x-1 rounded-full border p-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
      >
        <span
          className="bg-accent/40 pointer-events-none absolute top-1 h-[calc(100%-8px)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
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
              active === key ? 'text-secondary' : 'text-primary hover:text-secondary'
            }`}
          >
            {t(key)}
          </button>
        ))}
      </div>

      {/* Home */}
      <div
        id="home"
        ref={(el: HTMLDivElement | null) => {
          sectionRefs.current['home'] = el;
        }}
        className="fixed top-40 left-0 z-0 flex h-screen w-full flex-col items-center justify-start bg-inherit px-100"
        style={{ transform: `scale(${heroScale})`, transformOrigin: 'top' }}
      >
        <FlexRow className="items-end pb-10">
          <Image
            src="https://2wcolulh7c.ufs.sh/f/lQW7uGAXRWdDJB5cB8YGVOI8R9jNAEBUm7lq2duLhwcW3oCn"
            alt="guy"
            width={248}
            height={248}
          />
          <FlexCol className="-translate-x-16 items-start text-5xl font-semibold whitespace-nowrap">
            <p>{t('heroTitle1')}</p>
            <p>
              {t('heroTitle2')} <span className="text-gradient font-bold">Rafael Cavalinhos</span>
            </p>
            <p>{t('heroTitle3')}</p>
          </FlexCol>
        </FlexRow>
        <FlexRow className="gap-x-8">
          {[
            {
              icon: faGithub,
              onClick: () => undefined,
            },
            {
              icon: faLinkedin,
              onClick: () => undefined,
            },
            {
              icon: faEnvelope,
              onClick: () => undefined,
            },
            {
              icon: faFileLines,
              onClick: () => undefined,
            },
          ].map((b, i) => {
            return (
              <FlexCol
                key={`social-button-${i}`}
                className="group bg-accent text-background border-border h-10 w-10 cursor-pointer items-center justify-center rounded-full border-3 text-xl transition hover:scale-115"
                onClick={b.onClick}
              >
                <FontAwesomeIcon
                  icon={b.icon}
                  className="transition duration-300 ease-in-out group-hover:scale-120"
                ></FontAwesomeIcon>
              </FlexCol>
            );
          })}
        </FlexRow>
      </div>

      {/* About */}
      <section
        id="about"
        ref={(el) => {
          sectionRefs.current['about'] = el;
        }}
        className="border-primary bg-surface relative z-10 mt-[80vh] flex h-screen justify-center border-y-4 py-10 text-2xl"
      >
        <h2 className="text-4xl font-semibold">{t('about')}</h2>
      </section>

      {/* Projects */}
      <section
        id="projects"
        ref={(el) => {
          sectionRefs.current['projects'] = el;
        }}
        className="flex h-screen items-center justify-center text-2xl"
      >
        Projects
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
