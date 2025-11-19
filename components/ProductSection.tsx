import React from 'react';
import { motion } from 'framer-motion';
import { useData, Product } from '../context/DataContext';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      <Link to={`/produto/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {product.isNew && (
          <div className="absolute top-4 left-4">
             <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">Lançamento</span>
          </div>
        )}
      </Link>
      <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-gray-400 hover:text-brand-red hover:bg-white transition-all z-10">
        <Heart size={18} />
      </button>

      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/produto/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col mb-3">
            <span className="text-xs text-gray-400">Aluguel diário</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-brand-red">R$</span>
              <span className="text-2xl font-black text-brand-red">{product.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <span className="text-xs font-medium text-brand-yellow bg-yellow-50 inline-block px-2 py-0.5 rounded mt-1 w-max">
              {product.installments}
            </span>
          </div>
          
          <Link 
            to={`/produto/${product.id}`}
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-brand-red transition-colors"
          >
            <ShoppingBag size={18} />
            Reservar Agora
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProductSection = () => {
  const { products } = useData();
  
  return (
    <section className="py-16 lg:py-24 bg-white" id="brinquedos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-sm mb-3"
          >
            <TagIcon />
            Conheça Nossos Produtos
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl lg:text-5xl font-display font-bold text-gray-900"
          >
            Diversão para todas as idades
          </motion.h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/catalogo" className="inline-block border-2 border-brand-red text-brand-red px-10 py-3 rounded-full font-bold hover:bg-brand-red hover:text-white transition-all duration-300 uppercase tracking-wide text-sm">
            Ver Todos os Brinquedos
          </Link>
        </div>
      </div>
    </section>
  );
};

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.5 2H6a2 2 0 0 0-2 2v6.5a2 2 0 0 0 .59 1.41l9 9a2 2 0 0 0 2.83 0l6.5-6.5a2 2 0 0 0 0-2.83l-9-9A2 2 0 0 0 12.5 2Z"/>
    <path d="M7 7h.01"/>
  </svg>
)

export default ProductSection;