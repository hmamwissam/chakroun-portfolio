import React, { useState, useRef } from 'react';
import { upload } from '../services/api';
import { Upload, X, ImageIcon, RefreshCw } from 'lucide-react';

const ImageUpload = ({ value, onChange, label, className = "" }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await upload.post(formData);
      onChange(res.data.filePath);
    } catch (err) {
      console.error('Error uploading image', err);
      alert('Échec du téléchargement de l\'image. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const backendUrl = import.meta.env.VITE_API_URL.replace('/api', ''); // Define based on environment if needed

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">{label}</label>}
      
      <div className="relative group">
        {value ? (
          <div className="relative w-full aspect-video md:aspect-square bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden group">
            <img 
              src={value.startsWith('/uploads') ? `${backendUrl}${value}` : value} 
              alt="Uploaded" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-white text-black rounded-xl hover:bg-yellow-400 transition-colors"
                title="Changer l'image"
              >
                <Upload size={18} />
              </button>
              <button 
                type="button" 
                onClick={handleRemove}
                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                title="Supprimer l'image"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 md:h-40 bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-yellow-400/30 hover:bg-zinc-900/50 transition-all group"
          >
            {uploading ? (
              <RefreshCw className="animate-spin text-yellow-400" size={24} />
            ) : (
              <ImageIcon className="text-zinc-500 group-hover:text-yellow-400 transition-colors" size={24} />
            )}
            <span className="text-[10px] font-black text-zinc-500 group-hover:text-white uppercase tracking-widest">
              {uploading ? 'Téléchargement...' : 'Cliquez pour télécharger une image'}
            </span>
          </div>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
