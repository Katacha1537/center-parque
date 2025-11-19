import React from 'react';

const Terms = () => {
  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">Termos de Uso</h1>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6 text-gray-600 leading-relaxed">
          <p>Bem-vindo à Center Parque. Ao utilizar nossos serviços de aluguel de brinquedos, você concorda com os seguintes termos:</p>
          
          <h2 className="text-xl font-bold text-gray-900">1. Locação e Reservas</h2>
          <p>As reservas são confirmadas mediante pagamento de sinal de 50% do valor total. O restante deve ser pago na montagem do equipamento. O cancelamento deve ser feito com pelo menos 48 horas de antecedência.</p>

          <h2 className="text-xl font-bold text-gray-900">2. Uso dos Equipamentos</h2>
          <p>O locatário é responsável pela integridade física dos equipamentos durante o período de locação. É proibido o uso de calçados, alimentos, bebidas, objetos cortantes ou tintas dentro dos brinquedos infláveis.</p>

          <h2 className="text-xl font-bold text-gray-900">3. Segurança</h2>
          <p>Recomendamos a supervisão constante de um adulto ou monitor responsável. Respeite o limite de peso e idade especificado para cada brinquedo.</p>

          <h2 className="text-xl font-bold text-gray-900">4. Instalação</h2>
          <p>O local de instalação deve ser plano, limpo e ter acesso a um ponto de energia compatível (110v/220v conforme equipamento). Não instalamos em locais com terra, lama ou pedras pontiagudas sem proteção adequada.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;