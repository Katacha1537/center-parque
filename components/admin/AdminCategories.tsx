import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useData } from '../../context/DataContext';
import { Trash2, Plus, Tag } from 'lucide-react';

const AdminCategories = () => {
  const { categories, addCategory, deleteCategory } = useData();
  const [newCat, setNewCat] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat) return;
    addCategory({
      title: newCat,
      iconName: 'Tag',
      color: 'bg-gray-500' // default
    });
    setNewCat('');
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold mb-4">Categorias Ativas</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.title} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                   <Tag size={18} className="text-gray-400" />
                   <span className="font-medium">{cat.title}</span>
                </div>
                <button 
                  onClick={() => deleteCategory(cat.title)}
                  className="text-red-400 hover:text-red-600"
                  title="Remover"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h3 className="font-bold mb-4">Adicionar Nova</h3>
          <form onSubmit={handleAdd} className="flex gap-2">
             <input 
               className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-red"
               placeholder="Nome da Categoria"
               value={newCat}
               onChange={e => setNewCat(e.target.value)}
             />
             <button type="submit" className="bg-brand-red text-white p-2 rounded-lg hover:bg-red-700">
               <Plus size={24} />
             </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;