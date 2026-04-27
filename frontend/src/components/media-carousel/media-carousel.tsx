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
  const [paused, setPaused] = useState(false);
  const items = images;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  if (!items.length) return null;

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (items.length <= 1 || paused) return;

    startAutoPlay();
    return () => stopAutoPlay();
  }, [items.length, paused]);

  const goTo = (i: number) => {
    setIndex(i);
    startAutoPlay();
  };

  const prev = () => goTo((index - 1 + items.length) % items.length);
  const next = () => goTo((index + 1) % items.length);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {items.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 overflow-hidden rounded-xl transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {videos ? (
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img src={src} alt="" className="h-full w-full object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="border-border bg-accent group hover:bg-accent/80 absolute top-1/2 left-2 h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full border-2 text-xs text-white/90 transition hover:scale-110"
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-base transition group-hover:scale-120"
            ></FontAwesomeIcon>
          </button>

          <button
            onClick={next}
            className="border-border bg-accent group hover:bg-accent/80 absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full border-2 text-xs text-white/90 transition hover:scale-110"
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-base transition group-hover:scale-120"
            ></FontAwesomeIcon>
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
