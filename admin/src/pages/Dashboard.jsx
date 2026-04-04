import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Code2, 
  Briefcase,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { skills, experience, messages } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    skills: 0,
    experience: 0,
    messages: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [s, e, m] = await Promise.all([
          skills.getAll(),
          experience.getAll(),
          messages.getAll()
        ]);
        setStats({
          skills: s.data.length,
          experience: e.data.length,
          messages: m.data.length,
          unreadMessages: m.data.filter(msg => !msg.read).length
        });
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { name: 'Total Compétences', value: stats.skills, icon: <Code2 />, color: 'bg-blue-500' },
    { name: 'Expérience', value: stats.experience, icon: <Briefcase />, color: 'bg-purple-500' },
    { name: 'Messages Totaux', value: stats.messages, icon: <MessageSquare />, color: 'bg-yellow-400' },
    { name: 'Non lus', value: stats.unreadMessages, icon: <TrendingUp />, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tighter mb-2">BIENVENUE, MOHAMED</h1>
        <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">Système de gestion de portfolio v1.0</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] hover:border-zinc-700 transition-all group">
            <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center text-black mb-6 shadow-lg shadow-black/20`}>
              {card.icon}
            </div>
            <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-1">{card.name}</p>
            <h3 className="text-4xl font-black text-white">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-10 rounded-[2.5rem] flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Statut du Portfolio en Direct</h3>
          <p className="text-zinc-500 text-sm">Votre portfolio public est actuellement synchronisé avec cette base de données.</p>
        </div>
        <a 
          href="http://localhost:5173" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 text-sm"
        >
          VOIR LE SITE EN DIRECT <ArrowRight size={18} />
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
