import { useEffect, useRef, useState } from 'react';
import dishHummus from '@/assets/dish-hummus.jpg';
import dishTabbouleh from '@/assets/dish-tabbouleh.jpg';
import dishShawarma from '@/assets/dish-shawarma.jpg';
import dishBaklava from '@/assets/dish-baklava.jpg';
import dishKofta from '@/assets/dish-kofta.jpg';
import dishBabaganoush from '@/assets/dish-babaganoush.jpg';
import dishGrapeleaves from '@/assets/dish-grapeleaves.jpg';
import cateringEvent from '@/assets/catering-event.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const images = [
  { src: cateringEvent, alt: 'Elegant event catering setup', span: 'col-span-2 row-span-2' },
  { src: dishHummus, alt: 'Creamy hummus with olive oil', span: '' },
  { src: dishTabbouleh, alt: 'Fresh tabbouleh salad', span: '' },
  { src: dishKofta, alt: 'Grilled lamb kofta', span: 'row-span-2' },
  { src: dishBaklava, alt: 'Golden baklava dessert', span: '' },
  { src: dishGrapeleaves, alt: 'Stuffed grape leaves', span: '' },
  { src: dishBabaganoush, alt: 'Smoky baba ganoush', span: '' },
  { src: dishShawarma, alt: 'Chicken shish tawook', span: '' },
];

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLanguage();

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
      id="gallery"
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary relative"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`font-body text-accent uppercase tracking-widest text-sm font-semibold ${isRTL ? 'font-arabic' : ''}`}>
            {t('gallery.label')}
          </span>
          
          <h2 className={`font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('gallery.title1')}
            <span className="italic text-olive"> {t('gallery.title2')}</span>
          </h2>
          
          <p className={`font-body text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t('gallery.description')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${image.span} ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ 
                transitionDuration: '700ms',
                transitionDelay: `${index * 100}ms`,
                transitionProperty: 'opacity, transform'
              }}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover min-h-[200px] image-zoom"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 flex items-center justify-center">
                <span className={`font-body text-sm text-cream opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest ${isRTL ? 'font-arabic' : ''}`}>
                  {t('gallery.view')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full animate-scale-in">
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-sm"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className={`absolute -top-12 ${isRTL ? 'left-0' : 'right-0'} text-cream font-body text-sm uppercase tracking-widest hover:text-accent transition-colors ${isRTL ? 'font-arabic' : ''}`}
            >
              {t('gallery.close')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
