import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, MessageCircle, BookOpen, ExternalLink } from 'lucide-react';

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
      url: 'https://www.xiaohongshu.com/user/profile/65e96cf7000000000500ddcd',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      name: 'B站',
      url: 'https://space.bilibili.com/3546642233953230',
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
              让景观设计更智能、更高效
            </p>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h4
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              联系我们
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">微信：</span>
                  <span className="text-white text-sm">codescape</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-gray-400 text-sm">公众号：</span>
                  <span className="text-white text-sm">codescape</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Column */}
          <div className="footer-column">
            <h4
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              关注我们
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 codescape.com All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://beian.miit.gov.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                粤ICP备2026005821号-1
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
