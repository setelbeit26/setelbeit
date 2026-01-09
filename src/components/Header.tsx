import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import logo from '@/assets/logo.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t('nav.story') },
    { href: '#cuisine', label: t('nav.cuisine') },
    { href: '#services', label: t('nav.services') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-warm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3"
        >
          <img 
            src={logo} 
            alt="Set El Beit Catering | ستّ البيت" 
            className={`transition-all duration-300 rounded-full ${
              isScrolled ? 'h-12 w-12' : 'h-16 w-16'
            }`}
          />
          <div className={`hidden sm:flex flex-col transition-colors duration-300 ${isRTL ? 'items-end' : 'items-start'}`}>
            <span className={`font-display text-sm tracking-wide ${
              isScrolled ? 'text-foreground' : 'text-cream'
            }`}>
              Set El Beit
            </span>
            <span className={`font-arabic text-lg ${
              isScrolled ? 'text-olive' : 'text-gold'
            }`}>
              ستّ البيت
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`font-body text-sm tracking-wide uppercase transition-all duration-300 hover:text-accent relative group ${
                isScrolled ? 'text-foreground' : 'text-cream'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 ${isRTL ? 'right-0' : 'left-0'} w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full`} />
            </button>
          ))}
          
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
              isScrolled 
                ? 'border-olive/30 text-foreground hover:bg-olive/10' 
                : 'border-cream/30 text-cream hover:bg-cream/10'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span className="font-body text-xs uppercase tracking-wider">
              {language === 'en' ? 'AR' : 'EN'}
            </span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1 px-2 py-1 rounded-full border transition-all duration-300 ${
              isScrolled 
                ? 'border-olive/30 text-foreground' 
                : 'border-cream/30 text-cream'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span className="font-body text-xs uppercase">
              {language === 'en' ? 'AR' : 'EN'}
            </span>
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${
              isScrolled ? 'text-foreground' : 'text-cream'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-elevated transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`font-body text-lg text-foreground py-2 hover:text-accent transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
