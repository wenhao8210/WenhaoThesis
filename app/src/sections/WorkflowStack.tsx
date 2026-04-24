import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WorkflowStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);
  const [frameSize, setFrameSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imageAspectRatio) return;

    const updateFrameSize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width * 0.56;
      const height = width / imageAspectRatio;

      setFrameSize((current) => {
        if (
          current &&
          Math.abs(current.width - width) < 0.5 &&
          Math.abs(current.height - height) < 0.5
        ) {
          return current;
        }

        return { width, height };
      });
    };

    updateFrameSize();

    const observer = new ResizeObserver(() => {
      updateFrameSize();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [imageAspectRatio]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const imageTrack = imageTrackRef.current;
    if (!section || !container || !imageTrack || !frameSize) return;

    const ctx = gsap.context(() => {
      const viewportHeight = container.getBoundingClientRect().height;
      const travelDistance = Math.max(frameSize.height - viewportHeight, 0);

      gsap.set(imageTrack, { y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(travelDistance * 1.2, window.innerHeight * 2.2)}`,
          scrub: 1.2,
          pin: container,
          anticipatePin: 1,
        },
      });

      tl.to(imageTrack, {
        y: -travelDistance,
        duration: 1,
        ease: 'none',
      });
    }, section);

    return () => ctx.revert();
  }, [frameSize]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[320vh] w-full"
      style={{ background: '#ffffff' }}
    >
      <div
        ref={containerRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ background: '#ffffff' }}
      >
        <img
          src="/5.png"
          alt=""
          className="pointer-events-none absolute opacity-0"
          onLoad={(event) => {
            const { naturalWidth, naturalHeight } = event.currentTarget;
            if (naturalWidth && naturalHeight) {
              setImageAspectRatio(naturalWidth / naturalHeight);
            }
          }}
        />

        <div className="absolute inset-0 w-full h-full flex items-start justify-center pt-6 md:pt-8">
          <div
            className="absolute flex items-start justify-center"
            style={{ zIndex: 1 }}
          >
            <div
              ref={imageTrackRef}
              className="relative"
              style={{
                width: frameSize ? `${frameSize.width}px` : '100%',
                height: frameSize ? `${frameSize.height}px` : 'auto',
              }}
            >
              <img
                src="/5.png"
                alt="Workflow stack"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 text-center z-20">
          <p
            className="text-xs tracking-wider text-black/60 animate-pulse drop-shadow"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkflowStack;
