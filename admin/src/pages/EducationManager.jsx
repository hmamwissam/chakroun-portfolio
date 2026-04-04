import React, { useState, useEffect } from 'react';
import { education } from '../services/api';
import { Save, Plus, Trash2, GraduationCap, CheckCircle } from 'lucide-react';

const EducationManager = () => {
  const [data, setData] = useState({
    degrees: [],
    certs: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await education.get();
      setData(res.data);
    } catch (err) {
      console.error('Error fetching education', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await education.update(data);
      alert('Éducation mise à jour !');
    } catch (err) {
      alert('Erreur lors de l\'enregistrement de l\'éducation');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-zinc-500 font-black animate-pulse uppercase tracking-[0.2em] text-xs">Synchronisation des identifiants...</div>;

  return (
    <div className="space-y-10 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase">Éducation & Croissance</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs ml-1">Diplômes académiques et certifications professionnelles</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/10"
        >
          <Save size={20} /> {saving ? 'ENREGISTREMENT...' : 'TOUT ENREGISTRER'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Degrees */}
        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <GraduationCap className="text-yellow-400" /> Diplômes
          </h3>
          <div className="space-y-4">
             {data.degrees.map((edu, i) => (
               <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] group relative">
                 <button onClick={() => setData({...data, degrees: data.degrees.filter((_, idx) => idx !== i)})} className="absolute top-6 right-6 text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                 <input value={edu.title} onChange={e => {
                   const newDeg = [...data.degrees];
                   newDeg[i].title = e.target.value;
                   setData({...data, degrees: newDeg});
                 }} className="bg-transparent border-none text-white font-black text-xl w-full focus:outline-none mb-1" placeholder="Titre du diplôme" />
                 <input value={edu.org} onChange={e => {
                   const newDeg = [...data.degrees];
                   newDeg[i].org = e.target.value;
                   setData({...data, degrees: newDeg});
                 }} className="bg-transparent border-none text-yellow-400 font-bold text-[10px] uppercase tracking-widest w-full focus:outline-none mb-4" placeholder="Université / Institut" />
                 <textarea value={edu.note} onChange={e => {
                   const newDeg = [...data.degrees];
                   newDeg[i].note = e.target.value;
                   setData({...data, degrees: newDeg});
                 }} rows={2} className="bg-transparent border-none text-zinc-500 text-sm leading-relaxed w-full focus:outline-none resize-none" placeholder="Notes..." />
               </div>
             ))}
             <button 
               onClick={() => setData({...data, degrees: [...data.degrees, { title: 'Nouveau diplôme', org: 'Nom de l\'université', note: '', current: false }]})}
               className="w-full bg-zinc-900/20 border-2 border-dashed border-zinc-800 rounded-[2rem] p-6 flex items-center justify-center text-zinc-500 hover:border-yellow-400/30 hover:text-white transition-all gap-3 font-bold text-xs"
             >
               + AJOUTER UN DIPLÔME
             </button>
          </div>
        </section>

        {/* Certs */}
        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <CheckCircle className="text-yellow-400" /> Certifications
          </h3>
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] space-y-4">
             {data.certs.map((cert, i) => (
               <div key={i} className="flex items-center gap-4 bg-zinc-950/50 border border-zinc-800/50 p-4 rounded-2xl group">
                 <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-yellow-400 shadow-inner">
                   <CheckCircle size={20} />
                 </div>
                 <div className="flex-1">
                   <input value={cert.title} onChange={e => {
                     const newCtx = [...data.certs];
                     newCtx[i].title = e.target.value;
                     setData({...data, certs: newCtx});
                   }} className="bg-transparent border-none text-white font-bold text-sm w-full focus:outline-none" placeholder="Nom du certificat" />
                   <input value={cert.org} onChange={e => {
                     const newCtx = [...data.certs];
                     newCtx[i].org = e.target.value;
                     setData({...data, certs: newCtx});
                   }} className="bg-transparent border-none text-zinc-500 font-bold text-[10px] uppercase tracking-widest w-full focus:outline-none" placeholder="Organisme de délivrance" />
                 </div>
                 <button onClick={() => setData({...data, certs: data.certs.filter((_, idx) => idx !== i)})} className="text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
               </div>
             ))}
             <button 
               onClick={() => setData({...data, certs: [...data.certs, { title: 'Nouvelle certification', org: 'Émetteur' }]})}
               className="w-full bg-zinc-950 border border-zinc-800 border-dashed rounded-2xl p-4 flex items-center justify-center text-zinc-500 hover:text-white transition-all gap-2 text-[10px] font-black"
             >
               + AJOUTER UN CERTIFICAT
             </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EducationManager;
