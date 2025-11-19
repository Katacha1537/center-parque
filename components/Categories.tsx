import React from 'react';
import { CATEGORIES } from '../constants';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-display font-bold text-gray-900">Categorias de Produtos</h2>
           <p className="text-gray-500 mt-2">Encontre o brinquedo ideal para o seu espaço</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`${cat.color} rounded-2xl p-8 text-white relative overflow-hidden cursor-pointer shadow-lg group`}
            >
               {/* Icon Background Faded */}
               <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:scale-150 transition-transform duration-500">
                  <cat.icon size={120} />
               </div>

               <div className="relative z-10">
                 <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                    <cat.icon size={24} />
                 </div>
                 <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
                 <div className="flex items-center gap-2 text-sm font-medium opacity-90 group-hover:gap-4 transition-all">
                    Ver opções <ArrowRight size={16} />
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;