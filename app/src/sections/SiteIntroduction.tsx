import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  Droplets,
  Unlink,
  Brain,
} from 'lucide-react';
import '../Presentation.css';

interface SiteIntroductionProps {
  onClose: () => void;
}

const totalSlides = 6;

const SiteIntroduction = ({ onClose }: SiteIntroductionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPrototypeVideo, setShowPrototypeVideo] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const goToSlide = (next: number) => {
    const useTransition = (currentSlide === 2 && next === 3) || (currentSlide === 3 && next === 2);
    if (useTransition && typeof document !== 'undefined' && 'startViewTransition' in document) {
      const doc = document as Document & { startViewTransition: (cb: () => Promise<void>) => void };
      doc.startViewTransition(() => {
        setCurrentSlide(next);
        return new Promise((resolve) => setTimeout(resolve, 0));
      });
    } else {
      setCurrentSlide(next);
    }
  };

  const nextSlide = () => {
    const next = currentSlide + 1;
    if (next >= totalSlides) return;
    goToSlide(next);
  };

  const prevSlide = () => {
    const next = currentSlide - 1;
    if (next < 0) return;
    goToSlide(next);
  };

  return (
    <div className={`presentation-wrapper${currentSlide === 5 ? ' slide-is-prototype' : ''}`}>
      {currentSlide === 0 && <Slide1 />}
      {currentSlide === 1 && <Slide2 />}
      {currentSlide === 2 && <Slide3 />}
      {currentSlide === 3 && <Slide4Derivation />}
      {currentSlide === 4 && <Slide4 />}
      {currentSlide === 5 && (
        <Slide5 onPlayVideo={() => setShowPrototypeVideo(true)} />
      )}

      {/* Video overlay: top-level so always on top */}
      {showPrototypeVideo && (
        <div className="prototype-video-overlay" onClick={() => setShowPrototypeVideo(false)}>
          <div className="prototype-video-wrap" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="prototype-video-close"
              onClick={() => setShowPrototypeVideo(false)}
              aria-label="Close video"
            >
              ×
            </button>
            <video src="/prototype1.mp4" controls autoPlay className="prototype-video">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Left/right zones: hover shows cursor, click navigates */}
      <div
        className="slide-nav-zone slide-nav-prev"
        onClick={currentSlide > 0 ? prevSlide : undefined}
        style={{ cursor: currentSlide > 0 ? 'url(/cursor-prev.svg) 8 16, auto' : 'default' }}
        aria-label="Previous slide"
      />
      <div
        className="slide-nav-zone slide-nav-next"
        onClick={currentSlide < totalSlides - 1 ? nextSlide : undefined}
        style={{ cursor: currentSlide < totalSlides - 1 ? 'url(/cursor-next.svg) 24 16, auto' : 'default' }}
        aria-label="Next slide"
      />

      <button
        type="button"
        className="close-btn-top"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="controls">
        <span className="slide-indicator">
          0{currentSlide + 1} / 0{totalSlides}
        </span>
      </div>
    </div>
  );
};

