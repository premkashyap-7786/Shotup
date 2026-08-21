import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { FadeIn } from '../components/Shared';

export default function Services() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Drone Shoot",
      desc: "Breathtaking aerial photography and videography for real estate, events, and cinematic establishing shots.",
      price: "Starting at ₹600",
      img: "https://loremflickr.com/800/800/india,drone?lock=101",
      techniques: ["Hyperlapse", "Tracking shots", "Top-down orthomosaic"],
      equipment: ["DJI Mavic 3 Pro", "DJI Inspire 3", "ND Filter Kits"]
    },
    {
      title: "UGC Shoot",
      desc: "Authentic, relatable, and native-feeling User Generated Content style videos designed specifically for TikTok and Reels.",
      price: "Starting at ₹400",
      img: "https://loremflickr.com/800/800/india,vlogger?lock=102",
      techniques: ["Vertical video framing", "Trend-based editing", "Direct-to-camera engagement"],
      equipment: ["iPhone 15 Pro Max", "Rode Wireless GO II", "Ring Lights"]
    },
    {
      title: "AI Video Edits",
      desc: "Cutting-edge post-production using AI tools for rotoscoping, upscaling, color matching, and generative visual effects.",
      price: "Starting at ₹300",
      img: "https://loremflickr.com/800/800/india,cyberpunk?lock=103",
      techniques: ["Generative fill & extension", "AI motion interpolation", "Automated tracking masks"],
      equipment: ["DaVinci Resolve Studio", "Topaz Video AI", "RunwayML"]
    },
    {
      title: "Influencer Shoot",
      desc: "Styled content creation for influencers and personal brands, capturing the perfect aesthetic for social feeds and press kits.",
      price: "Starting at ₹500",
      img: "https://loremflickr.com/800/800/india,influencer?lock=104",
      techniques: ["Lifestyle composition", "Outfit-focused lighting", "Rapid location changes"],
      equipment: ["Sony A7 IV", "Sigma 35mm f/1.4 Art", "Portable LED wands"]
    },
    {
      title: "Product Shoot",
      desc: "High-end commercial product photography designed to elevate your brand, highlighting textures, details, and premium craftsmanship.",
      price: "Starting at ₹800",
      img: "https://loremflickr.com/800/800/india,product?lock=105",
      techniques: ["Focus stacking", "Hard & soft light shaping", "Macro detailing"],
      equipment: ["Phase One XF", "Profoto D2 Strobes", "Macro 100mm Lenses"]
    },
    {
      title: "Wedding Shoot",
      desc: "Immortalizing couples' special days with a blend of photojournalistic candids and styled editorial portraits.",
      price: "Starting at ₹3,500",
      img: "https://loremflickr.com/800/800/india,wedding?lock=106",
      techniques: ["Photojournalistic candids", "Off-camera flash (OCF)", "Golden hour styling"],
      equipment: ["Canon EOS R5", "RF 28-70mm f/2", "Godox AD200 Pro Strobes"]
    },
    {
      title: "Pre Wedding Shoot",
      desc: "Intimate and styled storytelling sessions before you tie the knot, set in breathtaking locations to celebrate your chemistry.",
      price: "Starting at ₹1,200",
      img: "https://loremflickr.com/800/800/india,couple?lock=107",
      techniques: ["Environmental storytelling", "Natural light manipulation", "Creative direction"],
      equipment: ["Canon EOS R5", "RF 85mm f/1.2", "Reflectors & Diffusers"]
    },
    {
      title: "Ads Shoot",
      desc: "Dynamic and conversion-focused commercial photography and video for ad campaigns, billboards, and digital marketing.",
      price: "Starting at ₹2,500",
      img: "https://loremflickr.com/800/800/india,commercial?lock=108",
      techniques: ["High-speed sync", "Complex compositing", "Action freezing"],
      equipment: ["RED Komodo", "Arri Skypanels", "Capture One Pro"]
    },
    {
      title: "Cinematography",
      desc: "Visually stunning narrative and commercial film production with a focus on lighting, composition, and emotive storytelling.",
      price: "Custom Quoted",
      img: "https://loremflickr.com/800/800/india,cinematic?lock=109",
      techniques: ["Anamorphic framing", "Dynamic camera movement", "Advanced color grading"],
      equipment: ["ARRI Alexa Mini LF", "Cooke Anamorphic Lenses", "Steadicam Zephyr"]
    },
    {
      title: "Music Video",
      desc: "High-energy, stylistically bold video production tailored to artists, translating rhythm and lyrics into captivating visual art.",
      price: "Starting at ₹3,000",
      img: "https://loremflickr.com/800/800/dancer?lock=110",
      techniques: ["Performance lighting", "Rhythmic editing", "VFX integration"],
      equipment: ["Sony FX9", "Astera Titan Tubes", "Ronin 2 Gimbal"]
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-[#cfcfcf] px-6 md:px-12 py-32 min-h-screen">
        <div className="max-w-[1400px] mx-auto animate-pulse">
          <div className="mb-24">
            <div className="h-16 md:h-24 w-3/4 md:w-1/3 bg-black/10 mb-4"></div>
            <div className="h-16 md:h-24 w-1/2 md:w-1/4 bg-black/10"></div>
          </div>
          
          <div className="flex flex-col gap-24 md:gap-40">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}>
                <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-square bg-black/10 border-[6px] border-[#cfcfcf]"></div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="h-10 md:h-14 w-3/4 bg-black/10 mb-6"></div>
                  <div className="h-4 w-full bg-black/10 mb-3"></div>
                  <div className="h-4 w-full bg-black/10 mb-3"></div>
                  <div className="h-4 w-4/5 bg-black/10 mb-10"></div>
                  <div className="h-12 w-40 bg-black/10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#cfcfcf] px-6 md:px-12 py-32 min-h-screen text-[#111]">
      
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto p-4 py-12 md:p-12 backdrop-blur-md flex"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 w-full max-w-4xl p-8 md:p-16 flex flex-col md:flex-row gap-12 text-white shadow-2xl relative overflow-hidden m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white transition-colors z-50 bg-black/50 p-2 rounded-full"
              >
                <X size={24} />
              </button>

              <div className="absolute top-0 right-0 w-64 h-64 bg-[#df1c1c] blur-[120px] opacity-20 pointer-events-none"></div>
              
              <div className="w-full md:w-1/2 relative z-10 mt-6 md:mt-0">
                <img src={selectedService.img} alt={selectedService.title} className="w-full aspect-[4/5] object-cover grayscale border-4 border-white/10" />
              </div>
              <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-center">
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8 leading-none">{selectedService.title}</h3>
                
                <div className="mb-8">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#df1c1c] mb-4">Core Techniques</h4>
                  <ul className="flex flex-col gap-3">
                    {selectedService.techniques.map((tech: string, idx: number) => (
                      <li key={idx} className="text-sm font-medium tracking-wide text-gray-300 flex items-start gap-3">
                        <span className="text-[#df1c1c] mt-1">●</span> {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#df1c1c] mb-4">Studio Equipment</h4>
                  <ul className="flex flex-col gap-3">
                    {selectedService.equipment.map((equip: string, idx: number) => (
                      <li key={idx} className="text-sm font-medium tracking-wide text-gray-300 flex items-start gap-3">
                        <span className="text-gray-500 mt-1">●</span> {equip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-[6rem] font-black uppercase tracking-tight mb-24 leading-[0.9]">Studio<br/>Offerings</h1>
        </FadeIn>
        
        <div className="flex flex-col gap-24 md:gap-40">
          {services.map((svc, i) => (
            <FadeIn key={i} delay={i * 0.1} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}>
              <div className="w-full md:w-1/2 relative group cursor-pointer" onClick={() => setSelectedService(svc)}>
                 <div className="absolute inset-0 bg-[#df1c1c] translate-x-4 translate-y-4 shadow-xl transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                 <img src={svc.img} alt={svc.title} className="relative z-10 w-full aspect-[4/3] md:aspect-square object-cover grayscale border-[6px] border-[#cfcfcf] transition-transform duration-700 group-hover:-translate-y-2 group-hover:-translate-x-2" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">{svc.title}</h2>
                <p className="text-sm font-medium leading-[2] text-[#333] mb-10 max-w-lg">{svc.desc}</p>
                <div className="flex gap-4">
                  <div className="text-[11px] uppercase tracking-widest font-bold border-2 border-black px-8 py-4 inline-block self-start hover:bg-black hover:text-white transition-colors cursor-pointer">
                    {svc.price}
                  </div>
                  <button onClick={() => setSelectedService(svc)} className="text-[11px] uppercase tracking-widest font-bold border-2 border-transparent bg-black text-white px-8 py-4 inline-block self-start hover:bg-[#df1c1c] hover:border-[#df1c1c] transition-colors cursor-pointer">
                    View Details
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
