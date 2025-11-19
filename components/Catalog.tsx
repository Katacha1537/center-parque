import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Filter, ChevronDown, Search } from 'lucide-react';

const Catalog = () => {
  const location = useLocation();
  const { products, categories } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Parse query param for category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      const match = categories.find(c => c.title.toLowerCase().includes(categoryParam.toLowerCase()));
      if (match) setSelectedCategory(match.title);
      else if (categoryParam) setSelectedCategory(categoryParam); // Direct fallback
    }
    window.scrollTo(0, 0);
  }, [location, categories]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured (default id order)
  });

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">Nosso Catálogo</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore nossa coleção completa de brinquedos infláveis. Utilize os filtros para encontrar o tamanho e preço ideal para sua festa.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 space-y-8 ${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}`}>
            
            {isMobileFiltersOpen && (
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="text-xl font-bold">Filtros</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-gray-500">
                  ✕
                </button>
              </div>
            )}

            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Categorias</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === 'Todos'}
                    onChange={() => setSelectedCategory('Todos')}
                    className="w-5 h-5 text-brand-red border-gray-300 focus:ring-brand-red"
                  />
                  <span className={`group-hover:text-brand-red transition-colors ${selectedCategory === 'Todos' ? 'font-bold text-brand-red' : 'text-gray-600'}`}>
                    Todos os Produtos
                  </span>
                </label>
                {categories.map((cat) => (
                  <label key={cat.title} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === cat.title}
                      onChange={() => setSelectedCategory(cat.title)}
                      className="w-5 h-5 text-brand-red border-gray-300 focus:ring-brand-red"
                    />
                    <span className={`group-hover:text-brand-red transition-colors ${selectedCategory === cat.title ? 'font-bold text-brand-red' : 'text-gray-600'}`}>
                      {cat.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Faixa de Preço</h3>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600 font-medium">
                <span>R$ 0</span>
                <span>R$ {priceRange[1]}</span>
              </div>
            </div>

            {isMobileFiltersOpen && (
               <button 
                 onClick={() => setIsMobileFiltersOpen(false)}
                 className="w-full bg-brand-red text-white py-3 rounded-xl font-bold mt-4"
               >
                 Aplicar Filtros
               </button>
            )}
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
              <button 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 text-gray-700 font-bold"
              >
                <Filter size={20} /> Filtros
              </button>

              <p className="text-gray-500 text-sm">Mostrando <strong>{filteredProducts.length}</strong> produtos</p>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500 hidden sm:inline">Ordenar por:</span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-brand-red font-medium text-sm cursor-pointer"
                  >
                    <option value="featured">Destaques</option>
                    <option value="price-asc">Menor Preço</option>
                    <option value="price-desc">Maior Preço</option>
                    <option value="rating">Melhor Avaliados</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link 
                    to={`/produto/${product.id}`} 
                    key={product.id}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.isNew && (
                        <div className="absolute top-4 left-4">
                           <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">Novo</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                       <span className="text-xs font-bold text-gray-400 uppercase mb-1">{product.category}</span>
                       <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors leading-tight">
                         {product.name}
                       </h3>
                       <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-50">
                          <div>
                             <p className="text-xs text-gray-400">Diária</p>
                             <p className="text-xl font-black text-brand-red">R$ {product.price.toFixed(0)}</p>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                             Ver Detalhes
                          </span>
                       </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Nenhum produto encontrado</h3>
                <p className="text-gray-500 mt-2">Tente ajustar os filtros de preço ou categoria.</p>
                <button 
                  onClick={() => {
                     setSelectedCategory('Todos');
                     setPriceRange([0, 1000]);
                  }}
                  className="mt-6 text-brand-red font-bold hover:underline"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;