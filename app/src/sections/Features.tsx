import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, BarChart3, Trees } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  tools: string[];
  color: string;
}

const features: Feature[] = [
  {
    icon: <Box className="w-8 h-8" />,
    title: '即时建模',
    description: '从空间骨架线快速生成三维模型及二维平面CAD，提升工作效率值',
    tools: ['竖向构造工具', '台阶工具', '栈道工具', '倒角工具', '地形工具', '铺装工具'],
    color: '#c0eced'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: '实时分析',
    description: '内置汇水、土方分析等专业工具。实时反馈设计数据，提升设计科学性',
    tools: ['坡度分析与优化', '汇水分析', '土方分析', 'GIS分析'],
    color: '#f2c1f1'
  },
  {
    icon: <Trees className="w-8 h-8" />,
    title: '即刻散布',
    description: '智能散布算法，快速散布植物人物，提升场景丰富度',
    tools: ['花镜模拟', '风格地被', '乔灌木散布', '人物的散布'],
    color: '#f4d2ab'
  }
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, rotateX: -90, y: -50 },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.feature-card-wrapper');
      if (cards) {
        cards.forEach((card, index) => {
          const directions = [
            { x: -100, rotateY: 15 },
            { y: 80, rotateY: -10 },
            { x: 100, rotateY: -15 }
          ];
          const dir = directions[index];

          gsap.fromTo(card,
            { opacity: 0, ...dir },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotateY: 0,
              duration: 0.7,
              delay: 0.4 + index * 0.15,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }

      // Tools tags animation
      const toolTags = cardsRef.current?.querySelectorAll('.tool-tag');
      if (toolTags) {
        gsap.fromTo(toolTags,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full bg-white"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            ref={titleRef}
            className="section-title text-black mb-4"
            style={{ transformStyle: 'preserve-3d' }}
          >
            三大核心功能
          </h2>
          <p
            ref={subtitleRef}
            className="section-subtitle max-w-2xl mx-auto"
          >
            构建景观智能工作流，让设计思维回归"空间营造"
          </p>
        </div>

        {/* Feature Cards - aligned */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card-wrapper flex"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="feature-card h-full min-h-0 flex flex-col group cursor-pointer"
                style={{
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -10,
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                    duration: 0.3,
                    ease: 'power2.out'
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    duration: 0.3,
                    ease: 'power2.out'
                  });
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: feature.color }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl font-bold text-black mb-4"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                  {feature.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap mt-auto">
                  {feature.tools.map((tool) => (
                    <span
                      key={tool}
                      className="tool-tag tag text-gray-700"
                      style={{ background: `${feature.color}40` }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
