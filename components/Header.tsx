import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (sectionId === 'home') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Helper to scroll to element
    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(scrollToElement, 100);
    } else {
      scrollToElement();
    }
  };

  const navItems = [
    { label: 'Início', id: 'home' },
    { label: 'Pula-Pulas', id: 'brinquedos' }, // Mapping generic sections to the main product grid for now
    { label: 'Tobogãs', id: 'brinquedos' },
    { label: 'Piscinas de Bolinha', id: 'brinquedos' },
    { label: 'Kits Promocionais', id: 'brinquedos' },
    { label: 'Contato', id: 'footer' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Top Bar */}
      <div className="bg-brand-red text-white py-2 px-4 text-xs sm:text-sm flex justify-between items-center">
        <div className="hidden sm:flex gap-4">
          <span>A maior variedade da região!</span>
          <span>|</span>
          <span>Fale conosco: {COMPANY_INFO.phone}</span>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end gap-4">
           <a href="#" className="hover:text-brand-yellow transition-colors">Blog</a>
           <a href="#" className="hover:text-brand-yellow transition-colors">Quem Somos</a>
           <a href="#" className="hover:text-brand-yellow transition-colors">Área do Cliente</a>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img 
              src={COMPANY_INFO.logoUrl} 
              alt={COMPANY_INFO.name} 
              className={`transition-all duration-300 object-contain ${isScrolled ? 'h-12' : 'h-16 sm:h-20'}`}
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
            <input 
              type="text" 
              placeholder="O que você procura para sua festa?" 
              className="w-full border-2 border-gray-200 rounded-full py-2 px-6 focus:outline-none focus:border-brand-red transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-red text-white p-2 rounded-full hover:bg-red-700 transition-colors">
              <Search size={18} />
            </button>
          </div>

          {/* Icons / Actions */}
          <div className="hidden md:flex items-center gap-6 text-gray-700">
            <div className="flex items-center gap-2 cursor-pointer hover:text-brand-red">
              <User size={24} />
              <div className="flex flex-col leading-tight">
                <span className="text-xs">Olá, acesse sua conta</span>
                <span className="font-bold text-sm">Entre ou Cadastre-se</span>
              </div>
            </div>
            
            <div className="relative cursor-pointer hover:text-brand-red">
              <ShoppingCart size={28} />
              <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-red font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-brand-red"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Navigation Bar (Desktop) */}
      <div className="bg-brand-red/5 border-b border-brand-red/10 hidden lg:block">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center gap-8 py-3">
            {navItems.map((item) => (
              <a
                key={item.label} 
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-gray-700 font-semibold hover:text-brand-red border-b-2 border-transparent hover:border-brand-red transition-all text-sm uppercase tracking-wide cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl left-0 z-40"
        >
          <nav className="flex flex-col p-4 gap-4">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar brinquedo..." 
                  className="w-full border border-gray-300 rounded-lg py-2 px-4"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
             </div>
             {navItems.map((item) => (
              <a 
                key={item.label} 
                href={`#${item.id}`}
                className="text-gray-700 font-semibold py-2 border-b border-gray-100"
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
             <div className="flex items-center gap-3 py-2 text-brand-red font-bold">
              <Phone size={20} />
              {COMPANY_INFO.phone}
             </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;