/* --- Slide 1: Evolution of Digital Sketching --- */
const Slide1 = () => (
  <div className="slide-container slide-evolution">
    <div className="brand-tag">WANG Wenhao // MLA 2 Thesis Review</div>
    <div className="grid-bg" />
    <div className="glow-orb" style={{ bottom: '-300px', right: '-200px' }} />

    <div className="content-area">
      <h2 className="slide-title text-center uppercase tracking-tight mb-6 sm:mb-8 text-white whitespace-nowrap">
        Evolution of Digital Sketching
      </h2>
      <p className="subtitle text-center">Competitive Analysis & Evolution Limits</p>

      <div className="evolution-three-cols evolution-cols-aligned">
        <div className="evolution-card">
          <h3 className="evolution-card-title">Procreate</h3>
          <div className="evolution-card-img-wrap">
            <img src="/procreate.png" alt="Procreate" />
          </div>
          <div className="evolution-card-desc">
            <div className="evolution-desc-block">
              <p className="desc-label">Progress</p>
              <ul>
                <li>Fluid brushwork and digital scale; intuitive 2D sketching.</li>
                <li>Widely adopted for concept and illustration.</li>
              </ul>
            </div>
            <div className="evolution-desc-block">
              <p className="desc-label">Limitations</p>
            <ul>
              <li><span className="highlight">No construction-ready 3D geometry</span>; remains “digital paper.”</li>
            </ul>
            </div>
          </div>
        </div>

        <div className="evolution-card">
          <h3 className="evolution-card-title">Morpholio</h3>
          <div className="evolution-card-img-wrap">
            <img src="/Morpholio.jpg" alt="Morpholio" />
          </div>
          <div className="evolution-card-desc">
            <div className="evolution-desc-block">
              <p className="desc-label">Progress</p>
              <ul>
                <li>Strong flat sketching and scale tools for design presentation.</li>
              </ul>
            </div>
            <div className="evolution-desc-block">
              <p className="desc-label">Limitations</p>
              <ul>
                <li><span className="highlight">Cannot produce 3D geometry</span>; disconnected from modelling pipeline.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="evolution-card">
          <h3 className="evolution-card-title">Feather 3D</h3>
          <div className="evolution-card-img-wrap">
            <img src="/Feather3D.jpg" alt="Feather 3D" />
          </div>
          <div className="evolution-card-desc">
            <div className="evolution-desc-block">
              <p className="desc-label">Progress</p>
              <ul>
                <li>3D curve drawing in space; direct 3D input.</li>
              </ul>
            </div>
            <div className="evolution-desc-block">
              <p className="desc-label">Limitations</p>
            <ul>
              <li><span className="highlight">“Floating geometry” without landscape semantics</span> (terrain, structures).</li>
              <li>Workflow breaks; manual re-modelling required in Rhino.</li>
            </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="evolution-summary">
        <h3>Pain Points</h3>
        <p>
          The biggest inefficiency in the industry comes from incompatible data structures (Interoperability Gap) between sketching tools and modelling software,
          <span className="highlight">leading to destructive and repetitive remodeling</span>.
        </p>
      </div>
    </div>
  </div>
);

