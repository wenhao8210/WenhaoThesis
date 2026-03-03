import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import SiteIntroduction from './sections/SiteIntroduction';
import Features from './sections/Features';
import ToolsPreview from './sections/ToolsPreview';
import Pricing from './sections/Pricing';
import Footer from './sections/Footer';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showSiteIntro, setShowSiteIntro] = useState(false);

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
    if (showSiteIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSiteIntro]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Navigation */}
      <Navigation onOpenBackground={() => setShowSiteIntro(true)} />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="hero">
          <Hero onSiteIntroClick={() => setShowSiteIntro(true)} />
        </section>

        {/* Features Section */}
        <section id="features">
          <Features />
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
    </div>
  );
}

export default App;
