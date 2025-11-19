import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Smile, Award } from 'lucide-react';

const StatsBar = () => {
  const stats = [
    { icon: Users, label: "Clientes Satisfeitos", value: "+2.500" },
    { icon: Smile, label: "Festas Realizadas", value: "+3.800" },
    { icon: Award, label: "Modelos Diferentes", value: "+50" },
    { icon: Calendar, label: "Anos no Mercado", value: "10" },
  ];

  return (
    <section className="bg-[#2e0249] py-16 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
                {stats.map((stat, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex flex-col items-center text-center ${index !== stats.length - 1 ? 'lg:border-r border-white/10' : ''}`}
                    >
                        <div className="mb-4 p-3 bg-white/10 rounded-full text-brand-yellow">
                            <stat.icon size={32} />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</h3>
                        <p className="text-white/80 font-medium uppercase tracking-wide text-sm">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-12 text-center">
                <h4 className="text-xl md:text-2xl font-bold text-white">
                    A maior variedade de brinquedos da <span className="text-brand-yellow">Região</span>
                </h4>
            </div>
        </div>
    </section>
  );
};

export default StatsBar;