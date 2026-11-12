import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Shield, HelpCircle } from 'lucide-react';
import Section from './Section';
import ParcoursJCI from './ParcoursJCI';
import { getImageUrl } from '../utils/imageUrl';

const Training = ({ data }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (!data) return null;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Section id="training" title="Leadership & Formation" subtitle="Formateur JCI" className="bg-[#09090b]">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-400">
              <Award size={20} />
              <span className="font-black text-xs uppercase tracking-widest">Formateur JCI Certifié</span>
            </div>
            <p className="text-zinc-400 text-lg leading-relaxed italic">
              "{data.bio}"
            </p>
            <div className="pt-6 border-t border-zinc-900 flex flex-wrap gap-3">
              {data.topics.map(topic => (
                <span key={topic} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold">
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Featured Stats */}
          <div className="grid grid-cols-2 gap-6">
            {data.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 text-center hover:border-yellow-400/20 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-yellow-400 mx-auto mb-4">
                  {stat.label.includes('Trainings') ? <BookOpen size={24} /> : stat.label.includes('Members') ? <Users size={24} /> : <Award size={24} />}
                </div>
                <h4 className="text-3xl font-black text-white mb-1">{stat.value}</h4>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* JCI Leadership Journey - Horizontal Timeline */}
        <ParcoursJCI roles={data.roles} />

        {/* Training Sessions with Pics */}
        {data.sessions && data.sessions.length > 0 && (
          <div className="space-y-12 relative">
            <h3 className="text-2xl font-black text-white text-center uppercase tracking-tighter">Sessions de Formation</h3>
            
            {/* Edge fade masks for horizontal scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none mt-20"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none mt-20"></div>

            <div 
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex flex-nowrap gap-6 md:gap-10 overflow-x-auto pb-12 pt-4 px-6 md:px-12 snap-x snap-mandatory scrollbar-hide no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${isDragging ? 'snap-none' : ''}`}
            >
              {data.sessions.map((session, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-zinc-900/30 backdrop-blur-sm rounded-[2.5rem] border border-zinc-800/50 overflow-hidden hover:border-yellow-400/40 hover:bg-zinc-900/60 transition-all duration-500 flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] snap-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/5"
                >
                  {session.image && (
                    <div className="h-56 md:h-64 overflow-hidden relative">
                      <img 
                        src={getImageUrl(session.image)}
                        alt={session.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>
                      <div className="absolute bottom-6 left-8 right-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                         <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 font-black text-[9px] uppercase tracking-[0.3em] mb-3 backdrop-blur-md">
                           {session.date}
                         </span>
                         <h4 className="text-xl md:text-2xl font-black text-white leading-tight">{session.title}</h4>
                      </div>
                    </div>
                  )}
                  <div className="p-8 relative">
                     <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50"></div>
                     <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{session.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Closing Quote / Workshop */}
        <div className="text-center pt-20 relative">
          {data.featuredWorkshopImage && (
            <div className="absolute inset-0 -top-20 opacity-10 blur-3xl pointer-events-none">
              <img 
                src={getImageUrl(data.featuredWorkshopImage)}
                alt={data.featuredWorkshop || 'Atelier'}
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.4em] mb-4">Atelier en Vedette</p>
          <h4 className="text-3xl md:text-5xl font-black text-white tracking-tighter max-w-4xl mx-auto leading-none">
            {data.featuredWorkshop}
          </h4>
        </div>
      </div>
    </Section>
  );
};

export default Training;
