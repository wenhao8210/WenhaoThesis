import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Background', href: '#background', action: 'openBackground' as const },
  { label: 'Features', href: '#features' },
  { label: 'Tools Preview', href: '#tools' }
];

interface NavigationProps {
  onOpenBackground?: () => void;
  onGetStarted?: () => void;
}

const Navigation = ({ onOpenBackground, onGetStarted }: NavigationProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: 'expo.out' }
    );
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { href: string; action?: string }) => {
    e.preventDefault();
    if (item.action === 'openBackground' && onOpenBackground) {
      onOpenBackground();
    } else {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
        style={{ opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, { href: '#hero' })}
              className="flex items-center gap-2 group"
            >
              <Sparkles className={`w-5 h-5 transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-black'}`} />
              <span
                className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-black'}`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                MLA2 Thesis Review Wenhao
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isScrolled ? 'text-gray-700 hover:text-black' : 'text-black/80 hover:text-black'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                type="button"
                className="btn-primary text-sm px-5 py-2 inline-block border-0 cursor-pointer"
                onClick={() => {
                  onGetStarted?.();
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-black' : 'text-black'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-black' : 'text-black'}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="text-2xl font-bold text-black"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            className="btn-primary text-lg px-8 py-3 mt-4 inline-block border-0 cursor-pointer"
            onClick={() => {
              onGetStarted?.();
              setIsMobileMenuOpen(false);
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
