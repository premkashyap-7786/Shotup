import { FadeIn } from '../components/Shared';

export default function About() {
  return (
    <div className="bg-[#cfcfcf] text-[#111] min-h-screen pt-32">
      <section className="px-6 md:px-12 pb-24 md:pb-32 max-w-[1400px] mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-[6rem] font-black uppercase tracking-tight mb-16 leading-[0.9]">Behind<br/>The Lens</h1>
        </FadeIn>
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <FadeIn delay={0.2} className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#df1c1c] translate-x-4 translate-y-4 shadow-xl -z-10"></div>
              <img src="https://loremflickr.com/1200/1200/india,cinematographer?lock=111" alt="Photographer in action" className="w-full aspect-[4/5] object-cover grayscale border-[6px] border-[#cfcfcf] relative z-10" />
            </div>
          </FadeIn>
          <FadeIn delay={0.4} className="w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-8">A Journey in Monochrome</h3>
            <p className="text-sm font-medium leading-[2] text-[#333] mb-8">
              At Shotup.in, we are dedicated to pushing the boundaries of visual storytelling. Based in India, our studio focuses on delivering premium, high-impact photography and cinematography for weddings, brands, and creators.
            </p>
            <p className="text-sm font-medium leading-[2] text-[#333] mb-8">
              Our work is characterized by a commitment to authenticity and cinematic quality. Whether capturing the intimate moments of a wedding or the sleek details of a commercial product, we ensure every frame is timeless, modern, and aligned with your vision.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-black/20">
              <div>
                <div className="text-4xl md:text-5xl font-black mb-2">10+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black mb-2">500+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold">Projects Delivered</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#0a0a0a] text-white py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Our Core Philosophy</h2>
            <p className="text-sm md:text-base font-medium leading-[2] text-gray-400 max-w-2xl mx-auto">
              Every project we take on is approached with a cinematic lens and an editorial eye. We believe in visual storytelling that transcends trends—creating lasting, impactful media for brands, couples, and creators.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
