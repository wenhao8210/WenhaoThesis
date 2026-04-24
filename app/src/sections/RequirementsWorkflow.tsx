import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const workflowRegions = [
  { clipPath: 'polygon(7.1% 1.9%, 26.3% 10.2%, 30.1% 43.7%, 3.6% 47.4%)' },
  { clipPath: 'polygon(25.8% 6.7%, 65.7% 4.2%, 59.1% 26.0%, 29.6% 30.7%)' },
  { clipPath: 'polygon(52.9% 3.7%, 95.0% 5.0%, 95.9% 35.8%, 50.5% 35.3%)' },
  { clipPath: 'polygon(7.9% 42.1%, 43.0% 42.9%, 39.1% 70.7%, 6.9% 73.5%)' },
  { clipPath: 'polygon(42.0% 33.0%, 93.7% 34.3%, 95.1% 61.2%, 44.4% 61.3%)' },
  { clipPath: 'polygon(36.5% 62.3%, 96.4% 60.5%, 97.0% 98.5%, 35.4% 98.1%)' },
];

const EDITOR_ASPECT_RATIO = 4 / 3;

const RequirementsWorkflow = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const workflowGroupRef = useRef<HTMLDivElement>(null);
  const workflowRegionRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [frameSize, setFrameSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateFrameSize = () => {
      const rect = container.getBoundingClientRect();
      const maxWidth = rect.width * 0.95;
      const maxHeight = rect.height * 0.95;

      let width = maxWidth;
      let height = width / EDITOR_ASPECT_RATIO;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * EDITOR_ASPECT_RATIO;
      }

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
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container || !frameSize) return;

    const ctx = gsap.context(() => {
      gsap.set(workflowGroupRef.current, { opacity: 1 });
      workflowRegionRefs.current.forEach((region) => {
        if (!region) return;
        gsap.set(region, { opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: container,
          anticipatePin: 1,
        },
      });

      workflowRegionRefs.current.forEach((region, index) => {
        if (!region) return;
        tl.to(
          region,
          {
            opacity: 1,
            duration: 0.095,
            ease: 'none',
          },
          index * 0.1,
        );
      });

      tl.to({}, { duration: 0.12 }, 0.75);
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
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div
            ref={workflowGroupRef}
            className="absolute flex items-center justify-center"
            style={{ zIndex: 1 }}
          >
            <div
              className="relative"
              style={{
                width: frameSize ? `${frameSize.width}px` : '92%',
                height: frameSize ? `${frameSize.height}px` : '92%',
              }}
            >
              {workflowRegions.map((region, index) => (
                <img
                  key={`requirements-workflow-region-${index}`}
                  ref={(el) => {
                    workflowRegionRefs.current[index] = el;
                  }}
                  src="/4.png"
                  alt={`Requirements workflow region ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-contain"
                  style={{ clipPath: region.clipPath }}
                />
              ))}
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

export default RequirementsWorkflow;
