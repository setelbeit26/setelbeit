import { useEffect, useRef, useState } from 'react';
import aboutImage from '@/assets/about-portrait.jpg';
import logo from '@/assets/logo.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-1/3 h-full bg-gradient-to-l from-secondary/50 to-transparent`} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Logo and Title */}
        <div className={`flex flex-col items-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <img 
            src={logo} 
            alt="Set El Beit Logo" 
            className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-lg mb-4"
          />
          <span className={`font-body text-accent uppercase tracking-widest text-sm font-semibold ${isRTL ? 'font-arabic' : ''}`}>
            {t('about.label')}
          </span>
          <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl text-foreground mt-4 text-center leading-tight ${isRTL ? 'font-arabic' : ''}`}>
            {t('about.title1')}
            <span className="block text-olive italic">{t('about.title2')}</span>
          </h2>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-12' : '-translate-x-12'}`
            } ${isRTL ? 'lg:order-2' : ''}`}
          >
            <div className="relative">
              {/* Decorative Frame */}
              <div className={`absolute -top-3 md:-top-4 ${isRTL ? '-right-3 md:-right-4' : '-left-3 md:-left-4'} w-full h-full border-2 border-olive/30 rounded-sm`} />
              <div className={`absolute -bottom-3 md:-bottom-4 ${isRTL ? '-left-3 md:-left-4' : '-right-3 md:-right-4'} w-full h-full border-2 border-terracotta/30 rounded-sm`} />
              
              <img
                src={aboutImage}
                alt="Chef and CEO of Set El Beit Catering"
                className="relative z-10 w-full h-auto rounded-sm shadow-elevated object-cover aspect-[4/3]"
              />
              
              {/* Quote Badge */}
              <div className={`absolute -bottom-4 md:-bottom-6 ${isRTL ? '-left-2 md:-left-6' : '-right-2 md:-right-6'} z-20 bg-primary text-primary-foreground p-4 md:p-6 rounded-sm shadow-warm max-w-[200px] md:max-w-xs`}>
                <span className="font-arabic text-lg md:text-2xl block mb-1 md:mb-2">{t('about.quote')}</span>
                <span className="font-body text-xs md:text-sm italic opacity-90">"{t('about.quote')}"</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 mt-12 lg:mt-0 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? '-translate-x-12' : 'translate-x-12'}`
            } ${isRTL ? 'lg:order-1' : ''}`}
          >
            <div className={`space-y-6 md:space-y-8 ${isRTL ? 'text-right' : ''}`}>
              {/* Section 1 */}
              <div>
                <h3 className={`font-display text-xl md:text-2xl text-olive mb-2 md:mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('about.section1.title')}
                </h3>
                <p className={`font-body text-muted-foreground leading-relaxed text-sm md:text-base ${isRTL ? 'font-arabic' : ''}`}>
                  {t('about.section1.text')}
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className={`font-display text-xl md:text-2xl text-olive mb-2 md:mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('about.section2.title')}
                </h3>
                <p className={`font-body text-muted-foreground leading-relaxed text-sm md:text-base ${isRTL ? 'font-arabic' : ''}`}>
                  {t('about.section2.text')}
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className={`font-display text-xl md:text-2xl text-olive mb-2 md:mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('about.section3.title')}
                </h3>
                <p className={`font-body text-muted-foreground leading-relaxed text-sm md:text-base ${isRTL ? 'font-arabic' : ''}`}>
                  {t('about.section3.text')}
                </p>
              </div>
            </div>

            {/* Signature */}
            <div className={`mt-8 md:mt-10 flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 md:w-16 h-0.5 bg-terracotta" />
              <div className={isRTL ? 'text-right' : ''}>
                <span className="font-display text-base md:text-lg text-foreground block">Set El Beit</span>
                <span className="font-body text-xs md:text-sm text-muted-foreground">{t('about.est')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
