import { SlideUp } from '@/components/utils/animations';
import { FlexCol, FlexRow } from '@/components/utils/flex';
import {
  faArrowUpRightFromSquare,
  faUsers,
  faUser,
  faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faItchIo } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState, useRef, MutableRefObject } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURED = {
  title: 'Axon',
  subtitle: 'Business Resource Management Platform',
  description:
    'A complete ERP platform built solo — manage tools, consumables, human resources and optimise company workflows end-to-end. Designed, developed and deployed entirely alone.',
  url: 'https://getaxon.pt',
  tags: ['Solo Project', 'Live'],
  tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Fastify', 'Docker'],
  image: '/projects/saas1.jpg',
  accent: '#6366f1',
};

const PROFESSIONAL = [
  {
    title: 'Território Participado',
    subtitle: 'Civic Participation Web Platform',
    description:
      'A professional internship project at Albatroz Digital. A live, deployed platform for civic participation and territory management used by real organisations.',
    url: 'https://territorioparticipado.pt',
    tags: ['Internship', 'Team Project', 'Live'],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    accent: '#10b981',
  },
  {
    title: 'Internship Mobile Games',
    subtitle: 'Bee Engineering — Game Prototypes',
    description:
      'Six mobile game prototypes developed at Bee Engineering as advertising demonstrations. Handled core gameplay, UI flow, animations, audio and level design across rapid prototyping cycles.',
    url: 'https://rafael-cavalinhos.itch.io/estgio-bee-engeneering',
    tags: ['Internship', 'Team Project'],
    tech: ['Unity', 'C#'],
    videos: [
      '/projects/beach-rolling.mp4',
      '/projects/spooky-hunt.mp4',
      '/projects/brawl-fighters.mp4',
      '/projects/wave-racer.mp4',
      '/projects/feng-shui.mp4',
      '/projects/flames-out.mp4',
    ],
    accent: '#f59e0b',
  },
];

