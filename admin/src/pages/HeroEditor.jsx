import React, { useState, useEffect } from 'react';
import { hero } from '../services/api';
import { Save, User, RefreshCw, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const HeroEditor = () => {
  const [formData, setFormData] = useState({
    name: '',
    badge: '',
    tagline: '',
    statValue: '',
    statLabel: '',
    btnPrimaryLabel: '',
    btnPrimaryHref: '',
    btnSecondaryLabel: '',
    btnSecondaryHref: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await hero.get();
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching hero data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await hero.update(formData);
      setMessage('Section héros mise à jour avec succès !');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error updating hero', err);
      setMessage('Erreur lors de la mise à jour de la section héros');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-zinc-500 font-black animate-pulse">CHARGEMENT DES DONNÉES DU HÉROS...</div>;

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase">Section Héros</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs ml-1">Marque et identité en haut de page</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={saving}
          className="bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/10 disabled:opacity-50"
        >
          {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
          ENREGISTRER LES MODIFICATIONS
        </button>
      </header>

      {message && (
        <div className={`p-6 rounded-2xl border font-bold text-sm ${message.includes('Error') ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name & Badge */}
        <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 space-y-6">
          <h3 className="text-white font-bold flex items-center gap-3 mb-2"><User size={20} className="text-yellow-400" /> Identité</h3>
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Nom Complet</label>
            <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" placeholder="Mohamed Chakroun" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Titre du Badge</label>
            <input name="badge" value={formData.badge} onChange={handleChange} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" placeholder="Précision & Leadership" />
          </div>
        </div>

        {/* Tagline */}
        <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 space-y-6">
          <h3 className="text-white font-bold flex items-center gap-3 mb-2">Slogan & Bio</h3>
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Slogan Principal</label>
            <textarea name="tagline" rows={5} value={formData.tagline} onChange={handleChange} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none resize-none" placeholder="Entrez votre bio..." />
          </div>
        </div>

        {/* Floating Stat */}
        <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 space-y-6">
          <h3 className="text-white font-bold flex items-center gap-3 mb-2">Statistique du Badge</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Valeur (ex: 50+)</label>
              <input name="statValue" value={formData.statValue} onChange={handleChange} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Étiquette</label>
              <input name="statLabel" value={formData.statLabel} onChange={handleChange} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" />
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 space-y-6">
          <h3 className="text-white font-bold flex items-center gap-3 mb-2"><ImageIcon size={20} className="text-yellow-400" /> Image du Héros</h3>
          <div className="space-y-2">
            <ImageUpload 
              label="Image de Profil / Héros"
              value={formData.image}
              onChange={val => setFormData({...formData, image: val})}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 space-y-6">
          <h3 className="text-white font-bold flex items-center gap-3 mb-2">Boutons d'Appel à l'Action</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Étiquette Principale</label>
              <input name="btnPrimaryLabel" value={formData.btnPrimaryLabel} onChange={handleChange} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Lien Principal</label>
              <input name="btnPrimaryHref" value={formData.btnPrimaryHref} onChange={handleChange} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Étiquette Secondaire</label>
              <input name="btnSecondaryLabel" value={formData.btnSecondaryLabel} onChange={handleChange} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Lien Secondaire</label>
              <input name="btnSecondaryHref" value={formData.btnSecondaryHref} onChange={handleChange} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeroEditor;