/* --- Slide 2: The Gap & Lossy Translation --- */
const Slide2 = () => (
  <div className="slide-container">
    <div className="brand-tag">WANG Wenhao // MLA 2 Thesis Review</div>
    <div className="grid-bg" />
    <div className="glow-orb" style={{ top: '-200px', left: '-200px' }} />

    <div className="content-area max-w-4xl">
      <h2 className="slide-title text-center uppercase tracking-tight mb-6 sm:mb-8 text-white whitespace-nowrap">
        The Gap & Lossy Translation
      </h2>
      <p className="subtitle text-center">Pain Points: Information Loss in Digital Translation</p>

      <blockquote className="mb-8 pl-5 border-l-2 border-white/25 text-white/90 text-lg sm:text-xl leading-relaxed italic text-body">
        “In transport, the line is not a trace of movement but a point-to-point connector. … It has no internal texture or density. … It is not a record of a journey.”
        <cite className="block mt-3 not-italic text-white/60 text-base">— Tim Ingold (2016)</cite>
      </blockquote>

      <div className="mb-8 w-full rounded-xl overflow-hidden">
        <img src="/Sketch.png" alt="Sketch" className="w-full h-auto object-cover" />
      </div>

      <div className="feature-list">
        <div className="feature-item">
          <div className="feature-icon">
            <Droplets className="w-4 h-4" />
          </div>
          <div className="feature-text">
            <h3>Time & Ambiguity</h3>
            <p>
              CAD forces static “hard lines,” so designers lose temporal ambiguity early on and cannot express growth or change intuitively.
            </p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <Unlink className="w-4 h-4" />
          </div>
          <div className="feature-text">
            <h3>Broken Data Links</h3>
            <p>
              Digital modelling treats lines as point-to-point geometry only; brush texture and intent are lost when moving from sketch to model.
            </p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <Brain className="w-4 h-4" />
          </div>
          <div className="feature-text">
            <h3>Tool Switching</h3>
            <p>
              Designers constantly switch between creative sketching and rational checks (area, slope, codes), which breaks the flow of thinking.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* --- Slide 3: DERIVATION --- */
const Slide3 = () => (
  <div className="slide-container slide-derivation">
    <div className="brand-tag">WANG Wenhao // MLA 2 Thesis Review</div>
    <div className="grid-bg" />
    <div className="glow-orb" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

    <div className="content-area derivation-content">
      <h2 className="slide-title derivation-title">DERIVATION</h2>

      <div className="derivation-stack">
        <section className="derivation-section">
          <h3 className="derivation-heading derivation-morph derivation-morph-brush">Brush</h3>
          <p className="derivation-citation">Gryaditskaya, Y., et al. (2019) — OpenSketch: A Richly-Annotated Dataset of Product Design Sketches. (ACM SIGGRAPH)</p>
          <p className="derivation-quote">
            Analyzing <strong>stroke attributes</strong> such as pressure, speed, and timestamp allows us to distinguish between &apos;exploratory lines&apos; (rough, fast) and &apos;defining lines&apos; (slow, heavy). The digital stroke must <strong>carry this meta-data</strong> to interpret design intent.
          </p>
        </section>
        <section className="derivation-section">
          <h3 className="derivation-heading derivation-morph derivation-morph-scale">Scale</h3>
          <p className="derivation-citation">Stanislas Chaillou (2019) — AI & Architecture: Towards a New Approach.</p>
          <p className="derivation-quote">
            CAD&apos;s infinite zoom causes a loss of <strong>embodied perception of size and proportion</strong>. A fixed-scale digital canvas (e.g. 1:50, 1:20) restores the designer&apos;s sense of physical boundary.
          </p>
        </section>
        <section className="derivation-section">
          <h3 className="derivation-heading derivation-morph derivation-morph-3d">3D info</h3>
          <p className="derivation-citation">James Gain et al. (2009) — Terrain Sketching. (SIGGRAPH Asia)</p>
          <p className="derivation-quote">
            Designing terrain via contours is tedious and unintuitive. A &apos;Sparse Sketching&apos; approach, where the <strong>user defines only key features</strong> (peaks, ridgelines, and silhouette curves), allows the algorithm to interpolate the rest of the surface realistically.
          </p>
        </section>
        <section className="derivation-section">
          <h3 className="derivation-heading derivation-morph derivation-morph-ide">IDE</h3>
          <p className="derivation-citation">Randy Deutsch (2019) — Superusers: Design Technology Specialists and the Future of Practice.</p>
          <p className="derivation-quote">
            The industry&apos;s greatest inefficiency is the &apos;Interoperability Gap&apos;. An Integrated Design Environment (IDE) where sketching and modeling <strong>share the same data structure prevents the destructive &apos;re-modeling&apos; process.</strong>
          </p>
        </section>
      </div>
    </div>
  </div>
);

/* --- Slide 4: DERIVATION 转译 — same vertical stack + spacing as Slide 3 --- */
const Slide4Derivation = () => (
  <div className="slide-container slide-derivation slide-derivation-translated">
    <div className="brand-tag">WANG Wenhao // MLA 2 Thesis Review</div>
    <div className="grid-bg" />
    <div className="glow-orb" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

    <div className="content-area derivation-content">
      <h2 className="slide-title derivation-title">DERIVATION</h2>

      <div className="derivation-stack">
        <section className="derivation-section">
          <h3 className="derivation-heading derivation-morph derivation-morph-brush">Brush</h3>
          <ul className="derivation-bullets">
            <li>Thick Data Recording (pressure / semantics / velocity / time)</li>
            <li>Layer management</li>
          </ul>
        </section>
        <section className="derivation-section">
          <h3 className="derivation-heading derivation-morph derivation-morph-scale">Scale</h3>
          <ul className="derivation-bullets">
            <li>No Infinite Zoom, but 1:50, 1:20…</li>
            <li>Real-time Analytics (Length, Area, Slope, etc.)</li>
          </ul>
        </section>
        <section className="derivation-section">
          <h3 className="derivation-heading derivation-morph derivation-morph-3d">3D info</h3>
          <ul className="derivation-bullets">
            <li>Gestural Topography (Fragmentary Intuition)</li>
          </ul>
        </section>
        <section className="derivation-section">
          <h3 className="derivation-heading-wrap derivation-heading-ide">
            <span className="derivation-heading derivation-morph derivation-morph-ide">IDE</span>
            <span className="derivation-heading-sub">(Integrated Design Environment)</span>
          </h3>
          <ul className="derivation-bullets">
            <li>Rhino UI</li>
            <li>Vector Workflow</li>
            <li>GH Backend</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
);

/* --- Slide 5: Testbed — 沿用之前的双图 + 文案风格 --- */
const Slide4 = () => (
  <div className="slide-container">
    <div className="brand-tag">WANG Wenhao // MLA 2 Thesis Review</div>

    <div className="content-area slide-testbed">
      <h2 className="slide-title text-center uppercase tracking-tight mb-6 sm:mb-8 text-white whitespace-nowrap">
        THE TESTBED: CLEMENTI WOODS
      </h2>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch w-full lg:h-[52vh] xl:h-[56vh]">
        <div className="flex-1 min-h-[35vh] lg:min-h-0 lg:h-full bg-gray-800 overflow-hidden rounded-sm flex items-center justify-center">
          <img
            src="/image01.png"
            alt="Clementi Woods Park"
            className="testbed-img-left"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'w-full h-full flex items-center justify-center text-gray-500';
              fallback.textContent = 'image01.png';
              e.currentTarget.parentElement?.appendChild(fallback);
            }}
          />
        </div>
        <div className="w-full lg:w-[260px] xl:w-[300px] flex-shrink-0 min-h-[24vh] lg:min-h-0 lg:h-full flex items-center justify-center overflow-hidden rounded-sm bg-gray-800">
          <img
            src="/image02.png"
            alt="Clementi Woods site plan"
            className="testbed-img-right"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      <div className="w-full mt-6 sm:mt-8 space-y-4 text-body leading-relaxed">
        <section>
          <h3 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
            Validation: Complexity at Scale
          </h3>
          <p>Testing Ground: Clementi Woods Park (High-density terrain / 25m drop).</p>
          <p>
            Metric: <span className="highlight">75%</span> of site geometry generated natively from sketches.
          </p>
          <p>Performance: 10× faster design iteration cycle.</p>
          <p className="pt-3 border-t border-white/20 mt-4">
            <strong className="text-white">The Metaphor 神笔马良</strong>: “The Magic Brush” — Transforming intuitive sketching into live 3D environments.
          </p>
        </section>
      </div>
    </div>
  </div>
);

