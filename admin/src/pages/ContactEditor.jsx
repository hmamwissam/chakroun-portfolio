import React, { useState, useEffect } from 'react';
import { contactInfo } from '../services/api';
import { Save, Loader2, Phone } from 'lucide-react';

const ContactEditor = () => {
  const [data, setData] = useState({ 
    email: '', 
    phone: '', 
    location: '', 
    linkedin: '', 
    instagram: '', 
    facebook: '' 
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await contactInfo.get();
      if (res.data) setData(res.data);
    } catch (err) {
      console.error('Error fetching contact info', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await contactInfo.update(data);
    } catch (err) {
      console.error('Error saving contact info', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter">CONTACT <span className="text-yellow-400">INFO</span></h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-1">Gérer les coordonnées publiques et les réseaux sociaux</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-yellow-300 transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? 'ENREGISTREMENT...' : 'ENREGISTRER LES MODIFICATIONS'}
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400">
            <Phone size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">Détails du Contact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-zinc-500">
            <label className="text-[10px] font-bold uppercase tracking-widest ml-1">Adresse Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
            />
          </div>
          <div className="space-y-2 text-zinc-500">
            <label className="text-[10px] font-bold uppercase tracking-widest ml-1">Numéro de Téléphone</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
            />
          </div>
          <div className="space-y-2 text-zinc-500 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-widest ml-1">Emplacement</label>
            <input
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
            />
          </div>
        </div>

        <div className="mt-10 mb-8 border-t border-zinc-800/50 pt-8">
          <h2 className="text-xl font-bold text-white mb-6">Réseaux Sociaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-zinc-500">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={data.linkedin || ''}
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
              />
            </div>
            <div className="space-y-2 text-zinc-500">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={data.instagram || ''}
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
              />
            </div>
            <div className="space-y-2 text-zinc-500">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1">Facebook URL</label>
              <input
                type="url"
                name="facebook"
                value={data.facebook || ''}
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
