import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, ArrowRight } from 'lucide-react';
import chakImg from '../assets/chak.png';

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-6 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        <div className="flex-1 text-center md:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-yellow-400 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-6">
              {data.badge || 'Précision & Leadership'}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              {data.name?.split(' ')[0] || 'Mohamed'} <br />
              <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.2)]">{data.name?.split(' ')[1] || 'Chakroun'}</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed font-medium mb-10"
          >
            {data.tagline}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a href={data.btnPrimaryHref || '#engineering'} className="group bg-yellow-400 text-black px-8 py-4 rounded-full font-black flex items-center justify-center gap-3 hover:bg-yellow-300 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-yellow-400/10">
              <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" /> 
              {data.btnPrimaryLabel || 'VOIR L\'INGÉNIERIE'}
            </a>
            <a href={data.btnSecondaryHref || '#training'} className="group border border-zinc-800 text-white px-8 py-4 rounded-full font-black flex items-center justify-center gap-3 hover:bg-zinc-900 hover:border-zinc-700 transition-all hover:scale-105 active:scale-95">
              <Users size={20} /> 
              {data.btnSecondaryLabel || 'LEADERSHIP'}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 relative w-full max-w-md"
        >
          {/* Decorative Frames */}
          <div className="absolute -inset-4 border border-yellow-400/20 rounded-[2rem] -rotate-6 scale-105"></div>
          <div className="absolute -inset-4 border border-zinc-800 rounded-[2rem] rotate-3"></div>
          
          <div className="relative z-10 overflow-hidden rounded-[1.5rem] bg-zinc-900 aspect-[4/5] shadow-2xl">
            <img 
              src={data.image?.startsWith('/uploads') ? `http://localhost:5000${data.image}` : (data.image || chakImg)} 
              alt={data.name || 'Mohamed Chakroun'} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Floating Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 md:-right-10 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-2xl z-20 backdrop-blur-md"
          >
            <p className="text-yellow-400 font-black text-2xl">{data.statValue || '50+'}</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{data.statLabel || 'Formations Animées'}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
