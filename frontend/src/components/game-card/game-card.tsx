import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MediaCarousel } from '../media-carousel/media-carousel';
import { SlideUp } from '../utils/animations';
import { faItchIo } from '@fortawesome/free-brands-svg-icons';
import { FlexRow } from '../utils/flex';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Project = {
  title: string;
  subtitle?: string;
  description: string;
  url: string;
  tags: string[];
  image?: string;
  images?: string[];
  videos?: string[];
  accent?: string;
};

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
    const size = 25;

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

export function GameCard({
  project,
  delay,
  seeOn,
}: {
  project: Project;
  delay: number;
  seeOn: string;
}) {
  const tagColors = {
    college: 'bg-orange-300 border-orange-400',
    gameJam: 'bg-indigo-300 border-indigo-400',
    hobby: 'bg-green-300 border-green-400',
  };

  const t = useTranslations();
  return (
    <SlideUp delay={delay}>
      <div className="border-border bg-background text-primary flex flex-col overflow-hidden rounded-xl border p-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <MediaCarousel images={project.images} />

        <FlexRow className="gap-1 px-2 pt-4">
          {project.tags.map((tag, i) => (
            <FlexRow
              key={`tag-${i}`}
              className={`text-secondary items-center rounded-full border px-2 text-xs ${tagColors[tag as keyof typeof tagColors]}`}
            >
              {t(tag)}
            </FlexRow>
          ))}
        </FlexRow>

        <div className="flex flex-col gap-2 p-2">
          <h3 className="font-bold">{project.title}</h3>
          <p className="text-muted text-xs leading-relaxed">{project.description}</p>
          <FlexRow className="gap-1">
            {renderSkillIcons([
              { width: 25, height: 25, name: 'unity.webp', hover: 'Unity' },
              { width: 25, height: 25, name: 'csharp.svg', hover: 'C#' },
              { width: 25, height: 25, name: 'aseprite.svg', hover: 'Aseprite' },
            ])}
          </FlexRow>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border group bg-accent text-secondary mt-4 w-min rounded-lg border-2 px-2 text-base font-semibold whitespace-nowrap transition hover:scale-110 focus:outline-none"
          >
            <FlexRow className="items-center transition group-hover:scale-115">
              <FontAwesomeIcon icon={faItchIo} className="text-xs" />
              &nbsp;{`${seeOn} itch.io`}
            </FlexRow>
          </a>
        </div>
      </div>
    </SlideUp>
  );
}
