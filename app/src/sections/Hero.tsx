import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onSiteIntroClick?: () => void;
  onGetStarted?: () => void;
}

const Hero = ({ onSiteIntroClick, onGetStarted }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const displayTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const floatingShapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.display-text-char', { opacity: 0, rotateX: 90 });
      gsap.set('.subtitle-text', { opacity: 0, filter: 'blur(10px)' });
      gsap.set('.cta-btn', { opacity: 0, scale: 0 });
      gsap.set('.floating-shape', { opacity: 0, scale: 0 });
      gsap.set('.brand-logo', { opacity: 0, y: -30 });

      // Timeline
      const tl = gsap.timeline({ delay: 0.2 });

      // Brand logo
      tl.to('.brand-logo', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'expo.out'
      });

      // Display text animation
      tl.to('.display-text-char', {
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'expo.out'
      }, '-=0.4');

      // Subtitle blur reveal
      tl.to('.subtitle-text', {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');

      // CTA buttons
      tl.to('.cta-btn', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, '-=0.2');

      // Floating shapes
      tl.to('.floating-shape', {
        opacity: 0.6,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out'
      }, '-=0.5');

      // Scroll indicator
      tl.to(scrollIndicatorRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.3');

      // Floating shapes continuous animation
      gsap.to('.floating-shape', {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        rotation: 'random(-15, 15)',
        duration: 'random(4, 6)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.5,
          from: 'random'
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const displayLine1 = 'ANALOGUE INTENT';
  const displayLine2 = 'DIGITAL OUTPUT';
  const subtitleText = 'Rhino-based hand-drawn modeling workflow';

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: '#e8e8e8'
      }}
    >
      {/* Background video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          src="/front.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.4, filter: 'grayscale(1) brightness(0.7) contrast(1.35)' }}
          autoPlay
          muted
          loop
          playsInline
          onLoadedMetadata={(e) => { e.currentTarget.playbackRate = 0.75; }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Floating decorative shapes */}
      <div ref={floatingShapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Circle */}
        <div
          className="floating-shape absolute w-24 h-24 md:w-32 md:h-32 rounded-full"
          style={{
            background: 'rgba(192, 236, 237, 0.4)',
            top: '15%',
            right: '10%'
          }}
        />
        {/* Triangle */}
        <div
          className="floating-shape absolute w-0 h-0"
          style={{
            borderLeft: '40px solid transparent',
            borderRight: '40px solid transparent',
            borderBottom: '70px solid rgba(242, 193, 241, 0.4)',
            top: '60%',
            right: '15%'
          }}
        />
        {/* Hexagon */}
        <div
          className="floating-shape absolute w-16 h-16 md:w-20 md:h-20"
          style={{
            background: 'rgba(244, 210, 171, 0.4)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            top: '25%',
            left: '8%'
          }}
        />
        {/* Small circles */}
        <div
          className="floating-shape absolute w-8 h-8 rounded-full"
          style={{
            background: 'rgba(214, 223, 255, 0.5)',
            bottom: '25%',
            left: '15%'
          }}
        />
        <div
          className="floating-shape absolute w-12 h-12 rounded-full"
          style={{
            background: 'rgba(214, 210, 232, 0.4)',
            bottom: '35%',
            right: '25%'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="brand-logo flex items-center justify-center gap-2 mb-8">
          <Sparkles className="w-6 h-6 text-black" />
          <span className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            MLA2 Thesis Review Wenhao
          </span>
        </div>

        {/* Display Text */}
        <div
          ref={displayTextRef}
          className="mb-6 flex flex-col items-center"
          style={{ perspective: '1000px' }}
        >
          <span
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black tracking-wider block text-center"
            style={{ fontFamily: 'Montserrat, sans-serif', whiteSpace: 'nowrap' }}
          >
            {displayLine1.split('').map((char, index) => (
              <span
                key={`l1-${index}`}
                className="display-text-char inline-block"
                style={{
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                  transformStyle: 'preserve-3d'
                }}
              >
                {char}
              </span>
            ))}
          </span>
          <span
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black tracking-wider block text-center"
            style={{ fontFamily: 'Montserrat, sans-serif', whiteSpace: 'nowrap' }}
          >
            {displayLine2.split('').map((char, index) => (
              <span
                key={`l2-${index}`}
                className="display-text-char inline-block"
                style={{
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                  transformStyle: 'preserve-3d'
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="subtitle-text text-lg sm:text-xl md:text-2xl text-black/80 mb-10 tracking-widest"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {subtitleText}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="cta-btn btn-primary text-base md:text-lg px-8 py-4 text-center border-0 cursor-pointer"
            onClick={() => onGetStarted?.()}
          >
            Get Started
          </button>
          <button
            type="button"
            className="cta-btn btn-secondary text-base md:text-lg px-8 py-4"
            onClick={() => onSiteIntroClick?.()}
          >
            Background
          </button>
        </div>
      </div>

      {/* Scroll Indicator — 点击滚动到下一部分 #tools */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-black/60 cursor-pointer"
        style={{ opacity: 0 }}
      >
        <button
          type="button"
          className="flex flex-col items-center border-0 bg-transparent p-0 cursor-pointer text-inherit"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#tools')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-sm mb-2 tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Scroll Down
          </span>
          <ArrowDown className="w-5 h-5 animate-bounce-slow" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
