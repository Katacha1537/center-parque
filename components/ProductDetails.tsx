
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, ShieldCheck, Clock, Heart, Check, Minus, Plus, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useData();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id)) || products[0];
  
  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedDate, setSelectedDate] = useState('');

  // Reset state when product changes
  useEffect(() => {
    setSelectedImage(product.gallery?.[0] || product.image);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product]);

  const recommendedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  // Fallback if not enough related category
  const displayRecommended = recommendedProducts.length > 0 ? recommendedProducts : products.filter(p => p.id !== product.id).slice(0,4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedDate);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand-red transition-colors">Início</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-brand-red transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Gallery Section */}
            <div className="flex-1 max-w-2xl">
              <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-gray-100 bg-gray-50 group">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white p-3 rounded-full shadow-lg hover:text-brand-red hover:scale-110 transition-all">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {product.gallery?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-brand-red ring-2 ring-brand-red/20' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="flex-1">
              <div className="mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2 mb-4">
                   {product.isNew && (
                     <span className="bg-brand-red/10 text-brand-red text-xs font-bold px-3 py-1 rounded-full uppercase">Lançamento</span>
                   )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-sm text-gray-400 mb-1">Diária a partir de</span>
                  <span className="text-4xl font-black text-brand-red">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <p className="text-green-600 font-semibold text-sm flex items-center gap-1">
                  <Check size={16} /> {product.installments}
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {product.longDescription || product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                  <Truck className="text-brand-red" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Frete</p>
                    <p className="text-sm font-semibold text-gray-900">Sob Consulta</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                  <Clock className="text-brand-red" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Período</p>
                    <p className="text-sm font-semibold text-gray-900">5 Horas</p>
                  </div>
                </div>
              </div>

              {/* Selectors */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Quantidade</label>
                  <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 w-max">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:text-brand-red transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:text-brand-red transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 min-w-[200px]">
                   <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Data Prevista (Opcional)</label>
                   <div className="relative">
                     <input 
                       type="date" 
                       value={selectedDate}
                       onChange={(e) => setSelectedDate(e.target.value)}
                       className="w-full border border-gray-200 rounded-full py-3 px-4 pl-10 focus:outline-none focus:border-brand-red bg-white text-gray-700"
                     />
                     <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-red text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Adicionar ao Carrinho
                </button>
                <a 
                  href={`https://wa.me/${COMPANY_INFO.phone.replace(/\D/g,'')}?text=Olá, gostaria de alugar o ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-green-200 hover:bg-green-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" stroke="none" fill="currentColor"/></svg>
                  Reservar no WhatsApp
                </a>
              </div>

              <div className="mt-6 flex items-center justify-center sm:justify-start gap-6 text-xs text-gray-500">
                 <span className="flex items-center gap-1"><ShieldCheck size={14} /> Pagamento Seguro</span>
                 <span className="flex items-center gap-1"><Truck size={14} /> Entrega e Montagem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-100 overflow-hidden p-6 lg:p-10 shadow-sm">
           <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
              {['description', 'specs'].map((tab) => (
                 <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-bold text-sm uppercase tracking-wide whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'text-brand-red border-brand-red' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                 >
                    {tab === 'description' ? 'Descrição Completa' : 'Especificações Técnicas'}
                 </button>
              ))}
           </div>

           <div className="min-h-[200px]">
              {activeTab === 'description' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose max-w-none text-gray-600">
                    <p>{product.longDescription || product.description}</p>
                    <h3 className="text-lg font-bold text-gray-900 mt-6 mb-4">Por que escolher este brinquedo?</h3>
                    <ul className="list-disc pl-5 space-y-2">
                       <li>Higienização completa antes e depois do evento.</li>
                       <li>Monitor treinado para acompanhar as crianças (opcional).</li>
                       <li>Material de alta durabilidade e segurança.</li>
                       <li>Cores vibrantes que encantam e decoram a festa.</li>
                    </ul>
                 </motion.div>
              )}
              {activeTab === 'specs' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {product.specs ? Object.entries(product.specs).map(([key, value]) => (
                       <div key={key} className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <span className="font-bold text-gray-700 uppercase text-xs">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-gray-600 text-right">{value}</span>
                       </div>
                    )) : <p>Sem especificações detalhadas.</p>}
                 </motion.div>
              )}
           </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-8">Quem viu este, também gostou</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {displayRecommended.map((rp) => (
                <Link to={`/produto/${rp.id}`} key={rp.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                   <div className="aspect-square overflow-hidden relative">
                      <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <span className="absolute bottom-2 right-2 bg-white/90 text-brand-red font-bold text-xs px-2 py-1 rounded-md shadow-sm">
                         R$ {rp.price.toFixed(0)}
                      </span>
                   </div>
                   <div className="p-4">
                      <h4 className="font-bold text-gray-900 truncate group-hover:text-brand-red transition-colors">{rp.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{rp.category}</p>
                   </div>
                </Link>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
