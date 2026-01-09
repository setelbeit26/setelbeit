import heroImage from '@/assets/hero-mezze.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t, isRTL } = useLanguage();

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lebanese mezze spread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/40 to-foreground/70" />
      </div>

      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 bg-pattern opacity-10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Arabic Decorative Element */}
          <div className="mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="font-arabic text-gold text-3xl md:text-4xl opacity-90">
              {t('hero.welcome')}
            </span>
          </div>

          <h1 
            className={`font-display text-4xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6 animate-fade-up ${isRTL ? 'font-arabic' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            {t('hero.headline')}
            <span className="block italic text-gold-light">{t('hero.headline2')}</span>
          </h1>

          <p 
            className={`font-body text-lg md:text-xl text-cream/90 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up ${isRTL ? 'font-arabic' : ''}`}
            style={{ animationDelay: '0.6s' }}
          >
            {t('hero.tagline')}
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
            style={{ animationDelay: '0.8s' }}
          >
            <button
              onClick={scrollToContact}
              className={`px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold tracking-wide uppercase text-sm rounded-sm transition-all duration-300 shadow-elevated hover:shadow-glow ${isRTL ? 'font-arabic' : ''}`}
            >
              {t('hero.cta1')}
            </button>
            <button
              onClick={() => document.querySelector('#cuisine')?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-4 border-2 border-cream/50 text-cream font-body font-semibold tracking-wide uppercase text-sm rounded-sm transition-all duration-300 hover:bg-cream/10 hover:border-cream ${isRTL ? 'font-arabic' : ''}`}
            >
              {t('hero.cta2')}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-warm">
        <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-cream/70 rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
