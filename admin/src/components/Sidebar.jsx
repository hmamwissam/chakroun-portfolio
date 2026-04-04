import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  MessageSquare,
  LogOut,
  ChevronRight,
  Quote as QuoteIcon,
  Phone
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Tableau de bord', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Section Héros', icon: <User size={20} />, path: '/hero' },
    { name: 'Compétences & Outils', icon: <Code2 size={20} />, path: '/skills' },
    { name: 'Expérience', icon: <Briefcase size={20} />, path: '/experience' },
    { name: 'Formation', icon: <Award size={20} />, path: '/training' },
    { name: 'Éducation', icon: <GraduationCap size={20} />, path: '/education' },
    { name: 'Citation', icon: <QuoteIcon size={20} />, path: '/quote' },
    { name: 'Contact', icon: <Phone size={20} />, path: '/contact' },
    { name: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-80 bg-[#09090b] border-r border-zinc-800 p-8 flex flex-col z-50">
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white tracking-tighter">CHAKROUN<span className="text-yellow-400">.</span></h2>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Admin Portfolio</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              group flex items-center justify-between p-4 rounded-2xl transition-all duration-300
              ${isActive 
                ? 'bg-yellow-400 text-black font-bold' 
                : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="text-sm tracking-tight">{item.name}</span>
                </div>
                <ChevronRight size={14} className={`transition-transform duration-300 ${isActive ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="mt-auto flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm"
      >
        <LogOut size={20} />
        Se déconnecter
      </button>
    </aside>
  );
};

export default Sidebar;
