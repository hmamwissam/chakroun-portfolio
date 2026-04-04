import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Section from './Section';

const Experience = ({ experiences }) => {
  const mainExperiences = experiences.filter(exp => exp.featured);
  const others = experiences.filter(exp => !exp.featured).map(exp => `${exp.company} ${exp.title}`);

  return (
    <Section id="experience" title="Expérience Professionnelle" subtitle="Parcours Professionnel" className="bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-0 space-y-16">
          {mainExperiences.map((exp, i) => (
            <motion.div 
              key={exp._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative pl-10 group"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 border-zinc-950 transition-all duration-500 ${
                exp.current ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'bg-zinc-700 group-hover:bg-yellow-400'
              }`}></div>

              <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all group-hover:bg-zinc-900 shadow-xl">
                <span className={`text-xs font-black tracking-widest uppercase mb-2 inline-block px-3 py-1 rounded-full ${
                  exp.current ? 'bg-yellow-400/10 text-yellow-400' : 'text-zinc-500 bg-zinc-950'
                }`}>
                  {exp.year}
                </span>
                <h3 className="text-2xl font-bold text-white mt-4">{exp.title}</h3>
                <p className="text-yellow-400 font-bold tracking-tight mb-4">{exp.company}</p>
                <p className="text-zinc-400 leading-relaxed text-sm max-w-2xl mb-4">{exp.desc}</p>
                {exp.details && exp.details.length > 0 && (
                  <ul className="space-y-2">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-zinc-500 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                        <span className="text-yellow-400/50 mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {others.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 pt-10 border-t border-zinc-900 flex flex-wrap justify-center gap-4"
          >
            <p className="w-full text-center text-zinc-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Engagements Précédents</p>
            {others.map((item, i) => (
              <span key={i} className="px-6 py-2 rounded-full border border-zinc-800 text-zinc-400 text-xs font-bold hover:border-zinc-600 hover:text-white transition-all">
                {item}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </Section>
  );
};

export default Experience;
