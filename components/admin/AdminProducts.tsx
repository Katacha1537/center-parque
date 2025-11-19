
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useData, Product } from '../../context/DataContext';
import { Pencil, Trash2, Plus, X, Upload, Loader2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, categories, uploadImage } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const initialFormState = {
    name: '',
    category: '', // Will be set to first category in useEffect or openModal
    price: '',
    image: '',
    description: '',
    longDescription: '',
    isNew: false,
    installments: '2x sem juros',
    rating: 5,
    reviews: 0,
    gallery: [] as string[],
    specs: {
      dimensions: '',
      capacity: '',
      ageRecommendation: '',
      power: ''
    }
  };

  const [formData, setFormData] = useState(initialFormState);

  const openModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        image: product.image,
        description: product.description,
        longDescription: product.longDescription,
        isNew: product.isNew,
        installments: product.installments,
        rating: product.rating,
        reviews: product.reviews,
        gallery: product.gallery || [],
        specs: {
          dimensions: product.specs?.dimensions || '',
          capacity: product.specs?.capacity || '',
          ageRecommendation: product.specs?.ageRecommendation || '',
          power: product.specs?.power || ''
        }
      });
    } else {
      setEditingId(null);
      // Default to first category if available
      setFormData({ ...initialFormState, category: categories[0]?.title || '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploading) return;
    if (!formData.category) {
      alert("Por favor, crie uma categoria primeiro.");
      return;
    }

    const productData: any = {
      ...formData,
      price: Number(formData.price),
      // Ensure gallery includes main image if empty
      gallery: formData.gallery.length > 0 ? formData.gallery : (formData.image ? [formData.image] : [])
    };

    try {
      if (editingId) {
        await updateProduct({ ...productData, id: editingId });
      } else {
        await addProduct(productData);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save product", err);
    }
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);
    
    if (url) {
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const newUrls = [];
    
    for (let i = 0; i < e.target.files.length; i++) {
       const url = await uploadImage(e.target.files[i]);
       if (url) newUrls.push(url);
    }
    setUploading(false);
    
    if (newUrls.length > 0) {
      setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...newUrls] }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData({...formData, gallery: formData.gallery.filter((_, i) => i !== index)});
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Produtos</h1>
        <button 
          onClick={() => openModal()}
          disabled={categories.length === 0}
          className={`bg-brand-red text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 ${categories.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Plus size={20} /> Novo Produto
        </button>
      </div>

      {categories.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl mb-6 flex items-start gap-3">
          <AlertTriangle size={24} className="flex-shrink-0" />
          <div>
            <h3 className="font-bold">Nenhuma categoria encontrada</h3>
            <p className="text-sm mb-2">Você precisa criar pelo menos uma categoria antes de adicionar produtos.</p>
            <Link to="/admin/categorias" className="text-brand-red font-bold hover:underline">Ir para Categorias</Link>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {products.length === 0 ? (
           <div className="p-12 text-center text-gray-500">
             <p>Nenhum produto cadastrado no banco de dados.</p>
           </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-gray-500 font-bold text-sm uppercase">Imagem</th>
                <th className="p-4 text-gray-500 font-bold text-sm uppercase">Nome</th>
                <th className="p-4 text-gray-500 font-bold text-sm uppercase">Categoria</th>
                <th className="p-4 text-gray-500 font-bold text-sm uppercase">Preço</th>
                <th className="p-4 text-gray-500 font-bold text-sm uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    {product.image ? (
                      <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">Sem Foto</div>
                    )}
                  </td>
                  <td className="p-4 font-bold text-gray-900">{product.name}</td>
                  <td className="p-4 text-gray-500">{product.category}</td>
                  <td className="p-4 font-medium text-brand-red">R$ {product.price.toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openModal(product)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => { if(window.confirm('Excluir produto?')) deleteProduct(product.id); }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">{editingId ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Nome do Produto</label>
                  <input required className="input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="label">Categoria</label>
                  <select className="input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    {categories.length === 0 && <option value="">Nenhuma categoria criada</option>}
                    {categories.map(c => <option key={c.title} value={c.title}>{c.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Preço (Diária)</label>
                  <input required type="number" className="input" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                
                {/* Main Image Upload */}
                <div>
                   <label className="label">Imagem Principal</label>
                   <div className="flex items-center gap-4">
                     <label className={`flex-1 cursor-pointer bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors ${uploading ? 'opacity-50' : ''}`}>
                        <input type="file" className="hidden" accept="image/*" onChange={handleMainImageUpload} disabled={uploading} />
                        {uploading ? <Loader2 className="animate-spin text-brand-red" /> : <Upload className="text-gray-400 mb-1" />}
                        <span className="text-xs text-gray-500">{uploading ? 'Enviando...' : 'Clique para enviar'}</span>
                     </label>
                     {formData.image && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 relative bg-gray-100">
                           <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                     )}
                   </div>
                </div>
              </div>

              {/* Gallery Upload */}
              <div>
                 <label className="label">Galeria de Fotos</label>
                 <div className="mb-4">
                    <label className={`cursor-pointer inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-200 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                       <input type="file" className="hidden" multiple accept="image/*" onChange={handleGalleryUpload} disabled={uploading} />
                       {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus size={16} />}
                       Adicionar Fotos
                    </label>
                 </div>
                 
                 <div className="flex flex-wrap gap-2">
                    {formData.gallery.length === 0 && <p className="text-sm text-gray-400">Nenhuma foto na galeria.</p>}
                    {formData.gallery.map((url, idx) => (
                      <div key={idx} className="relative w-20 h-20 border rounded-lg overflow-hidden group bg-gray-100">
                         <img src={url} className="w-full h-full object-cover" />
                         <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                           <X size={16} />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="label">Descrição Curta</label>
                 <input className="input" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div>
                 <label className="label">Descrição Completa</label>
                 <textarea className="input h-32" value={formData.longDescription} onChange={e => setFormData({...formData, longDescription: e.target.value})}></textarea>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-bold mb-3 text-gray-700">Especificações</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input placeholder="Dimensões (ex: 3x3m)" className="input" value={formData.specs.dimensions} onChange={e => setFormData({...formData, specs: {...formData.specs, dimensions: e.target.value}})} />
                   <input placeholder="Capacidade" className="input" value={formData.specs.capacity} onChange={e => setFormData({...formData, specs: {...formData.specs, capacity: e.target.value}})} />
                   <input placeholder="Idade Recomendada" className="input" value={formData.specs.ageRecommendation} onChange={e => setFormData({...formData, specs: {...formData.specs, ageRecommendation: e.target.value}})} />
                   <input placeholder="Voltagem" className="input" value={formData.specs.power} onChange={e => setFormData({...formData, specs: {...formData.specs, power: e.target.value}})} />
                </div>
              </div>

              <label className="flex items-center gap-2 font-bold cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-brand-red" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})} />
                Marcar como Lançamento
              </label>

              <button 
                type="submit" 
                disabled={uploading || !formData.category}
                className={`w-full bg-brand-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {uploading ? 'Aguarde os uploads...' : 'Salvar Produto'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

// Helper Styles
const style = document.createElement('style');
style.innerHTML = `
  .label { display: block; font-weight: bold; font-size: 0.875rem; color: #374151; margin-bottom: 0.5rem; }
  .input { width: 100%; border: 1px solid #d1d5db; border-radius: 0.5rem; padding: 0.75rem; font-size: 0.9rem; }
  .input:focus { outline: none; border-color: #E33626; }
`;
document.head.appendChild(style);

export default AdminProducts;
