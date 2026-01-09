import { useState, useEffect, useRef, FormEvent } from 'react';
import { Phone, MessageCircle, Instagram, Send, MapPin, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { z } from 'zod';

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, 'name').max(100),
  email: z.string().trim().email('email').max(255),
  phone: z.string().trim().min(8, 'phone').max(20).regex(/^[\d\s+()-]+$/, 'phone'),
  eventType: z.string().min(1, 'event'),
  message: z.string().trim().min(10, 'message').max(2000),
});

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  message?: string;
};

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot
  const [submitTime, setSubmitTime] = useState(0); // Anti-spam timing
  const sectionRef = useRef<HTMLElement>(null);
  const formLoadTime = useRef(Date.now());
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          formLoadTime.current = Date.now();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        newErrors[field] = t(`contact.form.error.${err.message}`);
      });
      setErrors(newErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Anti-spam: Check honeypot field
    if (honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }
    
    // Anti-spam: Check if form was filled too quickly (less than 3 seconds)
    const timeTaken = Date.now() - formLoadTime.current;
    if (timeTaken < 3000) {
      console.warn('Form submitted too quickly');
      toast({
        title: 'Please wait',
        description: 'Please take your time filling out the form.',
        variant: 'destructive',
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with form data (secure client-side approach)
      const subject = encodeURIComponent(`Catering Inquiry - ${formData.eventType}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Event Type: ${formData.eventType}\n\n` +
        `Message:\n${formData.message}`
      );
      
      // Open email client
      window.location.href = `mailto:set_el_beit@yahoo.com?subject=${subject}&body=${body}`;

      toast({
        title: t('contact.toast.title'),
        description: t('contact.toast.description'),
      });
      
      setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
      setErrors({});
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      labelKey: 'contact.call',
      value: '+961 76 031 146',
      href: 'tel:+96176031146',
    },
    {
      icon: MessageCircle,
      labelKey: 'contact.whatsapp',
      value: '+961 76 031 146',
      href: 'https://wa.me/96176031146',
    },
    {
      icon: Instagram,
      labelKey: 'contact.instagram',
      value: '@set.elbeit_kitchen',
      href: 'https://www.instagram.com/set.elbeit_kitchen',
    },
    {
      icon: TikTokIcon,
      labelKey: 'contact.tiktok',
      value: '@mona.set.el_beit',
      href: 'https://www.tiktok.com/@mona.set.el_beit',
    },
  ];

  const InputError = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className={`flex items-center gap-1 mt-1 text-destructive text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
        <AlertCircle className="w-3 h-3" />
        <span className={isRTL ? 'font-arabic' : ''}>{message}</span>
      </div>
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-background relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Left Column - Info */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-12' : '-translate-x-12'}`
            } ${isRTL ? 'lg:order-2' : ''}`}
          >
            <span className={`font-body text-accent uppercase tracking-widest text-sm font-semibold ${isRTL ? 'font-arabic' : ''}`}>
              {t('contact.label')}
            </span>
            
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl text-foreground mt-4 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('contact.title1')}
              <span className="italic text-olive block"> {t('contact.title2')}</span>
            </h2>
            
            <p className={`font-body text-muted-foreground leading-relaxed mb-8 md:mb-10 text-sm md:text-base ${isRTL ? 'font-arabic text-right' : ''}`}>
              {t('contact.description')}
            </p>

            {/* Contact Methods */}
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {contactMethods.map((method) => (
                <a
                  key={method.labelKey}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-secondary/50 rounded-sm hover:bg-secondary transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-olive/10 rounded-sm flex items-center justify-center group-hover:bg-olive/20 transition-colors flex-shrink-0">
                    <method.icon className="w-4 h-4 md:w-5 md:h-5 text-olive" />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <span className={`font-body text-xs text-muted-foreground uppercase tracking-wider block ${isRTL ? 'font-arabic' : ''}`}>
                      {t(method.labelKey)}
                    </span>
                    <span className="font-display text-foreground text-sm md:text-base">
                      {method.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Location Note */}
            <div className={`flex items-start gap-3 text-muted-foreground ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className={`font-body text-sm ${isRTL ? 'font-arabic' : ''}`}>
                {t('contact.location')}
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? '-translate-x-12' : 'translate-x-12'}`
            } ${isRTL ? 'lg:order-1' : ''}`}
          >
            <form onSubmit={handleSubmit} className="bg-secondary/30 p-6 md:p-8 lg:p-10 rounded-sm" noValidate>
              <h3 className={`font-display text-xl md:text-2xl text-foreground mb-6 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {t('contact.form.title')}
              </h3>

              {/* Honeypot field - hidden from users, visible to bots */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="space-y-4 md:space-y-5">
                <div>
                  <label className={`font-body text-sm text-muted-foreground block mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {t('contact.form.name')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-background border ${errors.name ? 'border-destructive' : 'border-border'} rounded-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-olive/30 transition-all text-base ${isRTL ? 'text-right font-arabic' : ''}`}
                    placeholder={t('contact.form.name.placeholder')}
                    maxLength={100}
                  />
                  <InputError message={errors.name} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label className={`font-body text-sm text-muted-foreground block mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {t('contact.form.email')} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-background border ${errors.email ? 'border-destructive' : 'border-border'} rounded-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-olive/30 transition-all text-base ${isRTL ? 'text-right' : ''}`}
                      placeholder="your@email.com"
                      maxLength={255}
                    />
                    <InputError message={errors.email} />
                  </div>
                  <div>
                    <label className={`font-body text-sm text-muted-foreground block mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {t('contact.form.phone')} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 bg-background border ${errors.phone ? 'border-destructive' : 'border-border'} rounded-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-olive/30 transition-all text-base ${isRTL ? 'text-right' : ''}`}
                      placeholder="+961 XX XXX XXX"
                      maxLength={20}
                    />
                    <InputError message={errors.phone} />
                  </div>
                </div>

                <div>
                  <label className={`font-body text-sm text-muted-foreground block mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {t('contact.form.event')} <span className="text-destructive">*</span>
                  </label>
                  <select
                    required
                    value={formData.eventType}
                    onChange={(e) => handleInputChange('eventType', e.target.value)}
                    className={`w-full px-4 py-3 bg-background border ${errors.eventType ? 'border-destructive' : 'border-border'} rounded-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-olive/30 transition-all text-base ${isRTL ? 'text-right font-arabic' : ''}`}
                  >
                    <option value="">{t('contact.form.event.select')}</option>
                    <option value="wedding">{t('contact.form.event.wedding')}</option>
                    <option value="family">{t('contact.form.event.family')}</option>
                    <option value="corporate">{t('contact.form.event.corporate')}</option>
                    <option value="birthday">{t('contact.form.event.birthday')}</option>
                    <option value="other">{t('contact.form.event.other')}</option>
                  </select>
                  <InputError message={errors.eventType} />
                </div>

                <div>
                  <label className={`font-body text-sm text-muted-foreground block mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {t('contact.form.message')} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 bg-background border ${errors.message ? 'border-destructive' : 'border-border'} rounded-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-olive/30 transition-all resize-none text-base ${isRTL ? 'text-right font-arabic' : ''}`}
                    placeholder={t('contact.form.message.placeholder')}
                    maxLength={2000}
                  />
                  <InputError message={errors.message} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-olive hover:bg-olive-light disabled:bg-olive/50 disabled:cursor-not-allowed text-primary-foreground font-body font-semibold tracking-wide uppercase text-sm rounded-sm transition-all duration-300 shadow-warm hover:shadow-elevated flex items-center justify-center gap-2 ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? (
                    t('contact.form.sending')
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
