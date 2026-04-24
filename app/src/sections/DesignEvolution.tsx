import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const alwaysVisibleWorkflowRegions = [
  { clipPath: 'inset(0.8% 62.5% 90.8% 2.4%)' },
];

const workflowRegions = [
  { clipPath: 'inset(8.6% 67.1% 85.4% 3.0%)' },
  { clipPath: 'inset(15.0% 76.6% 49.9% 2.1%)' },
  { clipPath: 'inset(15.1% 52.5% 49.4% 24.2%)' },
  { clipPath: 'inset(14.6% 27.8% 48.6% 48.1%)' },
  { clipPath: 'inset(10.0% 0.0% 48.6% 71.8%)' },
  { clipPath: 'inset(53.4% 28.5% 4.6% 2.4%)' },
  { clipPath: 'inset(55.3% 1.8% 3.7% 71.7%)' },
];

const DesignEvolution = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const alwaysVisibleWorkflowRef = useRef<HTMLDivElement>(null);
  const workflowGroupRef = useRef<HTMLDivElement>(null);
  const workflowRegionRefs = useRef<(HTMLImageElement | null)[]>([]);
  const sketchRef = useRef<HTMLImageElement>(null);
  const modelRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      gsap.set(alwaysVisibleWorkflowRef.current, { opacity: 0 });
      gsap.set(workflowGroupRef.current, { opacity: 0 });
      workflowRegionRefs.current.forEach((region) => {
        if (!region) return;
        gsap.set(region, { opacity: 0 });
      });

      gsap.set(sketchRef.current, { opacity: 1 });
      gsap.set(modelRef.current, { opacity: 0 });

      const introTimeline = gsap.timeline({ paused: true });
      introTimeline.to(sketchRef.current, {
        opacity: 0,
        duration: 1.1,
        ease: 'power2.inOut',
      });
      introTimeline.to(
        modelRef.current,
        {
          opacity: 1,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        0,
      );

      let introDelayCall: gsap.core.Tween | null = null;
      let introPlayed = false;

      const scheduleIntroTransition = () => {
        if (introPlayed || introDelayCall) return;
        introDelayCall = gsap.delayedCall(3, () => {
          introPlayed = true;
          introTimeline.play();
          introDelayCall = null;
        });
      };

      const cancelIntroTransition = () => {
        if (!introDelayCall) return;
        introDelayCall.kill();
        introDelayCall = null;
      };

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: scheduleIntroTransition,
        onEnterBack: scheduleIntroTransition,
        onLeave: cancelIntroTransition,
        onLeaveBack: cancelIntroTransition,
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

      tl.to(
        modelRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.inOut',
        },
        0.38,
      );

      tl.to(
        alwaysVisibleWorkflowRef.current,
        {
          opacity: 1,
          duration: 0.16,
          ease: 'power2.inOut',
        },
        0.38,
      );

      tl.to(
        workflowGroupRef.current,
        {
          opacity: 1,
          duration: 0.16,
          ease: 'power2.inOut',
        },
        0.38,
      );

      workflowRegionRefs.current.forEach((region, index) => {
        if (!region) return;
        tl.to(
          region,
          {
            opacity: 1,
            duration: 0.085,
            ease: 'none',
          },
          0.44 + index * 0.08,
        );
      });

      tl.to({}, { duration: 0.1 }, 1.0);

      tl.to(
        alwaysVisibleWorkflowRef.current,
        {
          opacity: 1,
          duration: 0.01,
          ease: 'none',
        },
        1.0,
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[400vh] w-full"
      style={{ background: '#ffffff' }}
    >
      <div
        ref={containerRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ background: '#ffffff' }}
      >
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div
            ref={alwaysVisibleWorkflowRef}
            className="absolute w-[90%] h-[90%] flex items-center justify-center"
            style={{ zIndex: 0 }}
          >
            {alwaysVisibleWorkflowRegions.map((region, index) => (
              <img
                key={`workflow-always-visible-${index}`}
                src="/final3_Page_13.png"
                alt={`Workflow always visible region ${index + 1}`}
                className="absolute w-full h-full object-contain"
                style={{ clipPath: region.clipPath }}
              />
            ))}
          </div>

          <div
            ref={workflowGroupRef}
            className="absolute w-[90%] h-[90%] flex items-center justify-center"
            style={{ zIndex: 1 }}
          >
            {workflowRegions.map((region, index) => (
              <img
                key={`workflow-region-${index}`}
                ref={(el) => {
                  workflowRegionRefs.current[index] = el;
                }}
                src="/final3_Page_13.png"
                alt={`Workflow region ${index + 1}`}
                className="absolute w-full h-full object-contain"
                style={{ clipPath: region.clipPath }}
              />
            ))}
          </div>

          <div
            className="absolute w-[90%] h-[90%] flex items-center justify-center"
            style={{ zIndex: 2 }}
          >
            <img
              ref={sketchRef}
              src="/final3_Page_21.png"
              alt="Sketch"
              className="w-full h-full object-contain"
            />
          </div>

          <div
            className="absolute w-[90%] h-[90%] flex items-center justify-center"
            style={{ zIndex: 3 }}
          >
            <img
              ref={modelRef}
              src="/final3_Page_11.png"
              alt="Model"
              className="w-full h-full object-contain"
            />
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

export default DesignEvolution;
