import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { FadeIn } from '../components/Shared';

const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    if (!CONTACT_FORM_ENDPOINT) {
      setErrorMessage('Contact form is not configured yet. Please email us directly.');
      return;
    }

    if (!navigator.onLine) {
      setErrorMessage("You're offline. Please check your internet connection and try again.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        // Using text/plain avoids a CORS preflight request, which Google Apps
        // Script Web Apps do not reliably support for cross-origin fetch calls.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const result = await response.json().catch(() => ({ success: true }));
      if (result && result.success === false) {
        throw new Error(result.error || 'Submission failed');
      }

      setShowToast(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      setErrorMessage("Something went wrong sending your message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] relative pt-32 md:pt-48 pb-32 min-h-screen text-white overflow-hidden">
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

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">
        <FadeIn className="w-full md:w-1/2">
          <h1 className="text-5xl md:text-[6rem] font-black uppercase tracking-tight mb-8 leading-[0.9]">Let's<br/>Create.</h1>
          <p className="text-[11px] md:text-[13px] font-medium uppercase tracking-[0.15em] leading-[1.8] text-gray-400 mb-16">
            Available for weddings, commercial campaigns,<br/>
            and creative assignments across India.
          </p>

          <div className="flex flex-col gap-10">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Studio Location</h4>
              <p className="text-sm font-medium tracking-widest leading-loose">New Delhi, India</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Direct Inquiry</h4>
              <a href="mailto:hello@shotup.in" className="block text-sm font-medium tracking-widest hover:text-[#df1c1c] transition-colors cursor-pointer mb-2">hello@shotup.in</a>
              <a href="tel:+917905794291" className="block text-sm font-medium tracking-widest hover:text-[#df1c1c] transition-colors">+91 79057 94291</a>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Socials</h4>
              <div className="flex gap-6">
                <a href="/" className="text-xs font-medium tracking-widest hover:text-[#df1c1c] transition-colors uppercase">Instagram</a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="w-full md:w-1/2 bg-[#111] p-8 md:p-14 border border-white/10 shadow-2xl self-start relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#df1c1c] blur-[80px] opacity-20 pointer-events-none"></div>
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-10 relative z-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#df1c1c]">Send a Message</h3>
            <input 
              type="text" 
              placeholder="YOUR NAME"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-transparent border-b border-white/20 py-4 text-xs tracking-widest focus:outline-none focus:border-[#df1c1c] transition-colors"
            />
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-transparent border-b border-white/20 py-4 text-xs tracking-widest focus:outline-none focus:border-[#df1c1c] transition-colors"
            />
            <textarea 
              placeholder="MESSAGE OR PROJECT DETAILS"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="bg-transparent border-b border-white/20 py-4 text-xs tracking-widest focus:outline-none focus:border-[#df1c1c] transition-colors resize-none"
            ></textarea>
            {errorMessage && (
              <div className="flex items-center gap-2 text-[#df1c1c] text-xs tracking-widest">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 border border-white py-5 text-xs tracking-widest font-bold uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white"
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </form>
        </FadeIn>
      </div>
      
      {/* Subtle Background Accent */}
      <div className="absolute left-[-10%] bottom-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#df1c1c] rounded-full blur-[200px] opacity-[0.15] pointer-events-none -z-10"></div>
    </div>
  );
}
