import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import DesignEvolution from './sections/DesignEvolution';
import SiteIntroduction from './sections/SiteIntroduction';
import Features from './sections/Features';
import RequirementsWorkflow from './sections/RequirementsWorkflow';
import WorkflowStack from './sections/WorkflowStack';
import ToolsPreview from './sections/ToolsPreview';
import Pricing from './sections/Pricing';
import Footer from './sections/Footer';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showSiteIntro, setShowSiteIntro] = useState(false);
  const [showClip01, setShowClip01] = useState(false);

  useEffect(() => {
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (showSiteIntro || showClip01) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSiteIntro, showClip01]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Navigation */}
      <Navigation
        onOpenBackground={() => setShowSiteIntro(true)}
        onGetStarted={() => setShowClip01(true)}
      />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="hero">
          <Hero
            onSiteIntroClick={() => setShowSiteIntro(true)}
            onGetStarted={() => setShowClip01(true)}
          />
        </section>

        {/* Design Evolution Section */}
        <DesignEvolution />

        {/* Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* Requirements Workflow Section */}
        <section id="requirements-workflow">
          <RequirementsWorkflow />
        </section>

        {/* Workflow Stack Section */}
        <section id="workflow-stack">
          <WorkflowStack />
        </section>

        {/* Tools Preview Section */}
        <section id="tools">
          <ToolsPreview />
        </section>

        {/* Pricing Section */}
        <section id="pricing">
          <Pricing />
        </section>

        {/* Footer Section */}
        <section id="footer">
          <Footer />
        </section>
      </main>

      {/* Site Introduction overlay - only visible when opened from Hero */}
      {showSiteIntro && (
        <SiteIntroduction onClose={() => setShowSiteIntro(false)} />
      )}

      {showClip01 && (
        <div className="fixed inset-0 z-[101] bg-black">
          <button
            type="button"
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition-colors hover:bg-white/10"
            onClick={() => setShowClip01(false)}
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-0 overflow-hidden">
            <video
              src="/clip01.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              controls
              autoPlay
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
