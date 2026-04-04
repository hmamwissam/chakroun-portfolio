import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import * as api from './services/api';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechnicalSkills from './components/TechnicalSkills';
import Experience from './components/Experience';
import Quote from './components/Quote';
import Training from './components/Training';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [data, setData] = useState({
    hero: null,
    skills: [],
    projects: [],
    experience: [],
    training: null,
    education: null,
    quote: null,
    contactInfo: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [h, s, p, e, t, edu, q, c] = await Promise.all([
          api.hero.get(),
          api.skills.getAll(),
          api.projects.getAll(),
          api.experience.getAll(),
          api.training.get(),
          api.education.get(),
          api.quote.get(),
          api.contactInfo.get()
        ]);
        setData({
          hero: h.data,
          skills: s.data,
          projects: p.data,
          experience: e.data,
          training: t.data,
          education: edu.data,
          quote: q.data,
          contactInfo: c.data
        });
      } catch (err) {
        console.error('Error fetching portfolio data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#09090b] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-zinc-800 border-t-yellow-400 rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-black tracking-widest text-[10px] uppercase">Initialisation de l'Expérience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#09090b] min-h-screen text-zinc-300 selection:bg-yellow-400 selection:text-black antialiased overflow-x-hidden">
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero data={data.hero} />
        
        {/* Bridging Section (Integrated into Hero and next sections flow) */}
        
        <TechnicalSkills skills={data.skills} projects={data.projects} />
        
        <Quote data={data.quote} />
        
        <Experience experiences={data.experience} />
        
        <Training data={data.training} />
        
        <Education data={data.education} />
        
        <Contact data={data.contactInfo} />
      </main>

      <Footer />
      
    </div>
  );
}