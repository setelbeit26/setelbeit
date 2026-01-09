import { Instagram, Phone, MessageCircle, Heart } from 'lucide-react';
import logo from '@/assets/logo.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, isRTL, language } = useLanguage();

  const quickLinks = language === 'en' 
    ? ['Our Story', 'Cuisine', 'Services', 'Gallery', 'Contact']
    : ['قصتنا', 'أطباقنا', 'خدماتنا', 'معرض الصور', 'تواصل معنا'];

  const linkHrefs = ['about', 'cuisine', 'services', 'gallery', 'contact'];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className={`grid md:grid-cols-3 gap-12 mb-12 ${isRTL ? 'text-right' : ''}`}>
          {/* Brand */}
          <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
            <div className={`mb-4 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <img 
                src={logo} 
                alt="Set El Beit Catering | ستّ البيت" 
                className="h-16 w-16 rounded-full"
              />
              <div className={isRTL ? 'text-right' : ''}>
                <span className="font-arabic text-2xl block text-gold">ستّ البيت</span>
                <span className="font-display text-sm tracking-widest uppercase text-primary-foreground/70">
                  Set El Beit
                </span>
              </div>
            </div>
            <p className={`font-body text-sm text-primary-foreground/70 leading-relaxed max-w-xs ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-display text-lg mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.quicklinks')}
            </h4>
            <nav className="space-y-2">
              {quickLinks.map((link, index) => (
                <a
                  key={link}
                  href={`#${linkHrefs[index]}`}
                  className={`block font-body text-sm text-primary-foreground/70 hover:text-gold transition-colors ${isRTL ? 'font-arabic' : ''}`}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className={`font-display text-lg mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.connect')}
            </h4>
            <div className={`flex gap-4 mb-6 ${isRTL ? 'justify-end' : ''}`}>
              <a
                href="https://www.instagram.com/set.elbeit_kitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-sm flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@mona.set.el_beit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-sm flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/96176031146"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-sm flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="tel:+96176031146"
                className="w-10 h-10 bg-primary-foreground/10 rounded-sm flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
            <p className={`font-body text-sm text-primary-foreground/70 ${isRTL ? 'font-arabic' : ''}`}>
              {t('footer.available')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className={`font-body text-sm text-primary-foreground/50 ${isRTL ? 'font-arabic' : ''}`}>
            © {currentYear} Set El Beit Catering. {t('footer.rights')}
          </p>
          <p className="font-body text-sm text-primary-foreground/50 flex items-center gap-1">
            Dark_side.84 <Heart className="w-4 h-4 text-terracotta fill-terracotta" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
