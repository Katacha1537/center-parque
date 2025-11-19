import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
       <div className="bg-[#2e0249] rounded-3xl p-8 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Background abstract shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

          <div className="relative z-10 max-w-2xl">
             <span className="bg-brand-yellow text-[#2e0249] font-bold px-4 py-1 rounded mb-4 inline-block text-xs uppercase tracking-wider">Catálogo 2024</span>
             <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6">
               Encontre os melhores produtos para <span className="text-brand-red">impulsionar sua festa!</span>
             </h2>
             <p className="text-white/70 text-lg">
               Leve a diversão para o próximo nível com os brinquedos infláveis exclusivos da Center Parque. Baixe nosso catálogo completo.
             </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
             <button className="bg-white text-[#2e0249] px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-yellow transition-colors flex items-center gap-3 shadow-xl">
                <FileText size={20} />
                BAIXAR CATÁLOGO PDF
                <ArrowRight size={20} />
             </button>
          </div>
       </div>
    </section>
  );
};

export default CtaSection;