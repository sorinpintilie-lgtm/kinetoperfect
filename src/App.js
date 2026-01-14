import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaUserMd, FaHeartbeat, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheckCircle, FaHandHoldingMedical } from 'react-icons/fa';
import { GiSpineArrow, GiMedicalPack } from 'react-icons/gi';
import { MdHealthAndSafety } from 'react-icons/md';

function App() {
  const PHONE_TEL = '0720088880';
  const PHONE_DISPLAY = '0720 088 880';

  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({ experience: 0, patients: 0, success: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 639px)').matches;
  });
  const [hideStickyMobile, setHideStickyMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('kp_hideStickyMobile') === '1';
  });
  const counterRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = (e) => setIsMobile(e.matches);
    // Set initial (some browsers need it)
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (hideStickyMobile) window.localStorage.setItem('kp_hideStickyMobile', '1');
    else window.localStorage.removeItem('kp_hideStickyMobile');
  }, [hideStickyMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            
            if (entry.target.id === 'stats' && !hasAnimated) {
              setHasAnimated(true);
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const targets = { experience: 15, patients: 5000, success: 98 };

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        experience: Math.floor(targets.experience * progress),
        patients: Math.floor(targets.patients * progress),
        success: Math.floor(targets.success * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(targets);
      }
    }, stepDuration);
  };

  const testimonials = [
    {
      name: "Maria Popescu",
      text: "Echipa Kineto Perfect m-a ajutat să mă recuperez complet după accidentul meu. Profesionalism și dedicare la cel mai înalt nivel!",
      rating: 5
    },
    {
      name: "Ion Georgescu",
      text: "Tratamentul pentru scolioză a fost un succes deplin. Mulțumesc echipei pentru răbdare și expertiza lor!",
      rating: 5
    },
    {
      name: "Elena Dumitrescu",
      text: "Cel mai bun centru de kinetoterapie din București. Echipament modern și personal foarte calificat.",
      rating: 5
    },
    {
      name: "Andrei Ionescu",
      text: "Am scăpat de durerile cronice de spate datorită tratamentelor personalizate. Recomand cu încredere!",
      rating: 5
    },
    {
      name: "Carmen Stanciu",
      text: "Atmosferă prietenoasă și rezultate vizibile din primele ședințe. Mulțumesc pentru tot!",
      rating: 5
    }
  ];

  return (
    <div className="App bg-white">
      {/* Sticky note (concept demo) */}
      {(!isMobile || !hideStickyMobile) && (
        <div className="fixed bottom-4 left-4 z-[60] max-w-[260px] sm:max-w-sm">
          <div className="relative rounded-2xl border border-yellow-300 bg-yellow-100/95 shadow-xl backdrop-blur-md p-4 sm:p-5">
            {/* Mobile close */}
            <button
              type="button"
              onClick={() => setHideStickyMobile(true)}
              className="sm:hidden absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-gray-700 shadow-md border border-gray-200 hover:bg-gray-50"
              aria-label="Ascunde nota"
              title="Ascunde"
            >
              ×
            </button>

            <p className="text-[12px] sm:text-sm text-gray-900 leading-snug">
              <span className="font-semibold">Concept demo</span> • Conținut orientativ • Dezvoltat de{' '}
              <a
                href="https://sky.ro"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-2 hover:text-primary-700"
              >
                sky.ro
              </a>
            </p>

            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-primary-600 px-4 py-2.5 text-white font-semibold shadow-lg hover:bg-primary-700 transition-colors"
            >
              Vreau varianta finală!
            </a>

            <p className="mt-2 text-[11px] text-gray-600">
              Telefon: <span className="font-semibold text-gray-700">{PHONE_DISPLAY}</span>
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 backdrop-blur-md shadow-lg border-b border-gray-100 py-2 md:py-3' : 'bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100 py-3 md:py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/LOGOKINETO.png" alt="Kineto Perfect Logo" className="h-auto w-40 md:w-56 lg:w-64 object-contain" />
            </div>
            <div className="hidden lg:flex items-center space-x-1">
              <a href="#despre" className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium">Despre Noi</a>
              <a href="#servicii" className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium">Servicii</a>
              <a href="#testimoniale" className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium">Testimoniale</a>
              <a href="#contact" className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium">Contact</a>
            </div>
            <div className="flex items-center space-x-3">
              <a href={`tel:${PHONE_TEL}`} className="hidden md:flex items-center space-x-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <FaPhone className="w-4 h-4" />
                <span>Programează-te</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <a href="#despre" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all font-medium py-3 px-4 rounded-lg">Despre Noi</a>
              <a href="#servicii" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all font-medium py-3 px-4 rounded-lg">Servicii</a>
              <a href="#testimoniale" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all font-medium py-3 px-4 rounded-lg">Testimoniale</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all font-medium py-3 px-4 rounded-lg">Contact</a>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all font-semibold shadow-lg mt-2">
                <FaPhone className="w-4 h-4" />
                <span>Programează-te</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-end overflow-hidden pt-20 md:pt-24">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-32 right-10 w-20 h-20 border-4 border-white/20 rounded-lg rotate-12"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 border-4 border-white/20 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 pattern-dots opacity-20 w-32 h-32"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4 leading-tight drop-shadow-2xl whitespace-nowrap">
              Recuperare medicală de excelență
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed max-w-2xl drop-shadow-lg">
              Kinetoterapie profesionistă pentru o viață fără durere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a href="#contact" className="group bg-primary-600 text-white px-8 py-3.5 rounded-xl hover:bg-primary-700 transition-all transform hover:scale-105 font-semibold text-base shadow-2xl flex items-center space-x-2">
                <span>Programează Consultație</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#despre" className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all font-semibold text-base shadow-2xl">
                Află Mai Multe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={counterRef} className="relative py-16 md:py-20 bg-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-primary-600"></div>
        <div className="absolute top-10 right-10 pattern-dots opacity-10 w-40 h-40"></div>
        <div className="absolute bottom-10 left-10 pattern-grid opacity-10 w-40 h-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center transform transition-all duration-1000 ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary-100 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                <div className="relative bg-white border-2 border-primary-600 rounded-2xl p-8 shadow-lg">
                  <div className="text-5xl md:text-6xl font-bold text-primary-600 mb-2">{counters.experience}+</div>
                  <div className="text-gray-700 text-lg font-semibold">Ani de Experiență</div>
                </div>
              </div>
            </div>
            <div className={`text-center transform transition-all duration-1000 delay-200 ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary-100 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                <div className="relative bg-white border-2 border-primary-600 rounded-2xl p-8 shadow-lg">
                  <div className="text-5xl md:text-6xl font-bold text-primary-600 mb-2">{counters.patients}+</div>
                  <div className="text-gray-700 text-lg font-semibold">Pacienți Tratați</div>
                </div>
              </div>
            </div>
            <div className={`text-center transform transition-all duration-1000 delay-400 ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary-100 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                <div className="relative bg-white border-2 border-primary-600 rounded-2xl p-8 shadow-lg">
                  <div className="text-5xl md:text-6xl font-bold text-primary-600 mb-2">{counters.success}%</div>
                  <div className="text-gray-700 text-lg font-semibold">Rată de Succes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="despre" className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-0 w-1 h-40 bg-primary-600"></div>
        <div className="absolute bottom-20 right-0 w-1 h-40 bg-primary-600"></div>
        <div className="absolute top-1/4 right-10 w-24 h-24 border-4 border-primary-200 rounded-lg rotate-45"></div>
        <div className="absolute bottom-1/4 left-10 pattern-dots opacity-10 w-32 h-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-12 md:mb-16 transform transition-all duration-1000 ${isVisible.despre ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 leading-tight">
              Excelență în recuperare medicală
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          {/* Masonry-style grid with images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
            {/* Large card with image - spans 7 columns */}
            <div className={`md:col-span-7 transform transition-all duration-1000 delay-200 ${isVisible.despre ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative h-full">
                <div className="absolute -top-4 -left-4 w-full h-full border-4 border-primary-200 rounded-2xl"></div>
                <div className="relative bg-primary-600 rounded-2xl overflow-hidden shadow-xl h-full flex flex-col">
                  <img 
                    src="/physiotherapist-and-female-patient-receive-back-el-2026-01-12-16-30-15-utc.jpg" 
                    alt="Kinetoterapie profesionistă" 
                    className="w-full h-56 md:h-72 object-cover"
                  />
                  <div className="p-6 md:p-8 flex-1">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">Kineto Perfect</h3>
                    <p className="text-white/95 text-sm md:text-base leading-relaxed mb-6">
                      Firmă de top din domeniul serviciilor medicale, specializată în kinetoterapie,
                      recuperare medicală și redresare a scoliozei.
                    </p>
                    <div className="flex items-center space-x-3 pt-4 border-t border-white/20">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-white">
                        <p className="font-semibold text-sm">Certificat și Acreditat</p>
                        <p className="text-white/80 text-xs">Standarde Internaționale</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature cards column - spans 5 columns, vertically centered */}
            <div className={`md:col-span-5 flex items-center transform transition-all duration-1000 delay-400 ${isVisible.despre ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="space-y-4 w-full">
                <div className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border-l-4 border-primary-600">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FaUserMd className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Echipă Experimentată</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Kinetoterapeuti și specialiști în recuperare medicală cu ani de experiență.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border-l-4 border-primary-600">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FaHandHoldingMedical className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Abordare Personalizată</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Îmbinăm cunoștințele moderne cu abordarea individualizată a fiecărui pacient.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border-l-4 border-primary-600">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <MdHealthAndSafety className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Echipament Modern</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Echipament de ultimă generație pentru soluții eficiente de recuperare.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border-l-4 border-primary-600">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FaClock className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Disponibilitate Flexibilă</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Program extins pentru a se potrivi nevoilor dumneavoastră.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`relative transform transition-all duration-1000 delay-600 ${isVisible.despre ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="absolute -inset-2 bg-primary-100 rounded-2xl"></div>
            <div className="relative bg-white rounded-2xl p-6 md:p-10 border-2 border-primary-600 shadow-xl">
              <div className="flex items-start space-x-3 mb-5">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <FaHeartbeat className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">Misiunea Noastră</h3>
                  <div className="w-16 h-0.5 bg-primary-600"></div>
                </div>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                <span className="font-semibold text-primary-600">Scopul nostru</span> este să ajutăm pacienții să își atingă obiectivele de recuperare,
                să își îmbunătățească calitatea vieții și să se bucure din nou de activitățile pe care le iubesc.
                Cu un mediu prietenos, o echipă de profesioniști dedicați și un echipament de ultimă generație,
                <span className="font-semibold text-primary-600"> Kineto Perfect este un partener de încredere</span> pentru oricine dorește
                să își îmbunătățească sănătatea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicii" className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 pattern-dots opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 pattern-grid opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-12 md:mb-16 transform transition-all duration-1000 ${isVisible.servicii ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">Serviciile noastre</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          {/* Masonry grid with images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Service card 1 with image - spans 5 columns */}
            <div className={`md:col-span-5 group transform transition-all duration-1000 ${isVisible.servicii ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-primary-100 rounded-2xl transform group-hover:scale-105 transition-transform"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-primary-600 h-full flex flex-col">
                  <img 
                    src="/patient-preparing-for-red-cord-physiotherapy-for-n-2026-01-12-09-50-56-utc.jpg" 
                    alt="Kinetoterapie" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 md:p-8 flex-1">
                    <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mb-5 -mt-14 relative shadow-lg">
                      <FaHeartbeat className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Kinetoterapie</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Tratamente personalizate pentru recuperarea mobilității și ameliorarea durerii prin tehnici moderne.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service card 2 - spans 7 columns */}
            <div className={`md:col-span-7 group transform transition-all duration-1000 delay-200 ${isVisible.servicii ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-primary-100 rounded-2xl transform group-hover:scale-105 transition-transform"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-primary-600 h-full flex items-center">
                  <div className="flex-1">
                    <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mb-5">
                      <GiMedicalPack className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Recuperare Medicală</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Programe complete de recuperare post-operatorie și post-traumatică cu echipament modern.
                    </p>
                  </div>
                  <img 
                    src="/physiotherapist-massaging-woman-back-vertebrae-tr-2026-01-08-23-31-15-utc.jpg" 
                    alt="Recuperare medicală" 
                    className="hidden md:block w-64 h-64 object-cover rounded-xl ml-8"
                  />
                </div>
              </div>
            </div>

            {/* Service card 3 with image - spans full width */}
            <div className={`md:col-span-12 group transform transition-all duration-1000 delay-400 ${isVisible.servicii ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                <div className="absolute -inset-1 bg-primary-100 rounded-2xl transform group-hover:scale-105 transition-transform"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-primary-600 flex flex-col md:flex-row">
                  <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                    <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mb-5">
                      <GiSpineArrow className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Redresare Scolioză</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Tratamente specializate pentru corectarea și ameliorarea scoliozei prin metode dovedite științific. Echipa noastră folosește cele mai moderne tehnici pentru rezultate optime.
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    <img 
                      src="/physiotherapist-explaining-cranial-anatomy-with-mo-2026-01-11-10-56-27-utc.jpg" 
                      alt="Redresare scolioză" 
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimoniale" className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className={`text-center transform transition-all duration-1000 ${isVisible.testimoniale ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">Ce spun pacienții noștri</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
        </div>

        <div className="relative">
          <div className="flex animate-scroll-infinite space-x-6">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-80 md:w-96">
                <div className="relative">
                  <div className="absolute -inset-1 bg-primary-100 rounded-2xl"></div>
                  <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-primary-600">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">Pacient Verificat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 md:py-24 bg-primary-600 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-primary-700"></div>
        <div className="absolute top-20 right-10 w-32 h-32 border-4 border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-white/20 rounded-lg rotate-45"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center mb-12 md:mb-16 transform transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Contactează-ne</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className={`space-y-5 transform transition-all duration-1000 delay-200 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Adresă</h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    B-dul Theodor Pallady, 25<br />
                    Bl: V11, Sc: B, Ap: 47, Parter<br />
                    București, 32256
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPhone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Telefon</h3>
                  <a href={`tel:${PHONE_TEL}`} className="text-sm text-white/90 hover:text-white transition-colors">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">E-mail</h3>
                  <a href="mailto:coman.fane@yahoo.com" className="text-sm text-white/90 hover:text-white transition-colors break-all">
                    coman.fane@yahoo.com
                  </a>
                </div>
              </div>
            </div>

            <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border-2 border-white/20 transform transition-all duration-1000 delay-300 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-xl font-semibold mb-5">Program</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="font-medium text-sm">Luni - Vineri</span>
                  <span className="text-white/90 text-sm">8:30 - 20:30</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="font-medium text-sm">Sâmbătă</span>
                  <span className="text-white/90 text-sm">9:00 - 14:30</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-sm">Duminică</span>
                  <span className="text-white/90 text-sm">Închis</span>
                </div>
              </div>

              <div className="mt-6">
                <a href={`tel:${PHONE_TEL}`} className="block w-full bg-white text-primary-600 text-center px-6 py-3 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-base shadow-xl">
                  Sună Acum
                </a>
              </div>
            </div>

            <div className={`bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/20 transform transition-all duration-1000 delay-400 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.0!2d26.1!3d44.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI0JzAwLjAiTiAyNsKwMDYnMDAuMCJF!5e0!3m2!1sen!2sro!4v1234567890!5m2!1sen!2sro"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locația Kineto Perfect"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary-600"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 pattern-dots opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="/LOGOKINETO.png" alt="Kineto Perfect" className="h-auto w-40 mb-4 brightness-0 invert" />
              <p className="text-gray-400 leading-relaxed text-sm">
                Partenerul tău de încredere pentru recuperare medicală și kinetoterapie profesionistă.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 text-primary-400">Link-uri Rapide</h4>
              <ul className="space-y-2">
                <li><a href="#despre" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">Despre Noi</a></li>
                <li><a href="#servicii" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">Servicii</a></li>
                <li><a href="#testimoniale" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">Testimoniale</a></li>
                <li><a href="#contact" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4 text-primary-400">Contact Rapid</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="text-sm">Tel: <a href={`tel:${PHONE_TEL}`} className="hover:text-primary-400 transition-colors">{PHONE_DISPLAY}</a></li>
                <li className="text-sm">Email: <a href="mailto:coman.fane@yahoo.com" className="hover:text-primary-400 transition-colors break-all">coman.fane@yahoo.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
            <p className="text-sm">&copy; 2026 Kineto Perfect. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
