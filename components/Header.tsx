
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';

interface NavItem {
  label: string;
  path: string;
  hash?: string;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartCount, toggleCart } = useCart();
  const { categories } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, path: string, hash?: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (path === '/') {
      if (location.pathname !== '/') {
        navigate('/');
        if (hash) {
          setTimeout(() => {
             const element = document.getElementById(hash);
             if(element) element.scrollIntoView({behavior: 'smooth'});
          }, 100);
        } else {
          window.scrollTo({top: 0, behavior: 'smooth'});
        }
      } else {
        if (hash) {
           const element = document.getElementById(hash);
           if(element) element.scrollIntoView({behavior: 'smooth'});
        } else {
           window.scrollTo({top: 0, behavior: 'smooth'});
        }
      }
    } else {
      navigate(path);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/catalogo?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Build nav items dynamically based on categories
  const categoryLinks: NavItem[] = categories.slice(0, 4).map(cat => ({
    label: cat.title,
    path: `/catalogo?category=${cat.title}`
  }));

  const navItems: NavItem[] = [
    { label: 'Início', path: '/', hash: '' },
    ...categoryLinks,
    { label: 'Catálogo Completo', path: '/catalogo' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Top Bar */}
      <div className="bg-brand-red text-white py-2 px-4 text-xs sm:text-sm flex justify-center sm:justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="hidden sm:inline">A maior variedade de brinquedos da região!</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-2 font-bold"><Phone size={14}/> {COMPANY_INFO.phone}</span>
        </div>
        <div className="hidden sm:flex gap-6">
           <Link to="/termos" className="hover:text-brand-yellow transition-colors font-medium">Termos</Link>
           <Link to="/privacidade" className="hover:text-brand-yellow transition-colors font-medium">Privacidade</Link>
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
              className={`transition-all duration-300 object-contain ${isScrolled ? 'h-10' : 'h-14 sm:h-16'}`}
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <input 
              type="text" 
              placeholder="O que você procura?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-full py-2.5 px-6 focus:outline-none focus:border-brand-red transition-colors text-sm"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-red text-white p-1.5 rounded-full hover:bg-red-700 transition-colors"
            >
              <Search size={16} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div 
              className="relative cursor-pointer text-gray-700 hover:text-brand-red transition-colors p-2"
              onClick={toggleCart}
            >
              <ShoppingCart size={28} />
              <span className="absolute top-0 right-0 bg-brand-red text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            </div>

             {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-gray-700 hover:text-brand-red"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

         
        </div>
      </div>

      {/* Navigation Bar (Desktop) - Solid Color as requested */}
      <div className="bg-brand-yellow hidden lg:block shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label} 
                to={item.path}
                onClick={(e) => item.hash ? handleNavClick(e, item.path, item.hash) : null}
                className="text-gray-900 font-bold py-3 px-6 hover:bg-white/20 transition-all text-sm uppercase tracking-wide"
              >
                {item.label}
              </Link>
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
          <div className="p-4 border-b border-gray-100">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="O que você procura?" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:border-brand-red"
                />
                <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                   <Search size={18} />
                </button>
             </div>
          </div>
          <nav className="flex flex-col p-4 pt-0">
             {navItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.path}
                className="text-gray-700 font-bold py-3 border-b border-gray-100 hover:text-brand-red"
                onClick={(e) => {
                   if(item.hash) handleNavClick(e, item.path, item.hash);
                   else setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
