import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonialsData = {
  en: [
    {
      name: 'Sarah M.',
      event: 'Wedding Reception',
      quote: "Set El Beit catered our wedding and it was absolutely magical. The mezze spread was like something out of a dream, and our guests couldn't stop raving about the kibbeh. It truly felt like having a Lebanese grandmother cooking for us.",
      rating: 5,
    },
    {
      name: 'Ahmad K.',
      event: 'Family Reunion',
      quote: "Growing up, I missed my Teta's cooking. Set El Beit brought back all those memories. The stuffed grape leaves tasted exactly like home. My mother was in tears — it was that authentic.",
      rating: 5,
    },
    {
      name: 'Jennifer L.',
      event: 'Corporate Event',
      quote: "We hired Set El Beit for our company's annual gala. The presentation was stunning, the flavors were incredible, and the personal attention to every detail made all the difference. Our clients were truly impressed.",
      rating: 5,
    },
  ],
  ar: [
    {
      name: 'سارة م.',
      event: 'حفل زفاف',
      quote: 'ستّ البيت قدمت لنا خدمة الضيافة في زفافنا وكانت رائعة حقاً. المزة كانت كالحلم، وضيوفنا لم يتوقفوا عن الثناء على الكبة. شعرنا حقاً كأن جدة لبنانية تطبخ لنا.',
      rating: 5,
    },
    {
      name: 'أحمد ك.',
      event: 'لقاء عائلي',
      quote: 'كنت أشتاق لطبخ تيتا. ستّ البيت أعادت لي كل تلك الذكريات. ورق العنب كان طعمه تماماً مثل البيت. أمي بكت من الفرحة — كان أصيلاً لهذه الدرجة.',
      rating: 5,
    },
    {
      name: 'جنيفر ل.',
      event: 'فعالية شركات',
      quote: 'استعنّا بستّ البيت لحفل شركتنا السنوي. التقديم كان مذهلاً، والنكهات لا تُصدق، والاهتمام الشخصي بكل تفصيل أحدث فرقاً كبيراً. عملاؤنا كانوا منبهرين حقاً.',
      rating: 5,
    },
  ],
};

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL, language } = useLanguage();

  const testimonials = testimonialsData[language];

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
      ref={sectionRef}
      className="py-24 md:py-32 bg-primary relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className={`absolute top-10 ${isRTL ? 'right-10' : 'left-10'} font-arabic text-9xl text-primary-foreground/5`}>
        شكراً
      </div>
      <div className={`absolute bottom-10 ${isRTL ? 'left-10' : 'right-10'} font-arabic text-9xl text-primary-foreground/5`}>
        حب
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`font-body text-gold uppercase tracking-widest text-sm font-semibold ${isRTL ? 'font-arabic' : ''}`}>
            {t('testimonials.label')}
          </span>
          
          <h2 className={`font-display text-4xl md:text-5xl text-primary-foreground mt-4 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('testimonials.title1')}
            <span className="italic text-gold-light"> {t('testimonials.title2')}</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-sm relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${isRTL ? 'text-right' : ''}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Quote Icon */}
              <Quote className={`w-10 h-10 text-gold/50 mb-4 ${isRTL ? 'scale-x-[-1]' : ''}`} />

              {/* Stars */}
              <div className={`flex gap-1 mb-4 ${isRTL ? 'justify-end' : ''}`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className={`font-body text-primary-foreground/90 leading-relaxed mb-6 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-primary-foreground/20 pt-4">
                <span className={`font-display text-lg text-primary-foreground block ${isRTL ? 'font-arabic' : ''}`}>
                  {testimonial.name}
                </span>
                <span className={`font-body text-sm text-gold ${isRTL ? 'font-arabic' : ''}`}>
                  {testimonial.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
