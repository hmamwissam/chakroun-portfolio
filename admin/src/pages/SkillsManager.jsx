import React, { useState, useEffect } from 'react';
import { skills, projects as projectsApi } from '../services/api';
import { Plus, Trash2, Edit3, Settings, Code, Layers, Cpu, Shield, Save, X, Layout } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const projectIconMap = {
  Settings: <Settings size={28} />,
  Cpu: <Cpu size={28} />,
  Layers: <Layers size={28} />,
  Code: <Code size={28} />,
  Layout: <Layout size={28} />,
  Shield: <Shield size={28} />
};

const SkillsManager = () => {
  const [skillList, setSkillList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('skills');

  // Modals state
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const [skillForm, setSkillForm] = useState({ name: '', category: '', type: 'hard', order: 0 });
  const [projectForm, setProjectForm] = useState({ title: '', desc: '', tags: [], icon: 'Settings', image: '', images: [], order: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [s, p] = await Promise.all([skills.getAll(), projectsApi.getAll()]);
      setSkillList(s.data);
      setProjectList(p.data);
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  // Skill Handlers
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await skills.update(editingSkill._id, skillForm);
      } else {
        await skills.create(skillForm);
      }
      fetchData();
      closeSkillModal();
    } catch (err) { alert('Error saving skill'); }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await skills.delete(id);
      setSkillList(skillList.filter(s => s._id !== id));
    } catch (err) { alert('Error deleting skill'); }
  };

  const openSkillModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm(skill);
    } else {
      setEditingSkill(null);
      setSkillForm({ name: '', category: '', type: 'hard', order: skillList.length });
    }
    setShowSkillModal(true);
  };

  const closeSkillModal = () => {
    setShowSkillModal(false);
    setEditingSkill(null);
  };

  // Project Handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectsApi.update(editingProject._id, projectForm);
      } else {
        await projectsApi.create(projectForm);
      }
      fetchData();
      closeProjectModal();
    } catch (err) { alert('Error saving project'); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await projectsApi.delete(id);
      setProjectList(projectList.filter(p => p._id !== id));
    } catch (err) { alert('Error deleting project'); }
  };

  const openProjectModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({ ...project, images: project.images || [] });
    } else {
      setEditingProject(null);
      setProjectForm({ title: '', desc: '', tags: [], icon: 'Settings', image: '', images: [], order: projectList.length });
    }
    setShowProjectModal(true);
  };

  const closeProjectModal = () => {
    setShowProjectModal(false);
    setEditingProject(null);
  };

  if (loading) return <div className="text-zinc-500 font-black animate-pulse">CHARGEMENT DES DONNÉES...</div>;

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase">COMPÉTENCES & PROJETS</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs ml-1">Gérer l'expertise technique et les projets</p>
        </div>
        <div className="flex bg-zinc-900 rounded-2xl p-1.5 border border-zinc-800">
          <button 
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'skills' ? 'bg-yellow-400 text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            COMPÉTENCES
          </button>
          <button 
             onClick={() => setActiveTab('projects')}
             className={`px-6 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'projects' ? 'bg-yellow-400 text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            PROJETS
          </button>
        </div>
      </header>

      {activeTab === 'skills' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => openSkillModal()}
            className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:border-yellow-400/30 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-yellow-400 group-hover:text-black mb-4 transition-all">
              <Plus size={24} />
            </div>
            <p className="text-white font-bold">Ajouter une compétence</p>
          </div>

          {skillList.map((skill) => (
            <div key={skill._id} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] group hover:border-zinc-700 transition-all relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]"></div>
                <div>
                  <h4 className="text-white font-bold">{skill.name}</h4>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{skill.category || skill.type}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-zinc-800">
                <button 
                  onClick={() => openSkillModal(skill)}
                  className="flex-1 bg-zinc-950 text-zinc-400 p-3 rounded-xl text-[10px] font-black hover:text-white transition-all"
                >
                  MODIFIER
                </button>
                <button 
                  onClick={() => handleDeleteSkill(skill._id)}
                  className="bg-zinc-950 text-red-500/50 p-3 rounded-xl text-[10px] font-black hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button 
            onClick={() => openProjectModal()}
            className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs flex items-center gap-2 hover:bg-zinc-200 transition-all mb-4"
          >
            <Plus size={18} /> AJOUTER UN PROJET
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectList.map((project) => (
              <div key={project._id} className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[3rem] group space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-900 flex items-center justify-center text-yellow-400 shadow-inner">
                    {projectIconMap[project.icon] || <Settings size={28} />}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openProjectModal(project)}
                      className="p-3 rounded-xl bg-zinc-950 text-zinc-500 hover:text-white transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                       onClick={() => handleDeleteProject(project._id)}
                       className="p-3 rounded-xl bg-zinc-950 text-red-500/50 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">{project.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">{project.desc}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/50">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-950 px-4 py-1.5 rounded-full border border-zinc-900">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/60">
          <div className="bg-[#09090b] w-full max-w-lg rounded-[3rem] border border-zinc-800 p-12 relative shadow-2xl">
             <header className="flex items-center justify-between mb-10">
               <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{editingSkill ? 'Modifier la compétence' : 'Nouvelle compétence'}</h2>
               <button onClick={closeSkillModal} className="text-zinc-500 hover:text-white transition-all"><X size={24} /></button>
             </header>
             <form onSubmit={handleSkillSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Nom de la compétence</label>
                  <input required value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" placeholder="SolidWorks" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Catégorie</label>
                    <input value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" placeholder="CFAO" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Type</label>
                    <select value={skillForm.type} onChange={e => setSkillForm({...skillForm, type: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none appearance-none">
                      <option value="hard">Compétence Technique</option>
                      <option value="soft">Savoir-être</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-zinc-200 transition-all mt-6">
                  {editingSkill ? 'METTRE À JOUR' : 'CRÉER LA COMPÉTENCE'}
                </button>
             </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/60">
          <div className="bg-[#09090b] w-full max-w-2xl rounded-[3rem] border border-zinc-800 p-12 relative shadow-2xl overflow-y-auto max-h-[90vh]">
             <header className="flex items-center justify-between mb-10">
               <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{editingProject ? 'Modifier le projet' : 'Nouveau Projet'}</h2>
               <button onClick={closeProjectModal} className="text-zinc-500 hover:text-white transition-all"><X size={24} /></button>
             </header>
             <form onSubmit={handleProjectSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Titre du projet</label>
                  <input required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" placeholder="Vireur de Soudure" />
                </div>
                <div className="space-y-4">
                  <ImageUpload 
                    label="Image principale (Cover)"
                    value={projectForm.image}
                    onChange={val => setProjectForm({...projectForm, image: val})}
                  />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Galerie d'images</label>
                      <button 
                        type="button"
                        onClick={() => setProjectForm({...projectForm, images: [...projectForm.images, '']})}
                        className="flex items-center gap-1 text-[10px] font-black text-yellow-400 hover:text-yellow-300 transition-colors uppercase tracking-widest"
                      >
                        <Plus size={14} /> Ajouter une image
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {projectForm.images.map((img, index) => (
                        <div key={index} className="relative">
                          <ImageUpload 
                            value={img}
                            onChange={val => {
                              const newImages = [...projectForm.images];
                              newImages[index] = val;
                              setProjectForm({...projectForm, images: newImages});
                            }}
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const newImages = projectForm.images.filter((_, i) => i !== index);
                              setProjectForm({...projectForm, images: newImages});
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Description</label>
                  <textarea required rows={4} value={projectForm.desc} onChange={e => setProjectForm({...projectForm, desc: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Type d'icône</label>
                    <select value={projectForm.icon} onChange={e => setProjectForm({...projectForm, icon: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none appearance-none">
                      {Object.keys(projectIconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Tags (séparés par des virgules)</label>
                    <input value={projectForm.tags.join(', ')} onChange={e => setProjectForm({...projectForm, tags: e.target.value.split(',').map(t => t.trim())})} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-yellow-400/50 outline-none" placeholder="Tag1, Tag2" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-zinc-200 transition-all mt-6 shadow-xl shadow-white/5">
                  {editingProject ? 'METTRE À JOUR' : 'CRÉER LE PROJET'}
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
