import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../constants';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, items, removeFromCart, cartTotal } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = `*Olá! Gostaria de fazer um orçamento:*\n\n`;
    
    items.forEach(item => {
      message += `📦 *${item.quantity}x ${item.product.name}*\n`;
      message += `   Preço un: R$ ${item.product.price.toFixed(2)}\n`;
      if (item.date) message += `   Data: ${item.date}\n`;
      message += `\n`;
    });

    message += `💰 *Total Estimado: R$ ${cartTotal.toFixed(2)}*\n\n`;
    message += `Aguardo confirmação da disponibilidade!`;

    const encodedMessage = encodeURIComponent(message);
    const phone = COMPANY_INFO.phone.replace(/\D/g, '');
    
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-brand-red text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} />
                <h2 className="font-display font-bold text-xl">Seu Carrinho</h2>
              </div>
              <button 
                onClick={toggleCart}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p className="text-lg font-medium">Seu carrinho está vazio</p>
                  <button 
                    onClick={toggleCart}
                    className="text-brand-red font-bold hover:underline"
                  >
                    Continuar Navegando
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.product.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.quantity}x R$ {item.product.price.toFixed(2)}
                          </p>
                          {item.date && (
                            <p className="text-xs text-brand-red mt-1 font-medium">Para: {item.date}</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-brand-red">R$ {(item.quantity * item.product.price).toFixed(2)}</span>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-center mb-4 text-lg font-bold text-gray-900">
                  <span>Total Estimado</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                >
                  Solicitar Orçamento
                  <ArrowRight size={20} />
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  O pagamento é combinado diretamente pelo WhatsApp.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;