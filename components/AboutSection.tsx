import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Sparkles } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl z-10">
               <img 
                src="https://images.unsplash.com/photo-1519331379826-f94915d6dd1b?auto=format&fit=crop&q=80&w=800" 
                alt="Crianças felizes na festa" 
                className="w-full"
               />
            </div>
            {/* Decorative backdrop */}
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-brand-yellow rounded-[2rem] -z-0"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h4 className="text-brand-red font-bold text-lg mb-2">Sobre Nós</h4>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Olá, somos a <span className="text-brand-red">Center Parque</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Com mais de 10 anos de história, a Center Parque é referência em aluguel de brinquedos infláveis na região. 
              Nosso sucesso vem da alegria proporcionada em milhares de festas de aniversário, eventos corporativos e reuniões familiares.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Não apenas entregamos brinquedos; entregamos segurança, pontualidade e diversão. Todos os nossos equipamentos passam por
              rigorosa higienização e manutenção preventiva semanalmente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex items-start gap-3">
                  <ShieldCheck className="text-brand-red mt-1" size={24} />
                  <div>
                    <h5 className="font-bold text-gray-900">Segurança Total</h5>
                    <p className="text-sm text-gray-500">Equipamentos certificados e monitores treinados.</p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <Clock className="text-brand-red mt-1" size={24} />
                  <div>
                    <h5 className="font-bold text-gray-900">Pontualidade</h5>
                    <p className="text-sm text-gray-500">Montagem e desmontagem no horário combinado.</p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <Sparkles className="text-brand-red mt-1" size={24} />
                  <div>
                    <h5 className="font-bold text-gray-900">Higienização</h5>
                    <p className="text-sm text-gray-500">Limpeza profunda antes de cada locação.</p>
                  </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;