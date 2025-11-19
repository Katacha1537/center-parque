
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useData } from '../../context/DataContext';
import { Trash2, Plus, Upload, Loader2 } from 'lucide-react';

const AdminGallery = () => {
  const { gallery, addToGallery, removeFromGallery, uploadImage } = useData();
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    
    const url = await uploadImage(file);
    
    if (url) {
      await addToGallery(url, title || 'Imagem da Galeria');
      setTitle(''); // Reset title after successful upload
    }
    setUploading(false);
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Galeria da Home</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
         <h3 className="font-bold mb-4">Adicionar Nova Foto</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Título (Opcional)</label>
              <input 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-red"
                placeholder="Ex: Festa do João"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            
            <label className={`flex items-center justify-center gap-2 bg-brand-red text-white font-bold rounded-lg px-4 py-2 hover:bg-red-700 cursor-pointer transition-all ${uploading ? 'opacity-70' : ''}`}>
               <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
               {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
               {uploading ? 'Enviando...' : 'Selecionar e Enviar Foto'}
            </label>
         </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
             <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => removeFromGallery(item.id)}
                  className="bg-white p-3 rounded-full text-red-500 hover:scale-110 transition-transform"
                >
                  <Trash2 size={20} />
                </button>
             </div>
             <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-medium truncate">{item.title}</p>
             </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
