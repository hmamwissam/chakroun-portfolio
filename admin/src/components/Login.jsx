import React, { useState } from 'react';
import { auth } from '../services/api';
import { LogIn, ShieldAlert } from 'lucide-react';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('admin@chakroun.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await auth.login({ email, password });
      localStorage.setItem('adminToken', res.data.token);
      setToken(res.data.token);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 mb-6">
            <LogIn size={40} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">PANNEAU D'ADMINISTRATION</h1>
          <p className="text-zinc-500 font-medium mt-2 uppercase tracking-widest text-[10px]">Mohamed Chakroun Portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 backdrop-blur-xl">
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-3 animate-shake">
              <ShieldAlert size={18} /> {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Adresse Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
              placeholder="admin@chakroun.com"
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 text-white focus:outline-none focus:border-yellow-400/50 transition-all font-medium"
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-black py-5 rounded-2xl hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/10 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? 'AUTHENTIFICATION...' : 'ACCÉDER AU TABLEAU DE BORD'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
