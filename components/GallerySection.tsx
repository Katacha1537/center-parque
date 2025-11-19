import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Camera } from 'lucide-react';

const GallerySection = () => {
  const { gallery } = useData();

  if (gallery.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-sm mb-3">
              <Camera size={18} />
              Nossos Momentos
           </div>
           <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900">
              Galeria de Fotos
           </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
           {gallery.map((item, index) => (
             <motion.div 
               key={item.id}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className={`relative rounded-xl overflow-hidden group shadow-md ${index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
             >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute bottom-4 left-4 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                   <p className="font-bold text-lg">{item.title}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;