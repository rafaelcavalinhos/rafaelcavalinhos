import { FlexCol } from '@/components/utils/flex';
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

  useEffect(() => {
    const btn = buttonRefs.current[active];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPillStyle({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
    });
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as NavKey);
          }
        }
      },
      { threshold: 1 },
    );
    for (const key of NAV_KEYS) {
      const el = sectionRefs.current[key];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (key: NavKey) => {
    setActive(key);
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
    sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-slate-900 text-slate-100">
      {/* Nav */}
      <div
        ref={navRef}
        className="fixed top-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-x-1 rounded-full bg-slate-900/60 p-1 shadow-[0_0_0_1px_rgba(148,163,184,0.12),0_2px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
      >
        <span
          className="pointer-events-none absolute top-1 h-[calc(100%-8px)] rounded-full bg-slate-700/80 transition-all duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
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
              active === key ? 'text-slate-100' : 'text-muted hover:text-slate-200'
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
        className="flex h-screen flex-col items-center justify-center gap-y-4"
      >
        <Image
          src="https://2wcolulh7c.ufs.sh/f/lQW7uGAXRWdDJB5cB8YGVOI8R9jNAEBUm7lq2duLhwcW3oCn"
          alt="guy"
          width={196}
          height={196}
        />
        <FlexCol className="items-center text-center text-5xl font-semibold">
          <p>{t('heroTitle1')}</p>
          <p>
            {t('heroTitle2')} <span className="text-gradient font-bold">Rafael Cavalinhos</span>
          </p>
          <p>{t('heroTitle3')}</p>
        </FlexCol>
      </div>

      {/* About */}
      <section
        id="about"
        ref={(el) => {
          sectionRefs.current['about'] = el;
        }}
        className="text-muted flex h-screen items-center justify-center text-2xl"
      >
        About
      </section>

      {/* Projects */}
      <section
        id="projects"
        ref={(el) => {
          sectionRefs.current['projects'] = el;
        }}
        className="text-muted flex h-screen items-center justify-center text-2xl"
      >
        Projects
      </section>

      {/* Experience */}
      <section
        id="experience"
        ref={(el) => {
          sectionRefs.current['experience'] = el;
        }}
        className="text-muted flex h-screen items-center justify-center text-2xl"
      >
        Experience
      </section>

      {/* Education */}
      <section
        id="education"
        ref={(el) => {
          sectionRefs.current['education'] = el;
        }}
        className="text-muted flex h-screen items-center justify-center text-2xl"
      >
        Education
      </section>
    </main>
  );
};

export default Index;
