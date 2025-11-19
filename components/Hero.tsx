import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-24 overflow-hidden bg-gradient-to-b from-brand-red/5 to-white">
      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-red px-4 py-2 rounded-full font-bold text-sm mb-6">
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
              Diversão Garantida
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-black text-gray-900 leading-tight mb-6">
              Leve a alegria da <span className="text-brand-red">Center Parque</span> para sua festa!
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Aluguel de brinquedos infláveis higienizados, seguros e novos. Transforme o aniversário do seu filho em um evento inesquecível.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-brand-red text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all flex items-center justify-center gap-2">
                Ver Catálogo
                <ArrowRight size={20} />
              </button>
              <button className="bg-brand-yellow text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-md hover:bg-yellow-400 hover:scale-105 transition-all">
                Orçamento Rápido
              </button>
            </div>
          </motion.div>

          {/* Image Hero */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1560131653-251132e5f757?auto=format&fit=crop&q=80&w=800" 
                alt="Crianças brincando no pula pula" 
                className="w-full h-auto object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-brand-yellow text-gray-900 px-6 py-3 rounded-xl font-bold shadow-lg">
                A partir de R$ 150,00/dia
              </div>
            </div>
            
            {/* Background Elements */}
            <div className="absolute -top-10 -right-10 text-brand-red opacity-20">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;