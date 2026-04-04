import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Users, Code, Layout, Cpu, Shield, X, Maximize2, ExternalLink, Layers } from 'lucide-react';
import Section from './Section';

const TechnicalSkills = ({ skills, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const hardSkills = skills.filter(s => s.type === 'hard');
  const softSkills = skills.filter(s => s.type === 'soft').map(s => ({
    ...s,
    icon: s.icon === 'Users' ? <Users size={18} /> : s.icon === 'Layout' ? <Layout size={18} /> : s.icon === 'Shield' ? <Shield size={18} /> : <Cpu size={18} />
  }));

  const projectIconMap = {
    Settings: <Settings size={32} />,
    Cpu: <Cpu size={32} />,
    Layers: <Layers size={32} />,
    Code: <Code size={32} />,
    Layout: <Layout size={32} />,
    Shield: <Shield size={32} />
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('/uploads') ? `http://localhost:5000${path}` : path;
  };

  return (
    <Section id="engineering" title="Expertise Technique" subtitle="Ingénierie de Précision">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/50 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <Settings className="text-yellow-400" size={24} /> Compétences Techniques
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hardSkills.map((skill, i) => (
              <div key={skill._id} className="group flex items-center gap-3 p-3 bg-zinc-950/50 rounded-xl border border-transparent hover:border-yellow-400/20 transition-all">
                <div className="w-2 h-2 rounded-full bg-yellow-400 group-hover:scale-150 transition-transform"></div>
                <div>
                  <p className="text-white font-bold text-sm">{skill.name}</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{skill.category}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/50 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <Users className="text-yellow-400" size={24} /> Savoir-être
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {softSkills.map((skill, i) => (
              <div key={skill._id} className="flex items-center gap-3 p-3 bg-zinc-950/50 rounded-xl border border-transparent hover:border-white/10 transition-all">
                <span className="text-zinc-500">{skill.icon}</span>
                <p className="text-white font-bold text-sm">{skill.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedProject(project)}
            className="group relative bg-zinc-900/50 hover:bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-yellow-400/50 transition-all duration-500 overflow-hidden cursor-pointer"
          >
            {project.image && (
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={getImageUrl(project.image)} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform">
                     <Maximize2 size={24} />
                   </div>
                </div>
              </div>
            )}
            <div className="p-8">
              <div className="absolute top-0 right-0 p-6 text-zinc-800 group-hover:text-yellow-400/20 transition-colors">
                {projectIconMap[project.icon] || <Settings size={32} />}
              </div>
              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors uppercase tracking-tighter">{project.title}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800 group-hover:border-yellow-400/20 group-hover:text-yellow-400 transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-yellow-400/5 blur-2xl group-hover:bg-yellow-400/20 transition-all"></div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-2xl bg-black/90"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-950 w-full max-w-6xl max-h-full rounded-[2rem] border border-zinc-800 overflow-hidden flex flex-col shadow-2xl"
            >
              <header className="p-6 md:p-10 border-b border-zinc-900 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">{selectedProject.title}</h2>
                  <div className="flex gap-2 mt-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-yellow-400/60 uppercase tracking-widest">#{tag}</span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center hover:bg-zinc-800 transition-colors"
                >
                  <X size={24} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <p className="text-zinc-400 text-lg leading-relaxed">{selectedProject.desc}</p>
                      <div className="flex items-center gap-4 pt-6 border-t border-zinc-900">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-yellow-400">
                           {projectIconMap[selectedProject.icon] || <Settings size={28} />}
                        </div>
                        <div>
                           <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Type de Projet</p>
                           <p className="text-white font-bold uppercase">{selectedProject.icon}</p>
                        </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">Galerie Visuelle</h3>
                      <div className="grid grid-cols-1 gap-6">
                         {[selectedProject.image, ...(selectedProject.images || [])].filter(Boolean).map((img, idx) => (
                           <div key={idx} className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
                              <img 
                                src={getImageUrl(img)} 
                                alt={`${selectedProject.title} ${idx}`} 
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                              />
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
              
              <footer className="p-8 border-t border-zinc-900 bg-zinc-950/50 flex justify-end">
                 <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-8 py-4 bg-white text-black font-black text-xs rounded-xl hover:bg-yellow-400 transition-colors uppercase tracking-widest"
                 >
                    Fermer la vue
                 </button>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default TechnicalSkills;
