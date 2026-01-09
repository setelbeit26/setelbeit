import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.story': 'Our Story',
    'nav.cuisine': 'Cuisine',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',

    // Hero
    'hero.welcome': 'Welcome',
    'hero.headline': 'Where Every Dish Tells',
    'hero.headline2': 'a Family Story',
    'hero.tagline': 'Authentic Lebanese home cooking, crafted with generations of love, tradition, and the warmth of a caring mother\'s kitchen.',
    'hero.cta1': 'Request Catering',
    'hero.cta2': 'Explore Our Cuisine',

    // About
    'about.label': 'Our Story',
    'about.title1': 'The Beginning...',
    'about.title2': 'A Touch of Love',
    'about.quote': 'Love is the secret ingredient',
    'about.section1.title': 'The Beginning.. A Touch of Love',
    'about.section1.text': 'Our story began in 2016, born out of a kitchen filled with passion. It started simply with friends who tasted the "soul" in our dishes. Their constant support and recurring requests were the first spark that made us realize what we offer is more than just food—it\'s an experience crafted with love.',
    'about.section2.title': 'The Path to Excellence',
    'about.section2.text': 'We didn\'t stop at talent; the drive for excellence was our engine. We pursued intensive training and earned professional certifications, refining our skills in the art of food styling and keeping pace with global culinary trends. Every challenge we faced and every milestone we hit only made us stronger and more creative.',
    'about.section3.title': 'Where We Are Today.. and Beyond',
    'about.section3.text': 'Today, we take pride in our dedicated professional team, specializing in catering for all occasions, banquets, and grand weddings. We don\'t just serve dishes; we create unforgettable memories for every event we share with you. Our ambition knows no limits, and with trust in God, we continue to evolve, promising to deliver the best, the finest, and the most exquisite flavors—now and forever.',
    'about.est': 'Est. 2016',

    // Cuisine
    'cuisine.label': 'Our Cuisine',
    'cuisine.title1': 'Authentic Flavors,',
    'cuisine.title2': 'Homemade with Care',
    'cuisine.description': 'Each dish is prepared fresh using traditional recipes, premium ingredients, and the same love that has filled Lebanese homes for generations.',
    'cuisine.taste': 'This is just a taste of what we offer',
    'cuisine.cta': 'Request Full Menu',
    'cuisine.mezze': 'Mezze',
    'cuisine.main': 'Main Course',
    'cuisine.dessert': 'Dessert',
    'cuisine.hummus': 'Hummus',
    'cuisine.hummus.desc': 'Silky smooth chickpea dip with tahini, lemon, and our secret blend of spices',
    'cuisine.tabbouleh': 'Tabbouleh',
    'cuisine.tabbouleh.desc': 'Fresh parsley salad with bulgur, tomatoes, mint, and zesty lemon dressing',
    'cuisine.babaganoush': 'Baba Ganoush',
    'cuisine.babaganoush.desc': 'Smoky roasted eggplant blended with tahini and pomegranate seeds',
    'cuisine.shawarma': 'Chicken Shish Tawook',
    'cuisine.shawarma.desc': 'Tender marinated chicken skewers grilled to perfection with garlic sauce',
    'cuisine.kofta': 'Lamb Kofta',
    'cuisine.kofta.desc': 'Spiced lamb kebabs with fresh herbs, grilled over open flame',
    'cuisine.baklava': 'Baklava',
    'cuisine.baklava.desc': 'Layers of golden phyllo, pistachios, and orange blossom honey syrup',

    // Services
    'services.label': 'Our Services',
    'services.title1': 'Catering for',
    'services.title2': 'Every Occasion',
    'services.description': 'We don\'t just cater events — we create experiences. Every gathering is unique, and we work closely with you to craft a menu that tells your story.',
    'services.family': 'Family Gatherings',
    'services.family.desc': 'From intimate dinners to large family reunions, we bring the warmth of Lebanese hospitality to your table.',
    'services.weddings': 'Weddings & Engagements',
    'services.weddings.desc': 'Make your special day unforgettable with our elegant mezze spreads and traditional main courses.',
    'services.corporate': 'Corporate Events',
    'services.corporate.desc': 'Impress clients and colleagues with authentic cuisine that sparks conversation and connection.',
    'services.special': 'Special Occasions',
    'services.special.desc': 'Birthdays, holidays, and celebrations of all kinds — we create memorable dining experiences.',
    'services.badge': 'Everything is made with love — that\'s our promise',
    'services.custom': 'Custom Menus',
    'services.custom.value': 'Tailored to your taste',
    'services.fresh': 'Fresh Ingredients',
    'services.fresh.value': 'Sourced daily',
    'services.personal': 'Personal Touch',
    'services.personal.value': 'Every detail matters',

    // Gallery
    'gallery.label': 'Gallery',
    'gallery.title1': 'A Feast for',
    'gallery.title2': 'the Eyes',
    'gallery.description': 'Every dish is a work of art, prepared with care and presented with pride.',
    'gallery.view': 'View',
    'gallery.close': 'Close',

    // Testimonials
    'testimonials.label': 'Testimonials',
    'testimonials.title1': 'Words from Our',
    'testimonials.title2': 'Extended Family',

    // Contact
    'contact.label': 'Get in Touch',
    'contact.title1': 'Let\'s Create Something',
    'contact.title2': 'Beautiful Together',
    'contact.description': 'Ready to bring the warmth of Lebanese home cooking to your next event? We\'d love to hear from you. Tell us about your occasion, and let\'s create a menu that your guests will never forget.',
    'contact.call': 'Call Us',
    'contact.whatsapp': 'WhatsApp',
    'contact.instagram': 'Instagram',
    'contact.tiktok': 'TikTok',
    'contact.message': 'Message Us',
    'contact.location': 'Tyre, Lebanon — We cater events throughout Lebanon.',
    'contact.form.title': 'Request a Consultation',
    'contact.form.error.name': 'Please enter your name',
    'contact.form.error.email': 'Please enter a valid email address',
    'contact.form.error.phone': 'Please enter a valid phone number',
    'contact.form.error.event': 'Please select an event type',
    'contact.form.error.message': 'Please enter your message',
    'contact.form.name': 'Your Name',
    'contact.form.name.placeholder': 'Enter your name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.event': 'Event Type',
    'contact.form.event.select': 'Select event type',
    'contact.form.event.wedding': 'Wedding / Engagement',
    'contact.form.event.family': 'Family Gathering',
    'contact.form.event.corporate': 'Corporate Event',
    'contact.form.event.birthday': 'Birthday / Celebration',
    'contact.form.event.other': 'Other',
    'contact.form.message': 'Tell Us About Your Event',
    'contact.form.message.placeholder': 'Share details about your event, guest count, and any special requests...',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.toast.title': 'Message Sent!',
    'contact.toast.description': 'Thank you for reaching out. We\'ll get back to you soon with love!',

    // Footer
    'footer.tagline': 'Bringing the warmth and love of Lebanese home cooking to your special moments.',
    'footer.quicklinks': 'Quick Links',
    'footer.connect': 'Connect With Us',
    'footer.available': 'Available for catering throughout Lebanon',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with',
    'footer.in': 'in Lebanon',
  },
  ar: {
    // Navigation
    'nav.story': 'قصتنا',
    'nav.cuisine': 'أطباقنا',
    'nav.services': 'خدماتنا',
    'nav.gallery': 'معرض الصور',
    'nav.contact': 'تواصل معنا',

    // Hero
    'hero.welcome': 'أهلاً وسهلاً',
    'hero.headline': 'حيث كل طبق يحكي',
    'hero.headline2': 'قصة عائلية',
    'hero.tagline': 'الطبخ اللبناني الأصيل، مصنوع بحب الأجيال، والتقاليد، ودفء مطبخ الأم الحنونة.',
    'hero.cta1': 'اطلب خدمة الضيافة',
    'hero.cta2': 'اكتشف أطباقنا',

    // About
    'about.label': 'قصتنا',
    'about.title1': 'البداية...',
    'about.title2': 'لمسة حب',
    'about.quote': 'الحب هو المكون السري',
    'about.section1.title': 'البداية.. لمسة حب',
    'about.section1.text': 'بدأت قصتنا في عام 2016، من مطبخ مليء بالشغف. انطلقت ببساطة مع أصدقاء تذوقوا "الروح" في أطباقنا. دعمهم المستمر وطلباتهم المتكررة كانت الشرارة الأولى التي جعلتنا ندرك أن ما نقدمه أكثر من مجرد طعام — إنه تجربة مصنوعة بالحب.',
    'about.section2.title': 'طريق التميز',
    'about.section2.text': 'لم نتوقف عند الموهبة؛ السعي للتميز كان محركنا. تابعنا تدريبات مكثفة وحصلنا على شهادات مهنية، صقلنا مهاراتنا في فن تنسيق الطعام ومواكبة أحدث صيحات الطهي العالمية. كل تحدٍ واجهناه وكل إنجاز حققناه زادنا قوة وإبداعاً.',
    'about.section3.title': 'أين نحن اليوم.. وما بعده',
    'about.section3.text': 'اليوم، نفخر بفريقنا المحترف المتفاني، المتخصص في تقديم الطعام لجميع المناسبات والولائم وحفلات الزفاف الكبرى. نحن لا نقدم أطباقاً فحسب؛ بل نصنع ذكريات لا تُنسى لكل حدث نشاركه معكم. طموحنا بلا حدود، وبتوفيق الله، نستمر في التطور، واعدين بتقديم الأفضل والأرقى والأشهى — الآن وإلى الأبد.',
    'about.est': 'منذ ٢٠١٦',

    // Cuisine
    'cuisine.label': 'أطباقنا',
    'cuisine.title1': 'نكهات أصيلة،',
    'cuisine.title2': 'مصنوعة بعناية',
    'cuisine.description': 'كل طبق يُحضّر طازجاً باستخدام وصفات تقليدية، ومكونات فاخرة، ونفس الحب الذي ملأ البيوت اللبنانية عبر الأجيال.',
    'cuisine.taste': 'هذه مجرد لمحة مما نقدمه',
    'cuisine.cta': 'اطلب قائمة الطعام كاملة',
    'cuisine.mezze': 'مزة',
    'cuisine.main': 'طبق رئيسي',
    'cuisine.dessert': 'حلويات',
    'cuisine.hummus': 'حمص',
    'cuisine.hummus.desc': 'حمص كريمي ناعم مع الطحينة والليمون وخلطتنا السرية من التوابل',
    'cuisine.tabbouleh': 'تبولة',
    'cuisine.tabbouleh.desc': 'سلطة بقدونس طازجة مع البرغل والبندورة والنعناع وصلصة الليمون',
    'cuisine.babaganoush': 'بابا غنوج',
    'cuisine.babaganoush.desc': 'باذنجان مشوي مدخّن مخلوط مع الطحينة وبذور الرمان',
    'cuisine.shawarma': 'شيش طاووق',
    'cuisine.shawarma.desc': 'أسياخ دجاج متبلة مشوية إلى الكمال مع صلصة الثوم',
    'cuisine.kofta': 'كفتة الغنم',
    'cuisine.kofta.desc': 'كباب الغنم المتبل بالأعشاب الطازجة، مشوي على النار المفتوحة',
    'cuisine.baklava': 'بقلاوة',
    'cuisine.baklava.desc': 'طبقات من العجين الذهبي والفستق وشراب عسل زهر البرتقال',

    // Services
    'services.label': 'خدماتنا',
    'services.title1': 'ضيافة لكل',
    'services.title2': 'المناسبات',
    'services.description': 'نحن لا نقدم فقط خدمات الضيافة — نحن نخلق تجارب. كل تجمع فريد، ونعمل معك عن كثب لنصنع قائمة طعام تحكي قصتك.',
    'services.family': 'التجمعات العائلية',
    'services.family.desc': 'من العشاءات الحميمة إلى لقاءات العائلة الكبيرة، نجلب دفء الضيافة اللبنانية إلى مائدتك.',
    'services.weddings': 'الأعراس والخطوبات',
    'services.weddings.desc': 'اجعل يومك المميز لا يُنسى مع مزاتنا الأنيقة وأطباقنا الرئيسية التقليدية.',
    'services.corporate': 'فعاليات الشركات',
    'services.corporate.desc': 'أبهر عملاءك وزملاءك بالمأكولات الأصيلة التي تُشعل الحوار والتواصل.',
    'services.special': 'المناسبات الخاصة',
    'services.special.desc': 'أعياد الميلاد والعطلات والاحتفالات بكل أنواعها — نخلق تجارب طعام لا تُنسى.',
    'services.badge': 'كل شي بالحب — هذا وعدنا',
    'services.custom': 'قوائم مخصصة',
    'services.custom.value': 'حسب ذوقك',
    'services.fresh': 'مكونات طازجة',
    'services.fresh.value': 'يومياً',
    'services.personal': 'لمسة شخصية',
    'services.personal.value': 'كل تفصيل مهم',

    // Gallery
    'gallery.label': 'معرض الصور',
    'gallery.title1': 'متعة',
    'gallery.title2': 'للعيون',
    'gallery.description': 'كل طبق هو عمل فني، محضّر بعناية ومقدّم بفخر.',
    'gallery.view': 'عرض',
    'gallery.close': 'إغلاق',

    // Testimonials
    'testimonials.label': 'آراء العملاء',
    'testimonials.title1': 'كلمات من',
    'testimonials.title2': 'عائلتنا الممتدة',

    // Contact
    'contact.label': 'تواصل معنا',
    'contact.title1': 'لنصنع شيئاً',
    'contact.title2': 'جميلاً معاً',
    'contact.description': 'هل أنت مستعد لجلب دفء الطبخ اللبناني المنزلي لمناسبتك القادمة؟ نحب أن نسمع منك. أخبرنا عن مناسبتك، ولنصنع قائمة طعام لن ينساها ضيوفك أبداً.',
    'contact.call': 'اتصل بنا',
    'contact.whatsapp': 'واتساب',
    'contact.instagram': 'إنستغرام',
    'contact.tiktok': 'تيك توك',
    'contact.message': 'راسلنا',
    'contact.location': 'صور، لبنان — نقدم خدمات الضيافة في جميع أنحاء لبنان.',
    'contact.form.title': 'اطلب استشارة',
    'contact.form.error.name': 'الرجاء إدخال اسمك',
    'contact.form.error.email': 'الرجاء إدخال بريد إلكتروني صحيح',
    'contact.form.error.phone': 'الرجاء إدخال رقم هاتف صحيح',
    'contact.form.error.event': 'الرجاء اختيار نوع المناسبة',
    'contact.form.error.message': 'الرجاء إدخال رسالتك',
    'contact.form.name': 'اسمك',
    'contact.form.name.placeholder': 'أدخل اسمك',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.phone': 'رقم الهاتف',
    'contact.form.event': 'نوع المناسبة',
    'contact.form.event.select': 'اختر نوع المناسبة',
    'contact.form.event.wedding': 'عرس / خطوبة',
    'contact.form.event.family': 'تجمع عائلي',
    'contact.form.event.corporate': 'فعالية شركات',
    'contact.form.event.birthday': 'عيد ميلاد / احتفال',
    'contact.form.event.other': 'أخرى',
    'contact.form.message': 'أخبرنا عن مناسبتك',
    'contact.form.message.placeholder': 'شارك تفاصيل مناسبتك، عدد الضيوف، وأي طلبات خاصة...',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.form.sending': 'جاري الإرسال...',
    'contact.toast.title': 'تم الإرسال!',
    'contact.toast.description': 'شكراً لتواصلك معنا. سنرد عليك قريباً بكل حب!',

    // Footer
    'footer.tagline': 'نجلب دفء وحب الطبخ اللبناني المنزلي لمناسباتك الخاصة.',
    'footer.quicklinks': 'روابط سريعة',
    'footer.connect': 'تواصل معنا',
    'footer.available': 'متاحون للضيافة في جميع أنحاء لبنان',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.made': 'صُنع بـ',
    'footer.in': 'في لبنان',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
