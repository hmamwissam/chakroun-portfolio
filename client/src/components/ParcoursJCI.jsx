import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, Calendar } from 'lucide-react';

const ParcoursJCI = ({ roles }) => {
  if (!roles || roles.length === 0) return null;

  // Sort roles by year descending (latest first)
  const sortedRoles = [...roles].sort((a, b) => b.year - a.year);

  return (
    <div className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Parcours JCI</h3>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">Historique de Leadership & Impact</p>
        </div>

        <div className="relative group">
          {/* Main Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent transform -translate-y-1/2 hidden md:block " />

          {/* Scrollable Container */}
          <div className="flex gap-8 md:gap-0 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar md:h-[750px] items-center">
            {sortedRoles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-[350px] relative px-4 snap-center flex flex-col items-center"
              >
                {/* Year Badge/Tag */}
                <div className={`mb-8 md:mb-0 md:absolute rounded-2xl bg-zinc-950 border border-zinc-800 p-6 w-full hover:border-yellow-400/50 transition-all duration-500 group/item hover:-translate-y-2
                  ${i % 2 === 0 ? 'md:bottom-[calc(50%+40px)]' : 'md:top-[calc(50%+40px)]'}
                `}>
                  {/* Arrow Point */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-950 border-r border-b border-zinc-800 rotate-45 hidden md:block
                    ${i % 2 === 0 ? '-bottom-2' : '-top-2 border-t border-l border-r-0 border-b-0'}
                  `} />

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-500 font-black text-[10px] uppercase tracking-widest">
                      <Calendar size={12} />
                      {role.year}
                    </div>
                    <Shield size={18} className="text-zinc-700 group-hover/item:text-yellow-400 transition-colors" />
                  </div>

                  <h4 className="text-lg font-black text-white mb-1 leading-tight">{role.title}</h4>
                  <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-4">
                    <MapPin size={12} className="text-yellow-400" />
                    {role.sub}
                  </div>
                  
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                    {role.desc}
                  </p>

                  {role.image && (
                    <div className="mt-4 h-24 overflow-hidden rounded-xl border border-zinc-900">
                      <img 
                        src={role.image.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${role.image}` : role.image} 
                        alt={role.title}
                        className="w-full h-full object-cover grayscale opacity-50 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-700"
                      />
                    </div>
                  )}
                </div>

                {/* Vertical Connector Line (Mobile) / Dot (Desktop) */}
                <div className="w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-800 z-10 hidden md:block group-hover:border-yellow-400/30 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcoursJCI;
