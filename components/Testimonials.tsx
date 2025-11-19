import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-20 bg-brand-blue text-white relative overflow-hidden">
       {/* Background Curve */}
       <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-white">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
      </div>

      <div className="container mx-auto px-4 pt-12 relative z-10">
        <div className="text-left mb-12">
           <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">Depoimentos dos<br /><span className="text-brand-yellow">nossos clientes</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {TESTIMONIALS.map((t) => (
             <div key={t.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-colors">
                <Quote className="text-brand-yellow mb-4 opacity-50" size={40} />
                <p className="text-lg mb-6 italic text-white/90">"{t.content}"</p>
                <div className="flex items-center gap-4">
                   <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-yellow" />
                   <div>
                      <h4 className="font-bold text-white">{t.name}</h4>
                      <span className="text-sm text-white/60">{t.role}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;