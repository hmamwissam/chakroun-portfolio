import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle } from 'lucide-react';
import Section from './Section';

const Education = ({ data }) => {
  if (!data) return null;

  return (
    <Section id="education" title="Éducation" subtitle="Parcours Académique" className="bg-zinc-950">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Degrees */}
        <div className="flex-1 space-y-10">
          {data.degrees.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-1 border-transparent hover:border-yellow-400 group"
            >
              <div className="absolute -left-4 top-0 w-1 h-full bg-zinc-800 group-hover:bg-yellow-400 transition-colors"></div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{edu.title}</h3>
              <p className="text-yellow-400 font-bold text-sm tracking-tight mb-4 uppercase">{edu.org}</p>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                {edu.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="lg:w-96 space-y-6">
          <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-800 backdrop-blur-sm">
            <h4 className="text-white font-bold mb-8 flex items-center gap-3">
              <CheckCircle className="text-yellow-400" size={20} /> Certifications
            </h4>
            <div className="space-y-6">
              {data.certs.map((cert, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-1 h-1 rounded-full bg-zinc-700 mt-2 group-hover:bg-yellow-400 transition-colors"></div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight mb-1">{cert.title}</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{cert.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Interests */}
          <div className="grid grid-cols-2 gap-4">
            {data.languages && data.languages.length > 0 && (
              <div className="bg-zinc-900/30 p-6 rounded-3xl border border-zinc-900">
                <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-4">Langues</h5>
                <div className="flex flex-wrap gap-2">
                  {data.languages.map(lang => (
                    <span key={lang} className="text-[10px] font-bold text-yellow-400 bg-yellow-400/5 px-2 py-1 rounded-md border border-yellow-400/10">{lang}</span>
                  ))}
                </div>
              </div>
            )}
            {data.interests && data.interests.length > 0 && (
              <div className="bg-zinc-900/30 p-6 rounded-3xl border border-zinc-900">
                <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-4">Centres d'intérêt</h5>
                <div className="flex flex-wrap gap-2">
                  {data.interests.map(interest => (
                    <span key={interest} className="text-[10px] font-bold text-zinc-500 bg-zinc-500/5 px-2 py-1 rounded-md border border-zinc-500/10">{interest}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-xl shadow-yellow-400/10">
            <GraduationCap size={40} className="mb-4 opacity-40" />
            <h4 className="text-xl font-black leading-tight">Croissance Continue & Innovation.</h4>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Education;