const GAMES = [
  {
    title: "Press 'em",
    description:
      'Defeat robots and solve puzzles by grabbing crates and pressing buttons to complete the levels.',
    url: 'https://rafael-cavalinhos.itch.io/press-em',
    tags: ['College Project'],
    tech: ['Unity', 'C#', 'Aseprite'],
    images: ['/projects/press-em1.png', '/projects/press-em2.png', '/projects/press-em3.png'],
  },
  {
    title: 'Castaway',
    description:
      'Survive days and nights on a deserted island, fight enemies and gather resources to escape.',
    url: 'https://rafael-cavalinhos.itch.io/castaway',
    tags: ['College Project'],
    tech: ['Unity', 'C#', 'Aseprite'],
    images: ['/projects/castaway1.png', '/projects/castaway2.png', '/projects/castaway3.png'],
  },
  {
    title: 'Factory Dealings',
    description:
      'An arcade game — give items to injured robots before they explode. Fast-paced and chaotic.',
    url: 'https://rafael-cavalinhos.itch.io/factory-dealings',
    tags: ['College Project', 'Game Jam'],
    tech: ['Unity', 'C#', 'Aseprite'],
    images: [
      '/projects/factory-dealings1.png',
      '/projects/factory-dealings2.png',
      '/projects/factory-dealings3.png',
    ],
  },
  {
    title: 'Snake Game',
    description: 'A classic 2D Snake game made for fun and published on itch.io.',
    url: 'https://rafael-cavalinhos.itch.io/snake-game',
    tags: ['Hobby'],
    tech: ['Unity', 'C#', 'Aseprite'],
    images: ['/projects/snake-game1.png', '/projects/snake-game2.png', '/projects/snake-game3.png'],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

type Project = {
  title: string;
  subtitle?: string;
  description: string;
  url: string;
  tags: string[];
  tech: string[];
  image?: string;
  images?: string[];
  videos?: string[];
  accent?: string;
};

function Tag({ label }: { label: string }) {
  const colors: Record<string, string> = {
    'Solo Project': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    Live: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Internship: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Team Project': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    'College Project': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Game Jam': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    Hobby: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${colors[label] ?? 'border-white/20 bg-white/10 text-white/60'}`}
    >
      {label}
    </span>
  );
}

function TechPill({ name }: { name: string }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
      {name}
    </span>
  );
}

function MediaCarousel({ images = [], videos = false }: { images?: string[]; videos?: boolean }) {
  const [index, setIndex] = useState(0);
  const items = images;
  if (!items.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
      {videos ? (
        <video
          key={items[index]}
          src={items[index]}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={items[index]}
          alt=""
          className="h-full w-full object-cover transition duration-300"
        />
      )}

      {items.length > 1 && (
        <>
          {/* Prev / Next */}
          <button
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-xs text-white/80 transition hover:bg-black/70"
          >
            ‹
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-xs text-white/80 transition hover:bg-black/70"
          >
            ›
          </button>
          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition duration-500 hover:border-white/20 hover:bg-white/8">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full opacity-20 blur-3xl transition duration-700 group-hover:opacity-30"
        style={{ background: project.accent }}
      />

      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center">
        {/* Left — text */}
        <div className="flex flex-col gap-4 lg:w-[45%]">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">{project.title}</h3>
            <p className="mt-1 text-sm font-medium" style={{ color: project.accent }}>
              {project.subtitle}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-white/60">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <TechPill key={t} name={t} />
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white/15"
          >
            Visit site <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
          </a>
        </div>

        {/* Right — image */}
        <div className="lg:w-[55%]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-xl border border-white/10 object-cover shadow-2xl transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm text-white/20">
              Screenshot coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Professional card ────────────────────────────────────────────────────────

function ProfessionalCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition duration-500 hover:border-white/20 hover:bg-white/8">
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-15 blur-3xl transition duration-700 group-hover:opacity-25"
        style={{ background: project.accent }}
      />

      {/* Media */}
      {(project.images?.length || project.videos?.length) && (
        <div className="p-4 pb-0">
          <MediaCarousel images={project.videos ?? project.images} videos={!!project.videos} />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="mt-0.5 text-xs font-medium" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-white/60">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <TechPill key={t} name={t} />
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:scale-105 hover:bg-white/15"
        >
          {project.videos ? (
            <>
              <FontAwesomeIcon icon={faItchIo} /> View on itch.io
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" /> Visit site
            </>
          )}
        </a>
      </div>
    </div>
  );
}

// ─── Game card ────────────────────────────────────────────────────────────────

function GameCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <SlideUp delay={delay}>
      <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition duration-300 hover:scale-[1.02] hover:border-white/20">
        <MediaCarousel images={project.images} />

        <div className="flex flex-col gap-2 p-4">
          <div className="flex flex-wrap gap-1">
            {project.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <h3 className="font-bold text-white">{project.title}</h3>
          <p className="text-xs leading-relaxed text-white/50">{project.description}</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <TechPill key={t} name={t} />
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
          >
            <FontAwesomeIcon icon={faItchIo} /> itch.io
          </a>
        </div>
      </div>
    </SlideUp>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/30 uppercase">
        <FontAwesomeIcon icon={icon} />
        {children}
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ProjectSection({
  sectionRefs,
}: {
  sectionRefs: MutableRefObject<Record<string, HTMLElement | null>>;
}) {
  const t = useTranslations();
  return (
    <section
      id="projects"
      ref={(el) => {
        sectionRefs.current['projects'] = el;
      }}
      className="border-primary relative z-10 w-full bg-gray-900 px-16 py-20"
    >
      <SlideUp>
        <h2 className="mb-16 text-4xl font-semibold text-white">{t('projects')}</h2>
      </SlideUp>

      {/* ── Featured ── */}
      <div className="mb-14">
        <SlideUp delay={0.05}>
          <SectionLabel icon={faUser}>Solo Project</SectionLabel>
        </SlideUp>
        <SlideUp delay={0.1}>
          <FeaturedCard project={FEATURED} />
        </SlideUp>
      </div>

      {/* ── Professional ── */}
      <div className="mb-14">
        <SlideUp delay={0.05}>
          <SectionLabel icon={faUsers}>Professional Work</SectionLabel>
        </SlideUp>
        <SlideUp delay={0.1}>
          <div className="flex gap-6">
            {PROFESSIONAL.map((p) => (
              <ProfessionalCard key={p.title} project={p} />
            ))}
          </div>
        </SlideUp>
      </div>

      {/* ── Games ── */}
      <div>
        <SlideUp delay={0.05}>
          <SectionLabel icon={faGamepad}>Games</SectionLabel>
        </SlideUp>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {GAMES.map((g, i) => (
            <GameCard key={g.title} project={g} delay={0.05 * (i + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
}
