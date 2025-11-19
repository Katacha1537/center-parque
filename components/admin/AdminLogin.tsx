
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await login(email, password);
    
    if (error) {
      console.error(error);
      // Since user might not have backend setup, give a clear hint
      setError('Falha no login. Verifique o console ou certifique-se que o usuário existe no Supabase.');
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-brand-red" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Acesso Administrativo</h1>
          <p className="text-gray-500 mt-2">Digite suas credenciais</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
             <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red"
              placeholder="admin@centerparque.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
             <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                <p className="font-bold mb-1">Erro de Acesso</p>
                {error}
             </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-brand-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Autenticando...' : 'Entrar'}
          </button>
          
          <div className="text-center text-xs text-gray-400 mt-4">
            <p>Para testar, certifique-se de ter criado um usuário no Supabase Authentication.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
