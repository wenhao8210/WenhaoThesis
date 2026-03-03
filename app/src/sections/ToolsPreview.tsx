import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ExternalLink, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type ToolCategory = 'PATH' | 'HARDSCAPE' | 'TOPO' | 'INFRASTRUCTURE' | 'WATER' | 'SHRUBS_AND_TREES';

interface ToolPreview {
  id: number;
  title: string;
  url?: string;
  video?: string;
  /** 为 true 时封面显示 Working In Progress，点击仍可打开 url */
  coverWIP?: boolean;
  /** 封面显示该秒数所在的帧（秒）；负数表示距结尾的秒数，如 -1 为最后一秒 */
  posterTime?: number;
  rotation: number;
  category: ToolCategory;
}

const CATEGORY_ORDER: ToolCategory[] = ['PATH', 'HARDSCAPE', 'TOPO', 'INFRASTRUCTURE', 'WATER', 'SHRUBS_AND_TREES'];

const CATEGORY_LABELS: Record<ToolCategory, string> = {
  PATH: 'PATH',
  HARDSCAPE: 'HARDSCAPE',
  TOPO: 'TOPO',
  INFRASTRUCTURE: 'INFRASTRUCTURE',
  WATER: 'WATER',
  SHRUBS_AND_TREES: 'SHRUBS & TREE'
};

const toolPreviews: ToolPreview[] = [
  // PATH — 3 videos
  { id: 1, title: 'Join Path', video: '/JoinPath.mp4', rotation: -1, category: 'PATH' },
  { id: 2, title: 'Ramp Gen', video: '/AdjustPath.mp4', rotation: 1, category: 'PATH' },
  { id: 3, title: 'Stair Gen', video: '/GenStairs.mp4', rotation: -2, category: 'PATH' },
  // HARDSCAPE — Splitscape 有视频；Paving 封面为 Working In Progress
  { id: 4, title: 'SplitScape', video: '/SplitScape.mp4', rotation: 0, category: 'HARDSCAPE' },
  { id: 7, title: 'Paving', rotation: 2, category: 'HARDSCAPE' },
  // TOPO
  { id: 9, title: 'SketchToTopo', video: '/SketchToTopo.mp4', posterTime: -1, rotation: 1, category: 'TOPO' },
  { id: 15, title: 'SketchToTopo2', video: '/SketchToTopo2.mp4', posterTime: -1, rotation: -1, category: 'TOPO' },
  // INFRASTRUCTURE — Seating、Retaining Wall 封面为 Working In Progress
  { id: 5, title: 'Seating', rotation: -3, category: 'INFRASTRUCTURE' },
  { id: 6, title: 'Retaining Wall', rotation: 0, category: 'INFRASTRUCTURE' },
  // WATER — 河道与 pond，封面 Working In Progress，点击跳转链接
  { id: 12, title: 'River & Pond', url: 'https://www.xiaohongshu.com/explore/69378b1e000000000d0352b5', coverWIP: true, rotation: 1, category: 'WATER' },
  // SHRUBS & TREE
  { id: 13, title: 'GenShrub', video: '/GenShrub.mp4', posterTime: -1, rotation: -1, category: 'SHRUBS_AND_TREES' },
  { id: 16, title: 'OrientTree', video: '/OrientTree.mp4', posterTime: -1, rotation: 1, category: 'SHRUBS_AND_TREES' },
];

const ToolsPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [videoModal, setVideoModal] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    if (videoModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [videoModal]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - letters coming together
      const titleChars = titleRef.current?.querySelectorAll('.title-char');
      if (titleChars) {
        gsap.fromTo(titleChars,
          { opacity: 0, x: () => gsap.utils.random(-100, 100) },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, filter: 'blur(8px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards flip animation
      const cards = gridRef.current?.querySelectorAll('.preview-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { opacity: 0, rotateY: 90 },
            {
              opacity: 1,
              rotateY: 0,
              duration: 0.5,
              delay: 0.4 + index * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          // Continuous floating animation
          gsap.to(card, {
            y: 'random(-5, 5)',
            duration: 'random(5, 7)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.3
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, entering: boolean) => {
    const card = e.currentTarget;
    if (entering) {
      gsap.to(card, {
        rotation: 0,
        scale: 1.08,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
        zIndex: 10,
        duration: 0.3,
        ease: 'expo.out'
      });
    } else {
      const index = parseInt(card.dataset.index || '0');
      const originalRotation = toolPreviews[index]?.rotation || 0;
      gsap.to(card, {
        rotation: originalRotation,
        scale: 1,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        zIndex: 1,
        duration: 0.3,
        ease: 'expo.out'
      });
    }
  };

  const titleText = 'Tools Preview';

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="section-title text-black mb-4"
          >
            {titleText.split('').map((char, index) => (
              <span
                key={index}
                className="title-char inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </h2>
          <p
            ref={subtitleRef}
            className="section-subtitle max-w-2xl mx-auto"
          >
            Solve 75% of the design through sketch—leave the rest to Grasshopper
          </p>
        </div>

        {/* CreateCommand — same size as Quick Demo, above it */}
        <div className="w-[80%] mx-auto mb-12 md:mb-16">
          <h3
            className="text-lg md:text-xl font-bold text-black mb-4 text-center"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            How to create a command?
          </h3>
          <div className="rounded-lg overflow-hidden bg-gray-900 shadow-lg">
            <video
              src="/CreateCommand.mp4"
              className="w-full aspect-video object-cover"
              controls
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                if (v.duration >= 32) v.currentTime = 32;
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Preview Cards by Category */}
        <div ref={gridRef} className="space-y-10 md:space-y-12">
          {CATEGORY_ORDER.map((cat) => {
            const items = toolPreviews.filter((t) => t.category === cat);
            if (items.length === 0) return null;
            const firstIndex = toolPreviews.indexOf(items[0]);
            return (
              <div key={cat}>
                <h3
                  className="text-lg md:text-xl font-bold text-black uppercase tracking-wider mb-4 md:mb-6"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {CATEGORY_LABELS[cat]}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {items.map((preview, i) => {
                    const globalIndex = firstIndex + i;
                    return (
                      <div
                        key={preview.id}
                        data-index={globalIndex}
                        className="preview-card relative bg-white rounded-lg overflow-hidden cursor-pointer group"
                        style={{
                          transform: `rotate(${preview.rotation}deg)`,
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                          transformOrigin: 'center center'
                        }}
                        onMouseEnter={(e) => handleCardHover(e, true)}
                        onMouseLeave={(e) => handleCardHover(e, false)}
                        onClick={() => {
                          if (preview.video) {
                            setVideoModal({ src: preview.video, title: preview.title });
                          } else if (preview.url) {
                            window.open(preview.url, '_blank', 'noopener,noreferrer');
                          }
                        }}
                      >
                        <div className="aspect-video relative flex items-center justify-center bg-gray-900">
                          {preview.video ? (
                            <video
                              src={preview.video}
                              className="w-full h-full object-cover"
                              muted
                              loop
                              playsInline
                              onLoadedData={(e) => {
                                const v = e.currentTarget;
                                const t = preview.posterTime;
                                if (t == null) return;
                                const sec = t >= 0 ? t : Math.max(0, v.duration + t);
                                v.currentTime = sec;
                              }}
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => {
                                const v = e.currentTarget;
                                v.pause();
                                const t = preview.posterTime;
                                if (t == null) v.currentTime = 0;
                                else v.currentTime = t >= 0 ? t : Math.max(0, v.duration + t);
                              }}
                            />
                          ) : preview.coverWIP ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                              <span
                                className="text-white/90 text-sm md:text-base font-medium px-3 text-center"
                                style={{ fontFamily: 'Montserrat, sans-serif' }}
                              >
                                Working In Progress
                              </span>
                            </div>
                          ) : preview.url ? (
                            <>
                              <div
                                className="absolute inset-0"
                                style={{
                                  background: `linear-gradient(135deg, ${
                                    ['#c0eced', '#f2c1f1', '#f4d2ab', '#d6dfff'][globalIndex % 4]
                                  } 0%, ${
                                    ['#c0ecd9', '#f1d2c4', '#f4d2ab', '#d6d2e8'][globalIndex % 4]
                                  } 100%)`
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                  style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
                                >
                                  <Play className="w-5 h-5 md:w-6 md:h-6 text-black ml-1" fill="black" />
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ExternalLink className="w-4 h-4 text-black/60" />
                              </div>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                              <span
                                className="text-white/90 text-sm md:text-base font-medium px-3 text-center"
                                style={{ fontFamily: 'Montserrat, sans-serif' }}
                              >
                                Working In Progress
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-3 md:p-4">
                          <p className="text-sm md:text-base font-medium text-black truncate">
                            {preview.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Quick Demo Showcase — below Shrubs & Tree */}
          <div className="w-[80%] mx-auto rounded-lg overflow-hidden bg-gray-900 shadow-lg">
            <video
              src="/QuickDemoShowcase/demo.mp4"
              poster="/QuickDemoShowcase/Cover.jpg"
              className="w-full aspect-video object-cover"
              controls
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Video modal: fullscreen */}
      {videoModal && (
        <div
          className="fixed inset-0 z-[200] flex flex-col bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="关闭"
        >
          <div className="flex items-center justify-between text-white p-4 flex-shrink-0">
            <span className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {videoModal.title}
            </span>
            <button
              type="button"
              onClick={() => setVideoModal(null)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="关闭"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center p-2">
            <video
              src={videoModal.src}
              className="max-w-full max-h-full w-full h-full object-contain"
              controls
              autoPlay
              playsInline
              onEnded={() => setVideoModal(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ToolsPreview;
