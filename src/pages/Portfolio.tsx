import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { FadeIn, LazyImage } from '../components/Shared';

export default function Portfolio() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filters = ['All', 'Wedding', 'Product', 'Video', 'Influencer'];

  const allWorks = [
    { src: "https://loremflickr.com/1200/800/india,product,commercial?lock=201", span: "md:col-span-2", alt: "Bridge silhouette", category: 'Product' },
    { src: "https://loremflickr.com/800/1200/india,model,fashion?lock=202", span: "md:row-span-2", alt: "Man portrait", category: 'Influencer' },
    { src: "https://loremflickr.com/800/800/india,drone,cinematic?lock=203", span: "", alt: "Staircase curves", category: 'Video' },
    { src: "https://loremflickr.com/800/800/india,wedding,bride?lock=204", span: "bg-[#050505] p-8", alt: "Wedding dress", category: 'Wedding' },
    { src: "https://loremflickr.com/800/1200/india,spices,product?lock=205", span: "md:row-span-2", alt: "Window shadows", category: 'Product' },
    { src: "https://loremflickr.com/800/800/india,fashion,street?lock=206", alt: "Profile silhouette", category: 'Influencer' },
    { src: "https://loremflickr.com/800/800/india,film,set?lock=207", span: "", alt: "Architecture abstract", category: 'Video' },
    { src: "https://loremflickr.com/1200/800/india,wedding,couple?lock=208", span: "md:col-span-2", alt: "Wedding couple", category: 'Wedding' },
    { src: "https://loremflickr.com/1200/800/india,jewelery?lock=209", span: "md:col-span-2", alt: "Building exterior", category: 'Product' },
    { src: "https://loremflickr.com/800/800/india,model,fashion?lock=210", span: "", alt: "Female portrait", category: 'Influencer' },
  ];``

  const filteredWorks = activeFilter === 'All' ? allWorks : allWorks.filter(w => w.category === activeFilter);

  if (isLoading) {
    return (
      <div className="bg-[#cfcfcf] px-6 md:px-12 py-32 min-h-screen">
        <div className="max-w-[1400px] mx-auto animate-pulse">
          <div className="mb-16 md:mb-24">
            <div className="h-16 md:h-24 w-3/4 md:w-1/2 bg-black/10 mb-4"></div>
            <div className="h-16 md:h-24 w-1/2 md:w-1/3 bg-black/10 mb-12"></div>
            <div className="flex gap-6 md:gap-10 border-b border-black/20 pb-6">
              <div className="h-4 w-16 bg-black/10"></div>
              <div className="h-4 w-24 bg-black/10"></div>
              <div className="h-4 w-20 bg-black/10"></div>
              <div className="h-4 w-24 bg-black/10"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[250px] md:auto-rows-[300px]">
            <div className="md:col-span-2 bg-black/10"></div>
            <div className="md:row-span-2 bg-black/10"></div>
            <div className="bg-black/10"></div>
            <div className="bg-black/10"></div>
            <div className="md:row-span-2 bg-black/10"></div>
            <div className="bg-black/10"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#cfcfcf] px-6 md:px-12 py-32 min-h-screen text-[#111]">
      
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

      <div className="max-w-[1400px] mx-auto">
        {/* Header & Filters */}
        <FadeIn className="mb-16 md:mb-24">
          <h1 className="text-5xl md:text-[6rem] font-black tracking-tight mb-12 leading-[0.9] uppercase">Complete<br/>Archive</h1>
          <div className="flex flex-wrap gap-6 md:gap-10 border-b border-black/20 pb-6">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold transition-colors ${activeFilter === f ? 'text-[#df1c1c]' : 'text-gray-500 hover:text-black'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Masonry-style Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[250px] md:auto-rows-[300px]">
          <AnimatePresence>
            {filteredWorks.map((item, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.src} 
                className={`${item.span || ''} overflow-hidden bg-black group relative cursor-pointer flex items-center justify-center`}
              >
                <div className="absolute inset-0 w-full h-full" onClick={() => setLightboxImg(item.src)}>
                  <LazyImage 
                    src={item.src} 
                    alt={item.alt} 
                    className={`w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 ${item.styleImg || ''}`} 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 uppercase tracking-widest text-xs font-bold transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">{item.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
