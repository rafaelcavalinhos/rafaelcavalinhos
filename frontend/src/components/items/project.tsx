import { FlexCol, FlexRow } from "@/components/utils/flex";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faArrowLeft, faArrowRight, faDownload, } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  images: string[];
  title: string;
  description: string;
  technologies: string[];
  downloadUrl: string;
  tags?: string[];
  videos?: boolean;
}

const Project = (props: Props) => {

  const { images, title, description, technologies, downloadUrl, tags, videos } = props;

  const [currentImage, setCurrentImage] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [locked, setLocked] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = useMemo(() => [images[images.length - 1], ...images, images[0]], [images]);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const nextImage = () => {
    if (locked) return;
    setLocked(true);
    setCurrentImage(i => i + 1);
  };

  const prevImage = () => {
    if (locked) return;
    setLocked(true);
    setCurrentImage(i => i - 1);
  };

  useEffect(() => {
    if (locked) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      nextImage();
    }, videos ? 15000 : (Math.random() * 2000 + 2000));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentImage, locked]);

  useEffect(() => {
    if (!videos) return;

    const activeIndex = currentImage;

    videoRefs.current.forEach((v, i) => {
      if (!v) return;

      if (i === activeIndex) {
        const playPromise = v.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
          });
        }
      } else {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {}
      }
    });
  }, [currentImage, videos]);

  return (<>

    <FlexCol className="w-[350px] border-4 border-color rounded-2xl overflow-hidden h-full foreground-color text-white hover:scale-102 transition duration-300"> {/*  */}

      <FlexCol className="relative">

        <FlexRow className="absolute z-10 gap-x-2 flex-wrap w-full justify-end p-2 gap-y-1">
          {tags?.map((tag, i) => (<>
            <div key={i} className="text-white text-sm font-semibold border-2 border-color foreground-color rounded-3xl px-2">{tag}</div>
          </>))}
        </FlexRow>

        <FlexRow className="absolute z-10 justify-between w-full px-2 text-2xl h-full items-center">
          <FontAwesomeIcon icon={faAngleLeft} className="hover:scale-125 transition cursor-pointer" onClick={prevImage}/>
          <FontAwesomeIcon icon={faAngleRight} className="hover:scale-125 transition cursor-pointer" onClick={nextImage}/>
        </FlexRow>
      
        <FlexRow
          className={animate ? "transition-transform duration-500" : ""}
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
          onTransitionEnd={() => {
            if (currentImage === images.length + 1) {
              setAnimate(false);
              requestAnimationFrame(() => {
                setCurrentImage(1);
                requestAnimationFrame(() => {
                  setAnimate(true);
                  setLocked(false);
                });
              });
              return;
            }

            if (currentImage === 0) {
              setAnimate(false);
              requestAnimationFrame(() => {
                setCurrentImage(images.length);
                requestAnimationFrame(() => {
                  setAnimate(true);
                  setLocked(false);
                });
              });
              return;
            }

            setLocked(false);
          
          }}
        >
          {slides.map((url, i) =>
            videos ? (
              <video
                key={i}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={url}
                className="object-cover"
                muted
                playsInline
                preload="auto"
              />
            ) : (
              <Image
                key={i}
                src={url}
                alt=""
                width={350}
                height={350}
                className="object-cover"
              />
            )
          )}
        </FlexRow>

      </FlexCol>

      <FlexCol className="p-4 gap-y-6 justify-between h-full pt-2">
        <FlexCol className="gap-y-0">
          <p style={{ animationDelay: `${Math.random() * 0.5}s` }} className="text-gradient-waves font-bold  text-2xl">{title}</p>
          <p className="">{description}</p>
        </FlexCol>

        <FlexCol className="gap-y-2">
          <FlexRow className="flex-wrap gap-x-2">
            { technologies.map((technologie, i) => (
              <div key={i} className="group hover:scale-120 transition duration-300 border-2 rounded-3xl py-0 px-2 border-gray-200 bg-white text-black font-semibold">
                <p className="group-hover:scale-115 transition duration-200">{technologie}</p>
              </div>
            ))}
          </FlexRow>

          <button onClick={() => window.open(`${downloadUrl}`, "_blank")} className="w-full font-semibold cursor-pointer group bg-inherit border-2 border-white text-white rounded-2xl text-base transition duration-200 hover:scale-105">
            <span className="inline-flex items-center transition duration-300 group-hover:scale-110">
                Download <FontAwesomeIcon icon={faDownload} />
            </span>
          </button>
        </FlexCol>

      </FlexCol>

    </FlexCol>
    

  </>);
}

export default Project;