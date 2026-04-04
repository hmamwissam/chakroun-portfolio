import React, { useState, useEffect } from 'react';
import { experience } from '../services/api';
import { Plus, Trash2, Calendar, Briefcase, MapPin, Save, X } from 'lucide-react';

const ExperienceManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    company: '',
    desc: '',
    current: false,
    featured: true,
    order: 0
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await experience.getAll();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching experience', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await experience.update(editingItem._id, formData);
      } else {
        await experience.create(formData);
      }
      fetchItems();
      resetForm();
    } catch (err) {
      alert('Error saving experience');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette entrée ?')) return;
    try {
      await experience.delete(id);
      setItems(items.filter(i => i._id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression de l\'entrée');
    }
  };

  const resetForm = () => {
    setFormData({ year: '', title: '', company: '', desc: '', current: false, featured: true, order: 0 });
    setEditingItem(null);
    setShowModal(false);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  if (loading) return <div className="text-zinc-500 font-black animate-pulse uppercase tracking-[0.2em] text-xs">Synchronisation de la chronologie...</div>;

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase">Expérience Professionnelle</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs ml-1">Parcours professionnel et gestion de la chronologie</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/10"
        >
          <Plus size={20} /> AJOUTER UNE EXPÉRIENCE
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] group hover:border-zinc-700 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex gap-8 items-start">
              <div className={`w-16 h-16 rounded-3xl shrink-0 flex items-center justify-center border transition-colors ${item.current ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}>
                <Briefcase size={28} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">{item.year}</span>
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                <p className="text-zinc-400 font-bold text-sm tracking-tight">{item.company}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => openEdit(item)} className="p-4 rounded-2xl bg-zinc-950 text-zinc-500 hover:text-white transition-all"><X size={18} className="rotate-45" /></button>
              <button onClick={() => handleDelete(item._id)} className="p-4 rounded-2xl bg-zinc-950 text-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/60">
          <div className="bg-[#09090b] w-full max-w-2xl rounded-[3rem] border border-zinc-800 p-12 relative shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
             
             <header className="flex items-center justify-between mb-10 relative z-10">
               <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{editingItem ? 'Modifier l\'entrée' : 'Nouvelle Expérience'}</h2>
               <button onClick={resetForm} className="text-zinc-500 hover:text-white transition-all"><X size={24} /></button>
             </header>

             <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Année(s)</label>
                   <input required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" placeholder="2025 - Présent" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Entreprise</label>
                   <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" placeholder="SECOMET" />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Titre du Poste</label>
                 <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" placeholder="Ingénieur Mécanique" />
               </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Description Résumée</label>
                  <textarea required rows={2} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none resize-none" placeholder="Bref aperçu..." />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Points Détaillés</label>
                  <div className="space-y-3">
                    {formData.details?.map((detail, idx) => (
                      <div key={idx} className="flex gap-3">
                        <input 
                          value={detail} 
                          onChange={e => {
                            const newDetails = [...formData.details];
                            newDetails[idx] = e.target.value;
                            setFormData({...formData, details: newDetails});
                          }}
                          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:outline-none"
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            const newDetails = formData.details.filter((_, i) => i !== idx);
                            setFormData({...formData, details: newDetails});
                          }}
                          className="p-3 text-zinc-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, details: [...(formData.details || []), '']})}
                      className="w-full py-3 border border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:border-zinc-700 transition-all text-xs font-black"
                    >
                      + AJOUTER UN POINT
                    </button>
                  </div>
                </div>

               <div className="flex gap-8 pt-4">
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <input type="checkbox" checked={formData.current} onChange={e => setFormData({...formData, current: e.target.checked})} className="hidden" />
                   <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.current ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-zinc-800 bg-zinc-950 text-transparent'}`}><Save size={14} /></div>
                   <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">Rôle Actuel</span>
                 </label>
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="hidden" />
                   <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.featured ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-zinc-800 bg-zinc-950 text-transparent'}`}><Save size={14} /></div>
                   <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">Mis en Évidence</span>
                 </label>
               </div>

               <button type="submit" className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-zinc-200 transition-all mt-6 shadow-xl shadow-white/5">
                 {editingItem ? 'METTRE À JOUR' : 'AJOUTER À LA CHRONOLOGIE'}
               </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
