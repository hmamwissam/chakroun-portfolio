import React, { useState, useEffect } from 'react';
import { quote } from '../services/api';
import { Save, Loader2, Quote as QuoteIcon } from 'lucide-react';

const QuoteEditor = () => {
  const [data, setData] = useState({ text1: '', highlight: '', text2: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const res = await quote.get();
      if (res.data) setData(res.data);
    } catch (err) {
      console.error('Error fetching quote', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await quote.update(data);
    } catch (err) {
      console.error('Error saving quote', err);
    } finally {
      setSaving(false);
    }
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
          <h1 className="text-3xl font-black text-white tracking-tighter">ÉDITEUR DE <span className="text-yellow-400">CITATION</span></h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-1">Gérer la citation publique du portfolio</p>
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
            <QuoteIcon size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">Détails de la Citation</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Première partie du texte</label>
            <input
              type="text"
              value={data.text1}
              onChange={(e) => setData({ ...data, text1: e.target.value })}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
              placeholder="ex: Mon expérience de formateur renforce..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Texte en évidence</label>
            <input
              type="text"
              value={data.highlight}
              onChange={(e) => setData({ ...data, highlight: e.target.value })}
              className="w-full bg-zinc-950/50 border border-yellow-400/30 rounded-2xl p-4 text-yellow-400 focus:outline-none focus:border-yellow-400 transition-all font-medium"
              placeholder="ex: diriger des équipes"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Deuxième partie du texte</label>
            <input
              type="text"
              value={data.text2}
              onChange={(e) => setData({ ...data, text2: e.target.value })}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
              placeholder="ex: , et gérer des projets efficacement."
            />
          </div>

          {/* Preview */}
          <div className="mt-8 p-6 bg-zinc-950 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 mb-4 text-xs font-bold uppercase">Aperçu</p>
            <p className="text-white text-xl italic font-serif">
              "{data.text1}
              <span className="text-yellow-400 font-bold underline decoration-yellow-400/30 underline-offset-4 px-1">{data.highlight}</span>
              {data.text2}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteEditor;
