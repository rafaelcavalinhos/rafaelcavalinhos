import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

export function MediaCarousel({
  images = [],
  videos = false,
}: {
  images?: string[];
  videos?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const items = images;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Control video playback — only pause when out of view, never on hover
  useEffect(() => {
    if (!videos) return;
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === index && visible) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
        if (i !== index) vid.currentTime = 0;
      }
    });
  }, [index, visible, videos]);

  // For images: fixed interval. For videos: advance on 'ended' event.
  useEffect(() => {
    if (items.length <= 1) return;

    if (videos) {
      const vid = videoRefs.current[index];
      if (!vid) return;
      const onEnded = () => setIndex((i) => (i + 1) % items.length);
      vid.addEventListener('ended', onEnded);
      return () => vid.removeEventListener('ended', onEnded);
    } else {
      // Images: pause autoplay on hover
      if (hovered) return;
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % items.length);
      }, 4000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [items.length, videos, index, hovered]);

  const goTo = (i: number) => {
    setIndex(i);
  };

  const prev = () => goTo((index - 1 + items.length) % items.length);
  const next = () => goTo((index + 1) % items.length);

  if (!items.length) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-full w-full">
        {items.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 overflow-hidden rounded-xl transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            {videos ? (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={visible ? src : undefined}
                muted
                playsInline
                preload="none"
                className="h-full w-full object-cover"
              />
            ) : (
              <img src={src} alt="" className="h-full w-full object-cover" />
            )}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="border-border bg-accent group hover:bg-accent/80 absolute top-1/2 left-2 h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full border-2 text-xs text-white/90 transition hover:scale-110"
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-base transition group-hover:scale-120"
            />
          </button>
          <button
            onClick={next}
            className="border-border bg-accent group hover:bg-accent/80 absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full border-2 text-xs text-white/90 transition hover:scale-110"
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-base transition group-hover:scale-120"
            />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
