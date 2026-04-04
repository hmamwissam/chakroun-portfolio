import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/50 py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="space-y-4 text-center md:text-left">
          <div className="text-yellow-400 font-black text-2xl tracking-tighter">M.CHAKROUN</div>
          <p className="text-zinc-600 text-xs font-bold tracking-[0.2em] uppercase">
            Ingénierie de Précision & Leadership
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex space-x-6">
            <a href="#" className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-900">
              <Globe size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mohamed-chakrounchak/" className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-900">
              <Linkedin size={20} />
            </a>
          </div>
          <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest">
            © 2026 MOHAMED CHAKROUN. TOUS DROITS RÉSERVÉS.
          </p>
        </div>

        <motion.button 
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-yellow-400 border border-zinc-800 hover:border-yellow-400/50 transition-colors shadow-2xl"
        >
          <ArrowUp size={24} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
