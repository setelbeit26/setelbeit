import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CuisineShowcase from '@/components/CuisineShowcase';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

const Index = () => {
  return (
    <LanguageProvider>
      <Helmet>
        <title>Set El Beit Catering | ستّ البيت | Authentic Lebanese Home Cooking</title>
        <meta 
          name="description" 
          content="Set El Beit brings the warmth of authentic Lebanese home cooking to your special occasions. Catering for weddings, family gatherings, and corporate events with love and tradition. ستّ البيت - الطبخ اللبناني الأصيل" 
        />
        <meta name="keywords" content="Lebanese catering, authentic Lebanese food, mezze, wedding catering, event catering, Lebanese cuisine, homemade Lebanese food, ستّ البيت, طعام لبناني, مزة" />
        <meta property="og:title" content="Set El Beit Catering | ستّ البيت | Authentic Lebanese Home Cooking" />
        <meta property="og:description" content="Experience the warmth of Lebanese home cooking. Catering for weddings, gatherings, and special occasions." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://setelbeit.com" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <About />
          <CuisineShowcase />
          <Services />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