/* --- Slide 6: PROTOTYPE 1.0 --- */
const Slide5 = ({ onPlayVideo }: { onPlayVideo: () => void }) => (
  <div className="slide-container">
    <div className="brand-tag">WANG Wenhao // MLA 2 Thesis Review</div>
    <div className="grid-bg" />
    <div className="glow-orb" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

    <div className="content-area prototype-content">
      <h2 className="slide-title text-center uppercase tracking-tight mb-6 sm:mb-8 text-white whitespace-nowrap">
        PROTOTYPE 1.0
      </h2>

      <div
        className="prototype-image-wrap"
        onClick={onPlayVideo}
        onKeyDown={(e) => e.key === 'Enter' && onPlayVideo()}
        role="button"
        tabIndex={0}
        aria-label="Play prototype video"
      >
        <img src="/prototype1.0.png" alt="Prototype 1.0" className="w-full h-auto object-contain" />
      </div>

      <div className="prototype-limitations">
        <h3 className="prototype-limitations-title">Limitations of 1.0</h3>

        <div className="prototype-limitations-item">
          <h4 className="prototype-limitations-head">1. Performance Bottleneck: High Latency & Rendering Lag</h4>
          <ul>
            <li><strong>Computational Overload:</strong> The plugin must record and re-process every geometric data point (control points, coordinates) of Rhino curves to display them on the custom canvas.</li>
            <li><strong>Background Density:</strong> Heavy reference data, such as complex site contours, causes severe lag, making fluid, real-time sketching impossible.</li>
          </ul>
        </div>

        <div className="prototype-limitations-item">
          <h4 className="prototype-limitations-head">2. Technical Restrictions: Python GUI Rendering Limits</h4>
          <ul>
            <li><strong>Front-end Efficiency:</strong> Python&apos;s GUI libraries struggle with high-performance vector rendering, leading to jittery zooming and panning.</li>
            <li><strong>Feature Gaps:</strong> Significant difficulty in implementing advanced UI interactions, such as image opacity adjustment or dynamic viewport capturing for reference backgrounds.</li>
          </ul>
        </div>

        <div className="prototype-limitations-item">
          <h4 className="prototype-limitations-head">3. Development Complexity: Maintenance & Stability Issues</h4>
          <ul>
            <li><strong>Reinventing the Wheel:</strong> Excessive development effort is spent recreating core Rhino features (panning, rotating, and zooming) from scratch.</li>
            <li><strong>Fragile Architecture:</strong> With over 3,000 lines of code, the system has become highly coupled; minor updates often lead to critical failures (&quot;keeps breaking&quot;).</li>
          </ul>
        </div>

        <div className="prototype-limitations-item">
          <h4 className="prototype-limitations-head">4. Hardware Incompatibility: Input Limitations</h4>
          <ul>
            <li><strong>Pressure Sensitivity Loss:</strong> Current custom UI fails to capture Apple Pencil pressure data via Sidecar, stripping the sketch of its artistic and professional nuance.</li>
            <li><strong>Input Fragmentation:</strong> The separation from the native Rhino environment prevents the use of optimized multi-touch gestures and tablet-specific drivers.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default SiteIntroduction;
