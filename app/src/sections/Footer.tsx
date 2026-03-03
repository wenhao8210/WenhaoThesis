import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Mail, BookOpen, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer background fade in
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content columns animation
      const columns = contentRef.current?.querySelectorAll('.footer-column');
      if (columns) {
        columns.forEach((column, index) => {
          gsap.fromTo(column,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.2 + index * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }

      // Footer bottom animation
      const footerBottom = footerRef.current?.querySelector('.footer-bottom');
      if (footerBottom) {
        gsap.fromTo(footerBottom,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            delay: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    {
      name: '小红书',
      url: 'https://www.xiaohongshu.com/user/profile/60b4584400000000010051c0',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/wenhao8210',
      icon: <ExternalLink className="w-4 h-4" />
    }
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black text-white py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12"
        >
          {/* Brand Column */}
          <div className="footer-column">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-white" />
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                MLA2 Thesis Review Wenhao
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Smarter, more efficient landscape design
            </p>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h4
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:wenhaowang0821@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">wenhaowang0821@gmail.com</span>
              </a>
              <a
                href="https://51jobsnail.chat/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span>Other demo: 51jobsnail.chat</span>
              </a>
            </div>
          </div>

          {/* Social Column */}
          <div className="footer-column">
            <h4
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Follow
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.icon}
                  <span className="text-sm relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm text-center">
            © 2026 Wenhao Wang
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
