import { useEffect, useRef, useState } from 'react';
import { Heart, Users, Sparkles, Calendar } from 'lucide-react';
import cateringEvent from '@/assets/catering-event.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: Users,
      titleKey: 'services.family',
      descKey: 'services.family.desc',
    },
    {
      icon: Heart,
      titleKey: 'services.weddings',
      descKey: 'services.weddings.desc',
    },
    {
      icon: Calendar,
      titleKey: 'services.corporate',
      descKey: 'services.corporate.desc',
    },
    {
      icon: Sparkles,
      titleKey: 'services.special',
      descKey: 'services.special.desc',
    },
  ];

  const features = [
    { labelKey: 'services.custom', valueKey: 'services.custom.value' },
    { labelKey: 'services.fresh', valueKey: 'services.fresh.value' },
    { labelKey: 'services.personal', valueKey: 'services.personal.value' },
  ];

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
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`font-body text-accent uppercase tracking-widest text-sm font-semibold ${isRTL ? 'font-arabic' : ''}`}>
            {t('services.label')}
          </span>
          
          <h2 className={`font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('services.title1')}
            <span className="italic text-olive"> {t('services.title2')}</span>
          </h2>
          
          <p className={`font-body text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t('services.description')}
          </p>
        </div>

        {/* Main Content */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${isRTL ? 'lg:order-2' : ''}`}
          >
            <img
              src={cateringEvent}
              alt="Elegant catering setup"
              className="w-full h-auto rounded-sm shadow-elevated"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent rounded-sm" />
            
            {/* Floating Badge */}
            <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} ${isRTL ? 'left-6' : 'right-6'} bg-background/95 backdrop-blur-sm p-6 rounded-sm shadow-warm`}>
              <span className="font-arabic text-2xl text-olive block mb-1">كل شي بالحب</span>
              <span className={`font-body text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>{t('services.badge')}</span>
            </div>
          </div>

          {/* Services List */}
          <div className={`space-y-6 ${isRTL ? 'lg:order-1' : ''}`}>
            {services.map((service, index) => (
              <div
                key={service.titleKey}
                className={`flex gap-5 p-6 bg-secondary/50 rounded-sm hover:bg-secondary transition-all duration-500 group ${
                  isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? '-translate-x-8' : 'translate-x-8'}`
                } ${isRTL ? 'flex-row-reverse' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-olive/10 rounded-sm flex items-center justify-center group-hover:bg-olive/20 transition-colors">
                    <service.icon className="w-6 h-6 text-olive" />
                  </div>
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className={`font-display text-xl text-foreground mb-2 group-hover:text-olive transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {t(service.titleKey)}
                  </h3>
                  <p className={`font-body text-sm text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                    {t(service.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid sm:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div
              key={feature.labelKey}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <span className={`font-display text-2xl text-olive block mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                {t(feature.labelKey)}
              </span>
              <span className={`font-body text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {t(feature.valueKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
