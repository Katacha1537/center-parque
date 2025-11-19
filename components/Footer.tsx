import React from 'react';
import { COMPANY_INFO } from '../constants';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
       <div className="container mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Col */}
            <div className="flex flex-col gap-4">
               <img src={COMPANY_INFO.logoUrl} alt="Center Parque" className="w-32" />
               <p className="text-gray-500 text-sm leading-relaxed">
                 A Center Parque é sua parceira ideal para festas inesquecíveis. Levando alegria e segurança para seu evento.
               </p>
               <div className="text-xs text-gray-400 mt-4">
                  CNPJ: 00.000.000/0001-00 <br/>
                  Rua das Flores, 123 - Centro <br/>
                  São Paulo - SP
               </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-gray-900 mb-6">Institucional</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                 <li><a href="#" className="hover:text-brand-red">Quem Somos</a></li>
                 <li><a href="#" className="hover:text-brand-red">Como Alugar</a></li>
                 <li><a href="#" className="hover:text-brand-red">Segurança</a></li>
                 <li><a href="#" className="hover:text-brand-red">Área de Atuação</a></li>
                 <li><a href="#" className="hover:text-brand-red">Política de Privacidade</a></li>
              </ul>
            </div>

             {/* Contact */}
             <div>
              <h3 className="font-bold text-gray-900 mb-6">Atendimento</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                 <li className="flex items-center gap-3">
                    <Phone size={18} className="text-brand-red" />
                    {COMPANY_INFO.phone}
                 </li>
                 <li className="flex items-center gap-3">
                    <Mail size={18} className="text-brand-red" />
                    {COMPANY_INFO.email}
                 </li>
                 <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-brand-red mt-1" />
                    <span>Atendimento de seg à sex das 9h às 18h</span>
                 </li>
              </ul>
            </div>

            {/* Social */}
            <div>
               <h3 className="font-bold text-gray-900 mb-6">Siga-nos</h3>
               <div className="flex gap-4">
                  <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-brand-red hover:text-white transition-colors">
                     <Instagram size={20} />
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                     <Facebook size={20} />
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-red-600 hover:text-white transition-colors">
                     <Youtube size={20} />
                  </a>
               </div>
               <div className="mt-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Pagamento Facilitado</h4>
                  <div className="flex gap-2 opacity-60">
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="border-t border-gray-100 pt-8 text-center text-xs text-gray-400">
            <p>&copy; 2024 Center Parque. Todos os direitos reservados.</p>
         </div>
       </div>
    </footer>
  );
};

export default Footer;