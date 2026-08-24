import { Link } from 'react-router-dom';
import { FadeIn } from '../components/Shared';

export default function NotFound() {
  return (
    <div className="bg-[#0a0a0a] relative pt-32 md:pt-48 pb-32 min-h-screen text-white overflow-hidden flex items-center">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        <FadeIn>
          <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-[#df1c1c] mb-6">Error 404</h4>
          <h1 className="text-5xl md:text-[7rem] font-black uppercase tracking-tight mb-8 leading-[0.9]">
            Page Not<br/>Found.
          </h1>
          <p className="text-[11px] md:text-[13px] font-medium uppercase tracking-[0.15em] leading-[1.8] text-gray-400 mb-12 max-w-md">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <Link
            to="/"
            className="inline-block border border-white py-5 px-10 text-xs tracking-widest font-bold uppercase hover:bg-white hover:text-black transition-colors"
          >
            Back to Home
          </Link>
        </FadeIn>
      </div>

      {/* Subtle Background Accent */}
      <div className="absolute left-[-10%] bottom-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#df1c1c] rounded-full blur-[200px] opacity-[0.15] pointer-events-none -z-10"></div>
    </div>
  );
}
