import { useEffect, useRef, useState } from 'react';
import dishHummus from '@/assets/dish-hummus.jpg';
import dishTabbouleh from '@/assets/dish-tabbouleh.jpg';
import dishShawarma from '@/assets/dish-shawarma.jpg';
import dishBaklava from '@/assets/dish-baklava.jpg';
import dishKofta from '@/assets/dish-kofta.jpg';
import dishBabaganoush from '@/assets/dish-babaganoush.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const CuisineShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLanguage();

  const dishes = [
    {
      nameKey: 'cuisine.hummus',
      categoryKey: 'cuisine.mezze',
      descKey: 'cuisine.hummus.desc',
      image: dishHummus,
    },
    {
      nameKey: 'cuisine.tabbouleh',
      categoryKey: 'cuisine.mezze',
      descKey: 'cuisine.tabbouleh.desc',
      image: dishTabbouleh,
    },
    {
      nameKey: 'cuisine.babaganoush',
      categoryKey: 'cuisine.mezze',
      descKey: 'cuisine.babaganoush.desc',
      image: dishBabaganoush,
    },
    {
      nameKey: 'cuisine.shawarma',
      categoryKey: 'cuisine.main',
      descKey: 'cuisine.shawarma.desc',
      image: dishShawarma,
    },
    {
      nameKey: 'cuisine.kofta',
      categoryKey: 'cuisine.main',
      descKey: 'cuisine.kofta.desc',
      image: dishKofta,
    },
    {
      nameKey: 'cuisine.baklava',
      categoryKey: 'cuisine.dessert',
      descKey: 'cuisine.baklava.desc',
      image: dishBaklava,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cuisine"
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary relative"
    >
      {/* Decorative Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`font-body text-accent uppercase tracking-widest text-sm font-semibold ${isRTL ? 'font-arabic' : ''}`}>
            {t('cuisine.label')}
          </span>
          
          <h2 className={`font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('cuisine.title1')}
            <span className="italic text-olive"> {t('cuisine.title2')}</span>
          </h2>
          
          <p className={`font-body text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t('cuisine.description')}
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <div
              key={dish.nameKey}
              className={`group bg-card rounded-sm overflow-hidden shadow-warm hover-lift transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dish.image}
                  alt={t(dish.nameKey)}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <span className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-primary/90 text-primary-foreground px-3 py-1 text-xs font-body uppercase tracking-wider rounded-sm ${isRTL ? 'font-arabic' : ''}`}>
                  {t(dish.categoryKey)}
                </span>
              </div>

              {/* Content */}
              <div className={`p-6 ${isRTL ? 'text-right' : ''}`}>
                <h3 className={`font-display text-xl text-card-foreground mb-2 group-hover:text-olive transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                  {t(dish.nameKey)}
                </h3>
                <p className={`font-body text-sm text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {t(dish.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className={`font-body text-muted-foreground mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t('cuisine.taste')}
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-3 bg-olive hover:bg-olive-light text-primary-foreground font-body font-semibold tracking-wide uppercase text-sm rounded-sm transition-all duration-300 shadow-warm hover:shadow-elevated ${isRTL ? 'font-arabic' : ''}`}
          >
            {t('cuisine.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CuisineShowcase;
