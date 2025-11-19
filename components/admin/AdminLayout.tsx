import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { LayoutDashboard, Package, Tags, Image, LogOut, Home } from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, logout } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Produtos', path: '/admin/produtos', icon: Package },
    { label: 'Categorias', path: '/admin/categorias', icon: Tags },
    { label: 'Galeria', path: '/admin/galeria', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white fixed h-full z-20 hidden lg:block">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold font-display">Center Parque <span className="text-brand-red text-sm block">Admin Panel</span></h2>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-brand-red text-white' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white mb-2">
             <Home size={20} />
             <span>Ver Site</span>
          </Link>
          <button
            onClick={() => { logout(); navigate('/admin'); }}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 w-full text-left"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header (Visible only on small screens) */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-gray-900 text-white z-20 p-4 flex justify-between items-center">
         <span className="font-bold">Admin Panel</span>
         <button onClick={() => { logout(); navigate('/admin'); }}><LogOut size={20}/></button>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-10 pt-20 lg:pt-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;