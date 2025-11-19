import React from 'react';

const Privacy = () => {
  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">Política de Privacidade</h1>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6 text-gray-600 leading-relaxed">
          <p>A Center Parque respeita a sua privacidade. Esta política descreve como coletamos e usamos suas informações.</p>
          
          <h2 className="text-xl font-bold text-gray-900">1. Coleta de Dados</h2>
          <p>Coletamos apenas as informações necessárias para a prestação do serviço de locação, como nome, telefone e endereço de entrega. Esses dados são fornecidos voluntariamente por você via WhatsApp ou formulário de contato.</p>

          <h2 className="text-xl font-bold text-gray-900">2. Uso das Informações</h2>
          <p>Seus dados são utilizados exclusivamente para:</p>
          <ul className="list-disc pl-5">
            <li>Processar agendamentos e entregas.</li>
            <li>Enviar orçamentos solicitados.</li>
            <li>Comunicar sobre o status do pedido.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900">3. Compartilhamento</h2>
          <p>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, exceto quando necessário para a entrega (ex: equipe de logística) ou exigido por lei.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;