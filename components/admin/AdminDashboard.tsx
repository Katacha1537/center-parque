import React from 'react';
import AdminLayout from './AdminLayout';
import { useData } from '../../context/DataContext';
import { Package, Tags, Image, DollarSign } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`p-4 rounded-full ${color} text-white`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-500 uppercase font-bold">{label}</p>
      <h3 className="text-2xl font-black text-gray-900">{value}</h3>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { products, categories, gallery } = useData();

  const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-gray-500">Bem-vindo ao painel administrativo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={Package} 
          label="Total de Produtos" 
          value={products.length} 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={Tags} 
          label="Categorias" 
          value={categories.length} 
          color="bg-brand-yellow" 
        />
        <StatCard 
          icon={Image} 
          label="Fotos na Galeria" 
          value={gallery.length} 
          color="bg-purple-500" 
        />
        <StatCard 
          icon={DollarSign} 
          label="Valor do Inventário" 
          value={`R$ ${totalValue.toLocaleString()}`} 
          color="bg-green-500" 
        />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="font-bold text-lg mb-4">Produtos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase">
              <tr>
                <th className="p-3">Nome</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Preço</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(-5).reverse().map(product => (
                <tr key={product.id} className="border-b border-gray-50">
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3 text-gray-500">{product.category}</td>
                  <td className="p-3 font-bold text-brand-red">R$ {product.price.toFixed(2)}</td>
                  <td className="p-3">
                    {product.isNew ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Novo</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;