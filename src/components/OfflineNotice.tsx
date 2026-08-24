import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff } from 'lucide-react';

export default function OfflineNotice() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-[200] bg-[#df1c1c] text-white flex items-center justify-center gap-3 py-3 px-4"
        >
          <WifiOff size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">
            You are offline — check your internet connection
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
