import React, { useState, useEffect } from 'react';
import { messages } from '../services/api';
import { Trash2, CheckCircle, Mail, Clock, ShieldAlert, Check } from 'lucide-react';

const MessagesInbox = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await messages.getAll();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching messages', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    try {
      await messages.delete(id);
      setItems(items.filter(i => i._id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression du message');
    }
  };

  const markAsRead = async (id) => {
    try {
      await messages.markRead(id);
      setItems(items.map(i => i._id === id ? { ...i, read: true } : i));
    } catch (err) {
      console.error('Error marking read', err);
    }
  };

  if (loading) return <div className="text-zinc-500 font-black animate-pulse">VÉRIFICATION DE LA BOÎTE DE RÉCEPTION...</div>;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase">Boîte de Réception</h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs ml-1">Soumissions du formulaire de contact de votre portfolio</p>
      </header>

      {items.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 p-20 rounded-[3rem] text-center">
          <Mail size={60} className="mx-auto text-zinc-800 mb-6" />
          <h3 className="text-xl font-bold text-white">Boîte de Réception Vide</h3>
          <p className="text-zinc-500 mt-2">Personne ne vous a encore contacté.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((msg) => (
            <div 
              key={msg._id} 
              className={`bg-zinc-900/50 border rounded-[2.5rem] p-8 transition-all hover:border-zinc-700 ${msg.read ? 'border-zinc-900 opacity-60' : 'border-yellow-400/20 shadow-lg shadow-yellow-400/5'}`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${msg.read ? 'bg-zinc-950 text-zinc-700' : 'bg-yellow-400 text-black'}`}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white tracking-tight">{msg.name}</h4>
                    <p className="text-yellow-400 font-bold text-xs uppercase tracking-widest">{msg.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <Clock size={14} />
                  {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-900 mb-6">
                <p className="text-yellow-400/80 font-bold text-[10px] uppercase tracking-widest mb-2 italic">Sujet : {msg.subject}</p>
                <p className="text-zinc-300 text-sm leading-relaxed">{msg.message}</p>
              </div>

              <div className="flex justify-end gap-3">
                 {!msg.read && (
                    <button 
                      onClick={() => markAsRead(msg._id)}
                      className="bg-zinc-900 text-white px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-zinc-800 transition-all border border-zinc-800"
                    >
                      <Check size={16} /> MARQUER COMME LU
                    </button>
                 )}
                 <button 
                   onClick={() => handleDelete(msg._id)}
                   className="bg-red-500/10 text-red-500 px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                 >
                   <Trash2 size={16} /> SUPPRIMER
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesInbox;
