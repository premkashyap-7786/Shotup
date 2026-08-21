import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const LazyImage = ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (imgRef.current) observer.unobserve(imgRef.current);
        }
      },
      { rootMargin: "300px" } // Pre-load 300px before scrolling into view
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return <img ref={imgRef} src={isVisible ? src : undefined} alt={alt} className={className} {...props} />;
};

export const SectionNav = ({ light = false, onPrev, onNext, currentIdx = 0, totalIdx = 4 }: { light?: boolean, onPrev?: () => void, onNext?: () => void, currentIdx?: number, totalIdx?: number }) => {
  const borderColor = light ? 'border-white/30' : 'border-black/30';
  const hoverBg = light ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white';
  const dotColor = light ? 'bg-white/20' : 'bg-black/20';
  const activeDotColor = light ? 'bg-white' : 'bg-black';
  const activeBorder = light ? 'border-white' : 'border-black';

  return (
    <div className="flex items-center gap-4 mt-8 md:mt-12 mb-8">
      <button onClick={onPrev} className={`w-10 h-10 md:w-12 md:h-12 rounded-full border ${borderColor} flex items-center justify-center transition-all ${hoverBg}`}>
        <ArrowLeft size={18} strokeWidth={1.5} />
      </button>
      <div className="flex gap-2.5">
        {Array.from({ length: totalIdx }).map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === currentIdx ? activeDotColor : dotColor}`}></div>
        ))}
      </div>
      <button onClick={onNext} className={`w-10 h-10 md:w-12 md:h-12 rounded-full border ${activeBorder} flex items-center justify-center transition-all ${hoverBg}`}>
        <ArrowRight size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export const ServiceItem = ({ title, active = false, onClick }: { title: string, active?: boolean, onClick?: () => void }) => (
  <div onClick={onClick} className={`group flex flex-col md:flex-row items-start md:items-center justify-between border-b border-black/20 py-8 md:py-10 cursor-pointer transition-all ${active ? 'bg-[#1a1a1a] text-white px-6 md:px-12 -mx-6 md:-mx-12 relative overflow-hidden shadow-2xl' : 'hover:pl-4 md:hover:pl-8'}`}>
    {active && (
      <img src="https://loremflickr.com/1200/400/india,cinematic?lock=301" alt="Service background" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale pointer-events-none mix-blend-overlay" />
    )}
    <div className="relative z-10 flex items-center gap-6 md:gap-12 w-full">
      <button className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full border flex items-center justify-center transition-colors ${active ? 'bg-[#df1c1c] border-transparent text-white' : 'border-black group-hover:bg-black group-hover:text-white'}`}>
        <ArrowRight size={22} strokeWidth={1.5} />
      </button>
      <span className="text-2xl md:text-[2.5rem] font-black uppercase tracking-tight leading-none">{title}</span>
    </div>
  </div>
);
