import React, { useState, useEffect } from 'react';
import { training } from '../services/api';
import { Save, Plus, Trash2, Award, Users, BookOpen, Shield, HelpCircle } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const TrainingManager = () => {
  const [data, setData] = useState({
    bio: '',
    featuredWorkshop: '',
    topics: [],
    stats: [],
    roles: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await training.get();
      setData(res.data);
    } catch (err) {
      console.error('Error fetching training data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await training.update(data);
      alert('Section formation mise à jour !');
    } catch (err) {
      alert('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-zinc-500 font-black animate-pulse">SYNCHRONISATION DES DONNÉES JCI...</div>;

  return (
    <div className="space-y-10 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase">Formation & Leadership</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs ml-1">Profil de formateur JCI et statistiques</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/10"
        >
          <Save size={20} /> {saving ? 'ENREGISTREMENT...' : 'TOUT ENREGISTRER'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bio & Featured */}
        <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 space-y-6">
          <h3 className="text-white font-bold flex items-center gap-3 mb-2"><Award size={20} className="text-yellow-400" /> Identité du Formateur</h3>
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Bio de Formation</label>
            <textarea value={data.bio} onChange={e => setData({...data, bio: e.target.value})} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none resize-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Titre de l'Atelier en Vedette</label>
            <input value={data.featuredWorkshop} onChange={e => setData({...data, featuredWorkshop: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" />
          </div>
          <div className="space-y-2">
            <ImageUpload 
              label="Image de l'Atelier en Vedette"
              value={data.featuredWorkshopImage}
              onChange={val => setData({...data, featuredWorkshopImage: val})}
            />
          </div>
        </div>

        {/* Topics */}
        <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 space-y-6">
          <h3 className="text-white font-bold flex items-center gap-3 mb-2"><BookOpen size={20} className="text-yellow-400" /> Sujets Clés</h3>
          <div className="flex flex-wrap gap-3">
             {data.topics.map((topic, i) => (
               <div key={i} className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-3 group">
                 <span className="text-sm font-bold text-white">{topic}</span>
                 <button onClick={() => setData({...data, topics: data.topics.filter((_, idx) => idx !== i)})} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
               </div>
             ))}
             <button 
               onClick={() => {
                 const t = prompt('Enter new topic:');
                 if(t) setData({...data, topics: [...data.topics, t]})
               }}
               className="bg-zinc-800/30 border border-zinc-800 border-dashed px-4 py-2 rounded-xl text-zinc-500 hover:text-white transition-all text-xs font-black"
             >
               + AJOUTER UN SUJET
             </button>
          </div>
        </div>
      </div>

      {/* Sessions Section */}
      <section className="space-y-6">
        <h3 className="text-xl font-black text-white uppercase tracking-tight">Sessions de Formation (avec Photos)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {data.sessions?.map((session, i) => (
             <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] group relative space-y-4">
                <button onClick={() => {
                  const newSessions = data.sessions.filter((_, idx) => idx !== i);
                  setData({...data, sessions: newSessions});
                }} className="absolute top-6 right-6 text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Titre de la Session</label>
                    <input value={session.title} onChange={e => {
                      const newSessions = [...data.sessions];
                      newSessions[i].title = e.target.value;
                      setData({...data, sessions: newSessions});
                    }} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Date</label>
                    <input value={session.date} onChange={e => {
                      const newSessions = [...data.sessions];
                      newSessions[i].date = e.target.value;
                      setData({...data, sessions: newSessions});
                    }} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <ImageUpload 
                    label="Image de la Session"
                    value={session.image}
                    onChange={val => {
                      const newSessions = [...data.sessions];
                      newSessions[i].image = val;
                      setData({...data, sessions: newSessions});
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Description</label>
                  <textarea value={session.desc} onChange={e => {
                    const newSessions = [...data.sessions];
                    newSessions[i].desc = e.target.value;
                    setData({...data, sessions: newSessions});
                  }} rows={2} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:outline-none resize-none" />
                </div>
             </div>
           ))}
           <button 
             onClick={() => setData({...data, sessions: [...(data.sessions || []), { title: 'New Session', date: '', desc: '', image: '' }]})}
             className="bg-zinc-900/20 border-2 border-dashed border-zinc-800 rounded-[2rem] p-8 flex flex-col items-center justify-center text-zinc-500 hover:border-yellow-400/30 hover:text-white transition-all gap-3"
           >
             <Plus size={32} />
             <span className="font-bold">Ajouter une Session</span>
           </button>
        </div>
      </section>

      {/* Roles Section */}
      <section className="space-y-6">
        <h3 className="text-xl font-black text-white uppercase tracking-tight">Parcours JCI (Historique & Leadership)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {data.roles.map((role, i) => (
             <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] group relative space-y-4">
               <button onClick={() => setData({...data, roles: data.roles.filter((_, idx) => idx !== i)})} className="absolute top-6 right-6 text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
               <Shield size={24} className="text-yellow-400 mb-2" />
               
               <div className="flex gap-4">
                 <div className="flex-1 space-y-1">
                   <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Année</label>
                   <input value={role.year} onChange={e => {
                     const newRoles = [...data.roles];
                     newRoles[i].year = e.target.value;
                     setData({...data, roles: newRoles});
                   }} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm w-full focus:outline-none" placeholder="2025" />
                 </div>
                 <div className="flex-[2] space-y-1">
                   <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Titre du Rôle</label>
                   <input value={role.title} onChange={e => {
                     const newRoles = [...data.roles];
                     newRoles[i].title = e.target.value;
                     setData({...data, roles: newRoles});
                   }} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm w-full focus:outline-none" placeholder="Titre" />
                 </div>
               </div>
               
               <div className="space-y-1">
                 <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Organisation / OLM</label>
                 <input value={role.sub} onChange={e => {
                   const newRoles = [...data.roles];
                   newRoles[i].sub = e.target.value;
                   setData({...data, roles: newRoles});
                 }} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm w-full focus:outline-none" placeholder="OLM Fondouk Djedid" />
               </div>

               <div className="space-y-2">
                 <ImageUpload 
                   label="Image du Rôle"
                   value={role.image}
                   onChange={val => {
                     const newRoles = [...data.roles];
                     newRoles[i].image = val;
                     setData({...data, roles: newRoles});
                   }}
                 />
               </div>

               <div className="space-y-1">
                 <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Description / Impact</label>
                 <textarea value={role.desc} onChange={e => {
                   const newRoles = [...data.roles];
                   newRoles[i].desc = e.target.value;
                   setData({...data, roles: newRoles});
                 }} rows={3} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm w-full focus:outline-none resize-none" placeholder="Description du rôle..." />
               </div>
             </div>
           ))}
           <button 
             onClick={() => setData({...data, roles: [...data.roles, { title: 'New Role', sub: 'OLM/Zone (2025)', desc: '', image: '' }]})}
             className="bg-zinc-900/20 border-2 border-dashed border-zinc-800 rounded-[2rem] p-8 flex flex-col items-center justify-center text-zinc-500 hover:border-yellow-400/30 hover:text-white transition-all gap-3"
           >
             <Plus size={32} />
             <span className="font-bold">Ajouter un Échelon de Parcours</span>
           </button>
        </div>
      </section>
    </div>
  );
};

export default TrainingManager;
