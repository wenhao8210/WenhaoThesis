import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Zap, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingPlan {
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  eduPrice: number;
  features: string[];
  badge?: string;
  badgeType?: 'recommended' | 'limited';
  cta: string;
  highlight?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Monthly',
    price: 39,
    period: '/month',
    eduPrice: 29,
    features: [
      'Full features',
      '30-day validity',
      'One device (transferable)',
      'Windows + Rhino 7.9 or above only'
    ],
    cta: 'Subscribe Now'
  },
  {
    name: 'Annual',
    price: 299,
    period: '/year',
    eduPrice: 249,
    features: [
      'Full features',
      'Exclusive learning resources',
      'Free updates for one year',
      'Professional support',
      'One device (transferable)',
      'Windows + Rhino 7.9 or above only'
    ],
    badge: 'Recommended',
    badgeType: 'recommended',
    cta: 'Subscribe Now',
    highlight: true
  },
  {
    name: 'Lifetime License',
    price: 499,
    originalPrice: 799,
    period: 'Limited time',
    eduPrice: 449,
    features: [
      'Full features, lifetime use',
      'Lifetime free updates',
      'One-on-one support',
      'One device (transferable)',
      'Windows + Rhino 7.9 or above only'
    ],
    badge: 'Limited',
    badgeType: 'limited',
    cta: 'Buy Now'
  }
];

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [animatedPrices, setAnimatedPrices] = useState<number[]>([0, 0, 0]);
  const [showJustKidding, setShowJustKidding] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, rotateX: -90 },
        {
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
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
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        cards.forEach((card, index) => {
          const directions = [
            { x: -80, rotateY: 20 },
            { y: 60, scale: 0.9 },
            { x: 80, rotateY: -20 }
          ];
          const dir = directions[index];

          gsap.fromTo(card,
            { opacity: 0, ...dir },
            {
              opacity: 1,
              x: 0,
              y: index === 1 ? -20 : 0,
              scale: index === 1 ? 1.05 : 1,
              rotateY: 0,
              duration: index === 1 ? 0.7 : 0.6,
              delay: 0.4 + index * 0.15,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
                onEnter: () => {
                  // Animate price counter
                  gsap.to({}, {
                    duration: 0.8,
                    delay: 0.3 + index * 0.15,
                    onUpdate: function() {
                      const progress = this.progress();
                      setAnimatedPrices(prev => {
                        const newPrices = [...prev];
                        newPrices[index] = Math.round(pricingPlans[index].price * progress);
                        return newPrices;
                      });
                    }
                  });
                }
              }
            }
          );
        });
      }

      // Features list animation
      const featureItems = cardsRef.current?.querySelectorAll('.feature-item');
      if (featureItems) {
        gsap.fromTo(featureItems,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
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

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, entering: boolean) => {
    const card = e.currentTarget;
    if (entering) {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        duration: 0.2,
        ease: 'power2.out'
      });
    } else {
      const index = parseInt(card.dataset.index || '0');
      gsap.to(card, {
        y: index === 1 ? -20 : 0,
        boxShadow: index === 1
          ? '0 12px 40px rgba(0, 0, 0, 0.15)'
          : '0 8px 30px rgba(0, 0, 0, 0.1)',
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full bg-white"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="section-title text-black mb-4"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Choose a Plan
          </h2>
          <p
            ref={subtitleRef}
            className="section-subtitle"
          >
            Limited-time offer · Early-bird benefits
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              data-index={index}
              className={`pricing-card price-card ${plan.highlight ? 'featured' : ''}`}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="flex justify-end mb-4">
                  <span
                    className={`badge ${plan.badgeType === 'recommended' ? 'badge-recommended' : 'badge-limited'} ${plan.badgeType === 'recommended' ? 'animate-pulse-slow' : 'animate-pulse'}`}
                  >
                    {plan.badgeType === 'recommended' && <Star className="w-3 h-3 inline mr-1" />}
                    {plan.badgeType === 'limited' && <Zap className="w-3 h-3 inline mr-1" />}
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3
                className="text-xl font-bold text-black mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline">
                  <span className="text-lg text-gray-500 mr-1">$</span>
                  <span
                    className="text-4xl md:text-5xl font-bold text-black"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {animatedPrices[index]}
                  </span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <p className="text-sm text-gray-400 line-through mt-1">
                    Was ${plan.originalPrice}
                  </p>
                )}
              </div>

              {/* Education Price */}
              <p className="text-sm text-gray-500 mb-6">
                Education discount ${plan.eduPrice}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="feature-item flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => setShowJustKidding(true)}
                className={`w-full py-3 px-6 rounded-md font-semibold transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'border-2 border-black text-black hover:bg-black hover:text-white'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Just kidding popup */}
      {showJustKidding && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowJustKidding(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Just kidding"
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowJustKidding(false)}
              className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <p
              className="text-2xl font-bold text-black mt-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Just kidding
            </p>
            <button
              type="button"
              onClick={() => setShowJustKidding(false)}
              className="mt-6 w-full py-2.5 px-4 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
