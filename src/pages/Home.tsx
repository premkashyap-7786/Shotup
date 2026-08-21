import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';
import { FadeIn, SectionNav, ServiceItem, LazyImage } from '../components/Shared';

export default function Home() {
  const navigate = useNavigate();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showToast, setShowToast] = useState(false);
  const [aboutIdx, setAboutIdx] = useState(0);
  const [worksPage, setWorksPage] = useState(0);

  const aboutGallery = [
    { back: "https://loremflickr.com/800/1200/india,cinematic?lock=510", front: "https://loremflickr.com/800/800/india,fashion,model?lock=511" },
    { back: "https://loremflickr.com/800/1200/india,drone?lock=512", front: "https://loremflickr.com/800/800/india,wedding,bride?lock=513" },
    { back: "https://loremflickr.com/800/1200/india,landscape?lock=514", front: "https://loremflickr.com/800/800/india,portrait?lock=515" },
    { back: "https://loremflickr.com/800/1200/india,street?lock=516", front: "https://loremflickr.com/800/800/india,jewelry?lock=517" },
  ];

  const handleWorksPrev = () => setWorksPage(prev => (prev === 0 ? 1 : prev - 1));
  const handleWorksNext = () => setWorksPage(prev => (prev === 1 ? 0 : prev + 1));

  const handleAboutPrev = () => setAboutIdx(prev => (prev === 0 ? aboutGallery.length - 1 : prev - 1));
  const handleAboutNext = () => setAboutIdx(prev => (prev === aboutGallery.length - 1 ? 0 : prev + 1));

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setShowToast(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const works = [
    { src: "https://loremflickr.com/1200/800/india,product?lock=501", span: "md:col-span-2", alt: "Product Shoot" },
    { src: "https://loremflickr.com/800/1200/india,model?lock=502", span: "md:row-span-2", alt: "Influencer" },
    { src: "https://loremflickr.com/800/800/india,wedding?lock=503", span: "", alt: "Wedding" },
    { src: "https://loremflickr.com/800/800/india,cinematic?lock=504", span: "bg-[#050505] p-8", alt: "Cinematic", styleImg: "opacity-60 group-hover:opacity-80" },
    { src: "https://loremflickr.com/800/1200/india,drone?lock=505", span: "md:row-span-2", alt: "Drone Aerial" },
    { special: true, src: "https://loremflickr.com/800/800/india,jewelry?lock=506", alt: "Product Jewelry" },
    { src: "https://loremflickr.com/800/800/india,vlogger?lock=507", span: "", alt: "UGC Shoot" },
    { src: "https://loremflickr.com/1200/800/india,music,video?lock=508", span: "md:col-span-2", alt: "Music Video" }
  ];

  return (
    <div className="w-full">
      
      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-md"
            onClick={() => setLightboxImg(null)}
          >
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 md:top-12 md:right-12 text-white/70 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImg} 
              alt="Lightbox Fullscreen" 
              className="max-w-full max-h-full object-contain grayscale"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 bg-white text-black px-6 py-4 shadow-2xl"
          >
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-xs uppercase tracking-widest font-bold">Message sent successfully</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col items-center overflow-visible pt-2 pb-32">
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 h-[65vh] flex flex-col justify-between z-20">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-between items-start"
          >
            <p className="text-[9px] md:text-[10px] text-white/80 uppercase tracking-[0.15em] leading-[1.8] max-w-[240px] font-medium">
              A premium visual studio<br/>
              whose lens transforms<br/>
              everyday moments into<br/>
              timeless cinematic pieces
            </p>
            <p className="text-[9px] md:text-[10px] text-white/80 uppercase tracking-[0.15em] text-right leading-[1.8] font-medium">
              Scroll<br/>
              More
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-[35%] left-[25%] md:left-[35%] flex flex-col items-center"
          >
            <div className="text-5xl md:text-7xl text-white opacity-90 -rotate-12 mb-4 drop-shadow-lg" style={{ fontFamily: '"Nothing You Could Do", cursive' }}>
              Shotup
            </div>
            <div className="text-center">
              <h2 className="text-[10px] md:text-[11px] text-white uppercase tracking-[0.3em] font-semibold mb-1.5 drop-shadow-md">Shotup.in</h2>
              <p className="text-[8px] md:text-[9px] text-gray-400 uppercase tracking-widest font-medium">Premium Visual Studio</p>
            </div>
          </motion.div>
        </div>

        {/* Hero Background Image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-32 right-0 w-full md:w-[75%] h-[calc(100%+8rem)] z-10 pointer-events-none"
        >
          {/* Subtle gradient overlays to blend edges into black background */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0a0a0a] z-10 w-1/3"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 h-full"></div>
          <img 
            src="https://loremflickr.com/1200/800/india,portrait,photographer?lock=509" 
            alt="Photographer Portrait" 
            className="w-full h-full object-cover object-[70%_30%] opacity-40 grayscale"
          />
        </motion.div>
      </section>

      {/* --- FLOATING FRAMEUP TEXT --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-[65vh] w-full flex justify-center z-40 pointer-events-none select-none"
      >
        <div className="relative w-full max-w-[1400px] flex justify-center">
          {/* Large Red Circle */}
          <div className="absolute right-[15%] top-[-10%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] bg-[#df1c1c] rounded-full -z-10"></div>
          
          <h1 className="text-[19vw] font-black tracking-tighter uppercase leading-[0.75] mt-12 whitespace-nowrap text-center">
            <span className="text-[#cecece]">SHO</span>
            <span className="text-[#141414]">TUP</span>
          </h1>
        </div>
      </motion.div>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="bg-[#cfcfcf] relative pt-[25vw] pb-24 md:pb-32 px-6 md:px-12 text-[#111]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          
          <FadeIn className="w-full md:w-[35%] flex flex-col justify-between h-full pt-4 md:pt-12">
            <div>
              <h2 className="text-4xl md:text-[3.5rem] font-black uppercase tracking-tight mb-8">About Me</h2>
              <p className="text-[11px] md:text-[13px] font-semibold uppercase tracking-[0.15em] leading-[1.8] text-[#222]">
                A leading studio<br/>
                specializing in high-end<br/>
                commercial, wedding, and<br/>
                cinematic productions across<br/>
                the country
              </p>
            </div>
            
            <div className="mt-24 md:mt-40">
              <div className="text-[11px] uppercase tracking-widest font-bold mb-2">Until . Now</div>
              <SectionNav onPrev={handleAboutPrev} onNext={handleAboutNext} currentIdx={aboutIdx} totalIdx={aboutGallery.length} />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="w-full md:w-[65%] relative flex justify-end mt-12 md:mt-0">
            <div className="absolute right-0 top-[-40px] text-[11px] font-bold tracking-widest uppercase">
              EST. 2002
            </div>
            
            <div 
              className="relative w-full max-w-[600px] right-0 md:right-12 mt-8 md:mt-12 aspect-square cursor-pointer group"
              onClick={handleAboutNext}
            >
              {/* Back Image (Tilted) */}
              <div className="absolute top-12 -left-4 md:-left-24 w-[85%] aspect-[3/4] bg-black shadow-2xl -rotate-[15deg] z-0 overflow-hidden">
                <img src={aboutGallery[aboutIdx].back} alt="Background abstract" className="w-full h-full object-cover grayscale opacity-90 scale-110 transition-all duration-700" />
              </div>
              {/* Front Image */}
              <div className="absolute bottom-0 right-0 w-[85%] aspect-[4/4.5] bg-black shadow-2xl z-10 overflow-hidden">
                <img src={aboutGallery[aboutIdx].front} alt="Foreground portrait" className="w-full h-full object-cover object-right grayscale transition-all duration-700" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- WORKS SECTION --- */}
      <section id="works" className="bg-[#cfcfcf] px-6 md:px-12 py-20 text-[#111]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <FadeIn className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
            <div>
              <SectionNav onPrev={handleWorksPrev} onNext={handleWorksNext} currentIdx={worksPage} totalIdx={2} />
            </div>
            <div className="text-left md:text-right max-w-[450px]">
              <h2 className="text-3xl md:text-[2.5rem] font-black uppercase tracking-tight mb-6">My Works</h2>
              <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] leading-[1.8] text-[#222]">
                Every image is a meticulous<br className="hidden md:block" />
                composition, carefully curated to<br className="hidden md:block" />
                evoke emotion and provoke thought.<br className="hidden md:block" />
                Whether it's a candid moment frozen<br className="hidden md:block" />
                in time or the grandeur of nature's<br className="hidden md:block" />
                spectacle
              </p>
            </div>
          </FadeIn>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[250px] md:auto-rows-[300px]">
            {works.slice(worksPage * 4, worksPage * 4 + 4).map((item, i) => (
              item.special ? (
                <FadeIn key={item.src} delay={i * 0.1} className="relative overflow-visible flex items-center justify-center -mt-12 md:mt-0 z-10 md:scale-110 group cursor-pointer">
                  <div className="absolute w-[85%] h-[85%] bg-[#df1c1c] -rotate-[12deg] translate-x-3 translate-y-3 shadow-2xl transition-transform duration-500 group-hover:-rotate-[15deg]"></div>
                  <div 
                    className="w-[85%] h-[85%] relative z-10 border-[6px] border-[#cfcfcf] overflow-hidden shadow-xl bg-black"
                    onClick={() => setLightboxImg(item.src)}
                  >
                    <LazyImage src={item.src} alt={item.alt} className="w-full h-full object-cover grayscale object-top transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </FadeIn>
              ) : (
                <FadeIn 
                  key={item.src} 
                  delay={i * 0.1}
                  className={`${item.span || ''} overflow-hidden bg-black group relative cursor-pointer flex items-center justify-center`}
                >
                  <div className="absolute inset-0 w-full h-full" onClick={() => setLightboxImg(item.src)}>
                    <LazyImage 
                      src={item.src} 
                      alt={item.alt} 
                      className={`w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 ${item.styleImg || ''}`} 
                    />
                  </div>
                </FadeIn>
              )
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="bg-[#cfcfcf] px-6 md:px-12 py-24 md:py-32 text-[#111]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
          <FadeIn className="w-full md:w-[35%] pt-4">
            <h2 className="text-4xl md:text-[3.5rem] font-black uppercase tracking-tight mb-8 leading-none">My Services</h2>
            <p className="text-[11px] md:text-[13px] font-semibold uppercase tracking-[0.15em] leading-[1.8] text-[#222]">
              Whether it's capturing the<br/>
              essence of a corporate<br/>
              event, immortalizing a<br/>
              couple's special day, or<br/>
              collaborating on artistic<br/>
              projects
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="w-full md:w-[65%] flex flex-col pt-2 border-t border-black/20">
            <ServiceItem title="Drone Shoot" onClick={() => navigate('/services')} />
            <ServiceItem title="UGC Shoot" onClick={() => navigate('/services')} />
            <ServiceItem title="AI Video Edits" onClick={() => navigate('/services')} />
            <ServiceItem title="Influencer Shoot" onClick={() => navigate('/services')} />
            <ServiceItem title="Product Shoot" active={true} onClick={() => navigate('/services')} />
            <ServiceItem title="Wedding Shoot" onClick={() => navigate('/services')} />
            <ServiceItem title="Pre Wedding Shoot" onClick={() => navigate('/services')} />
            <ServiceItem title="Ads Shoot" onClick={() => navigate('/services')} />
            <ServiceItem title="Cinematography" onClick={() => navigate('/services')} />
            <ServiceItem title="Music Video" onClick={() => navigate('/services')} />
          </FadeIn>
        </div>
      </section>



      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="bg-[#0a0a0a] relative overflow-hidden pt-32 min-h-[90vh] flex flex-col justify-between items-center text-white pb-20">
        
        {/* Floating Contact Text */}
        <FadeIn className="relative w-full flex justify-center z-10 mt-12 mb-8 max-w-[1400px]">
          {/* Red Circle behind text */}
          <div className="absolute right-[15%] top-[-30%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#df1c1c] rounded-full z-0"></div>
          
          <h1 className="text-[20vw] font-black tracking-tighter uppercase m-0 leading-[0.75] z-10 relative select-none whitespace-nowrap text-center pointer-events-none">
            <span className="text-[#cecece]">CONT</span>
            <span className="text-[#141414]">ACT</span>
          </h1>
        </FadeIn>

        {/* Contact Form Overlaid */}
        <FadeIn delay={0.3} className="relative z-30 w-full max-w-md mx-auto px-6 mb-24 pointer-events-auto">
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-5 backdrop-blur-md bg-black/40 p-8 border border-white/10 shadow-2xl rounded-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 text-center">Send a Message</h3>
            <input 
              type="text" 
              placeholder="YOUR NAME"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-transparent border-b border-white/30 py-3 text-xs tracking-widest focus:outline-none focus:border-white transition-colors"
            />
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-transparent border-b border-white/30 py-3 text-xs tracking-widest focus:outline-none focus:border-white transition-colors"
            />
            <textarea 
              placeholder="MESSAGE"
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="bg-transparent border-b border-white/30 py-3 text-xs tracking-widest focus:outline-none focus:border-white transition-colors resize-none"
            ></textarea>
            <button type="submit" className="mt-4 border border-white py-4 text-xs tracking-widest font-bold uppercase hover:bg-white hover:text-black transition-colors">
              Submit Inquiry
            </button>
          </form>
        </FadeIn>

        {/* Large Center Portrait */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:w-[65%] h-[75%] z-0 flex justify-center items-end pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-10"></div>
          <img 
            src="https://loremflickr.com/1200/1200/india,cinematographer?lock=513" 
            alt="Photographer Contact Portrait" 
            className="w-full h-full object-cover object-top grayscale opacity-80" 
          />
        </div>
      </section>

    </div>
  );
}
