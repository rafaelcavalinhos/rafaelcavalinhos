import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MediaCarousel } from '../media-carousel/media-carousel';
import { SlideUp } from '../utils/animations';
import { faItchIo } from '@fortawesome/free-brands-svg-icons';
import { FlexRow } from '../utils/flex';

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

export function GameCard({
  project,
  delay,
  seeOn,
}: {
  project: Project;
  delay: number;
  seeOn: string;
}) {
  return (
    <SlideUp delay={delay}>
      <div className="border-border bg-surface text-primary flex flex-col overflow-hidden rounded-xl border p-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <MediaCarousel images={project.images} />

        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-bold">{project.title}</h3>
          <p className="text-muted text-xs leading-relaxed">{project.description}</p>

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
