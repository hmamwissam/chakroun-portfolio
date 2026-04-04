import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Linkedin, Instagram, Facebook, CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';
import Section from './Section';
import * as api from '../services/api';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  if (!data) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.messages.send(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const socialLinks = [
    ...(data.linkedin ? [{ icon: <Linkedin size={20} />, href: data.linkedin }] : []),
    ...(data.instagram ? [{ icon: <Instagram size={20} />, href: data.instagram }] : []),
    ...(data.facebook ? [{ icon: <Facebook size={20} />, href: data.facebook }] : []),
  ];

  return (
    <Section id="contact" title="Contact" subtitle="Construisons ensemble" className="bg-[#09090b]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Info Side */}
        <div className="lg:w-1/3 space-y-12">
          <div className="space-y-8">
            <h3 className="text-3xl font-black text-white tracking-tighter">INFORMATIONS <br /> DE CONTACT</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-zinc-400 font-bold group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400 font-bold group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <span>{data.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400 font-bold group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                  <MapPin size={20} />
                </div>
                <span>{data.location}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-yellow-400 hover:border-yellow-400/50 transition-all hover:-translate-y-1"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 bg-zinc-900/50 p-8 md:p-12 rounded-[3rem] border border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Nom Complet</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none transition-all" placeholder="Jean Dupont" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Adresse Email</label>
                <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none transition-all" placeholder="jean@exemple.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Sujet</label>
              <input required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none transition-all" placeholder="Demande de projet" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Votre Message</label>
              <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none transition-all resize-none" placeholder="Parlez-moi de votre vision..."></textarea>
            </div>

            <button 
              disabled={status === 'loading'}
              className="group bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/10 active:scale-95 disabled:opacity-50"
            >
              {status === 'loading' ? <Loader2 className="animate-spin" /> : <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              {status === 'loading' ? 'ENVOI EN COURS...' : 'ENVOYER LE MESSAGE'}
            </button>

            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-green-500 font-bold text-sm bg-green-500/10 p-4 rounded-2xl border border-green-500/20">
                <CheckCircle size={18} /> Message envoyé. Je vous répondrai bientôt !
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-red-500 font-bold text-sm bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
                <ShieldAlert size={18} /> Une erreur s'est produite. Veuillez réessayer plus tard.
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
