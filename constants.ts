import { Tag, Star, ShieldCheck, Truck, Package, Smile } from 'lucide-react';

export const BRAND_COLORS = {
  red: '#E33626',
  yellow: '#FDC81C',
};

export const COMPANY_INFO = {
  name: "Center Parque",
  phone: "(11) 99999-9999",
  email: "contato@centerparque.com.br",
  logoUrl: "https://i.postimg.cc/qR0yhwG8/center-parque-logo.png"
};

export const PRODUCTS = [
  {
    id: 1,
    name: "Castelo Pula-Pula Encantado",
    category: "Pula-Pulas",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1633463656328-7c76a6b9d82a?q=80&w=1000&auto=format&fit=crop",
    isNew: true,
    description: "Ideal para crianças de até 8 anos. Acompanha monitor.",
    installments: "2x sem juros",
    rating: 4.9,
    reviews: 124,
    gallery: [
      "https://images.unsplash.com/photo-1633463656328-7c76a6b9d82a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605154780386-a34879517bf7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1575366573905-4b192b7709a6?auto=format&fit=crop&q=80&w=800"
    ],
    longDescription: "O Castelo Pula-Pula Encantado é a atração perfeita para aniversários infantis e pequenos eventos. Com cores vibrantes e temáticas de contos de fadas, ele atrai a atenção das crianças imediatamente. Fabricado com lona KP1000 de alta resistência e costuras reforçadas, garante segurança total durante a brincadeira. Suas laterais possuem rede de proteção que permite visualização total pelas pais.",
    specs: {
      dimensions: "3,0m x 3,0m x 2,5m",
      capacity: "3 a 4 crianças (rotativo)",
      ageRecommendation: "2 a 8 anos",
      power: "110v ou 220v (necessário ponto de energia)"
    }
  },
  {
    id: 2,
    name: "Tobogã Tropical Gigante",
    category: "Tobogãs",
    price: 350.00,
    image: "https://images.unsplash.com/photo-1529426489333-f149583d0984?q=80&w=1000&auto=format&fit=crop",
    isNew: true,
    description: "Emoção garantida com 5 metros de altura.",
    installments: "3x sem juros",
    rating: 5.0,
    reviews: 89,
    gallery: [
       "https://images.unsplash.com/photo-1529426489333-f149583d0984?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605154780386-a34879517bf7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1570818562144-25568b7542c6?auto=format&fit=crop&q=80&w=800"
    ],
    longDescription: "Leve a emoção das alturas para sua festa com o Tobogã Tropical Gigante! Com 5 metros de altura e uma descida radical, este brinquedo é o sucesso entre crianças maiores e pré-adolescentes. O tema tropical com palmeiras infláveis cria um ambiente festivo e alegre. Possui escada lateral com apoio para as mãos e parede de proteção no final da descida.",
    specs: {
      dimensions: "6,0m x 3,5m x 5,0m",
      capacity: "2 crianças por vez",
      ageRecommendation: "5 a 14 anos",
      power: "220v (motor de alta potência)"
    }
  },
  {
    id: 3,
    name: "Futebol de Sabão",
    category: "Esportivos",
    price: 420.00,
    image: "https://images.unsplash.com/photo-1500995617113-cf789362a3e1?auto=format&fit=crop&q=80&w=600",
    isNew: false,
    description: "Diversão refrescante para todas as idades.",
    installments: "3x sem juros",
    rating: 4.8,
    reviews: 56,
    gallery: [
      "https://images.unsplash.com/photo-1500995617113-cf789362a3e1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1528312152374-e5df1d67509c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1575366573905-4b192b7709a6?auto=format&fit=crop&q=80&w=800"
    ],
    longDescription: "O clássico Futebol de Sabão é garantia de risadas e diversão refrescante! Perfeito para dias quentes, sítios e chácaras. Acompanha shampoo neutro especial que não irrita os olhos e pele. O piso inflável amortece as quedas, tornando o jogo seguro e hilário. Pode ser usado com ou sem água (como arena de futebol inflável).",
    specs: {
      dimensions: "10,0m x 5,0m",
      capacity: "10 pessoas (5 de cada lado)",
      ageRecommendation: "A partir de 6 anos (inclusive adultos)",
      power: "220v e ponto de água próximo"
    }
  },
  {
    id: 4,
    name: "Piscina de Bolinhas Casinha",
    category: "Piscinas de Bolinha",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1596464716127-f9a87595ca58?q=80&w=1000&auto=format&fit=crop",
    isNew: false,
    description: "Clássico que não pode faltar. 2000 bolinhas.",
    installments: "2x sem juros",
    rating: 4.9,
    reviews: 210,
    gallery: [
      "https://images.unsplash.com/photo-1596464716127-f9a87595ca58?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528312152374-e5df1d67509c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605154780386-a34879517bf7?auto=format&fit=crop&q=80&w=800"
    ],
    longDescription: "Ideal para os pequeninos! Nossa Piscina de Bolinhas em formato de casinha é aconchegante e segura. Acompanha 2.000 bolinhas coloridas de alta qualidade, higienizadas individualmente antes de cada evento. Possui teto que protege do sol em áreas externas e rede transparente para supervisão.",
    specs: {
      dimensions: "2,0m x 2,0m x 1,8m",
      capacity: "3 crianças",
      ageRecommendation: "1 a 5 anos",
      power: "Não necessita de energia elétrica"
    }
  },
  {
    id: 5,
    name: "Giro Radical Inflável",
    category: "Esportivos",
    price: 550.00,
    image: "https://images.unsplash.com/photo-1575366573905-4b192b7709a6?auto=format&fit=crop&q=80&w=600",
    isNew: true,
    description: "Desafio e equilíbrio para a garotada.",
    installments: "4x sem juros",
    rating: 5.0,
    reviews: 42,
    gallery: [
      "https://images.unsplash.com/photo-1575366573905-4b192b7709a6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1500995617113-cf789362a3e1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618383055723-f3e0343d5620?auto=format&fit=crop&q=80&w=800"
    ],
    longDescription: "O Giro Radical é a novidade do momento! Um desafio de equilíbrio e agilidade onde os participantes devem pular ou abaixar para desviar dos obstáculos giratórios. Totalmente inflável e seguro, é controlado por um monitor treinado que ajusta a velocidade conforme a idade dos participantes.",
    specs: {
      dimensions: "6,0m diâmetro",
      capacity: "4 a 6 participantes",
      ageRecommendation: "A partir de 6 anos",
      power: "220v (2 motores)"
    }
  },
  {
    id: 6,
    name: "Cama Elástica 3m",
    category: "Pula-Pulas",
    price: 160.00,
    image: "https://images.unsplash.com/photo-1560025390-4b192b7709a6?auto=format&fit=crop&q=80&w=600",
    isNew: false,
    description: "Proteção nas molas e rede de segurança reforçada.",
    installments: "2x sem juros",
    rating: 4.7,
    reviews: 180,
    gallery: [
      "https://images.unsplash.com/photo-1560025390-4b192b7709a6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1528312152374-e5df1d67509c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1570818562144-25568b7542c6?auto=format&fit=crop&q=80&w=800"
    ],
    longDescription: "A rainha das festas! Nossa Cama Elástica de 3,05m possui estrutura em aço galvanizado e rede de proteção multicolorida super resistente. As molas são protegidas por uma capa acolchoada grossa, evitando acidentes. Montagem rápida e segura em qualquer superfície plana.",
    specs: {
      dimensions: "3,05m diâmetro",
      capacity: "1 criança por vez (recomendado) ou 100kg",
      ageRecommendation: "A partir de 3 anos",
      power: "Não necessita"
    }
  },
  {
    id: 7,
    name: "Kit Festa Completa",
    category: "Kits Festa",
    price: 600.00,
    image: "https://images.unsplash.com/photo-1530103862676-de3c9fa59588?auto=format&fit=crop&q=80&w=600",
    isNew: true,
    description: "Tobogã + Piscina de Bolinhas + Cama Elástica.",
    installments: "4x sem juros",
    rating: 5.0,
    reviews: 65,
    gallery: [
      "https://images.unsplash.com/photo-1530103862676-de3c9fa59588?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605154780386-a34879517bf7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560025390-4b192b7709a6?auto=format&fit=crop&q=80&w=800"
    ],
    longDescription: "Economize e garanta a diversão completa! O Kit Festa reúne nossos campeões de aluguel: um Tobogã Médio, uma Piscina de Bolinhas Casinha e uma Cama Elástica de 3m. É a solução perfeita para atender crianças de diferentes faixas etárias no mesmo evento.",
    specs: {
      dimensions: "Necessário área livre de 10m x 6m",
      capacity: "Atende até 30 crianças no evento",
      ageRecommendation: "2 a 12 anos",
      power: "110v ou 220v (2 pontos)"
    }
  },
  {
    id: 8,
    name: "Touro Mecânico Kids",
    category: "Esportivos",
    price: 480.00,
    image: "https://images.unsplash.com/photo-1618383055723-f3e0343d5620?auto=format&fit=crop&q=80&w=600",
    isNew: false,
    description: "Velocidade controlada para segurança total.",
    installments: "4x sem juros",
    rating: 4.8,
    reviews: 34,
    gallery: [
      "https://images.unsplash.com/photo-1618383055723-f3e0343d5620?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1500995617113-cf789362a3e1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1575366573905-4b192b7709a6?auto=format&fit=crop&q=80&w=800"
    ],
    longDescription: "Desafio do rodeio com segurança total! O Touro Mecânico Kids possui corpo revestido em couro macio e colchão inflável ao redor para amortecer qualquer queda. O painel de controle digital permite ajustar a velocidade e intensidade dos movimentos, tornando a brincadeira acessível até para crianças menores (com supervisão).",
    specs: {
      dimensions: "4,5m x 4,5m",
      capacity: "1 participante por vez",
      ageRecommendation: "A partir de 4 anos",
      power: "220v (alta potência)"
    }
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ana Souza",
    role: "Mãe do Pedro (5 anos)",
    content: "Os brinquedos chegaram limpinhos e antes do horário. O monitor foi super atencioso com as crianças!",
    avatar: "https://picsum.photos/seed/ana/100/100"
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    role: "Organizador de Eventos",
    content: "Parceiros de confiança. A Center Parque nunca me deixou na mão, equipamentos sempre novos.",
    avatar: "https://picsum.photos/seed/carlos/100/100"
  },
  {
    id: 3,
    name: "Mariana Lima",
    role: "Mãe da Sofia (3 anos)",
    content: "Minha filha amou a piscina de bolinhas. Atendimento nota 10 desde o WhatsApp até a retirada.",
    avatar: "https://picsum.photos/seed/mariana/100/100"
  }
];

export const CATEGORIES = [
  { title: "Pula-Pulas", icon: Smile, color: "bg-blue-400" },
  { title: "Tobogãs", icon: Truck, color: "bg-brand-red" },
  { title: "Piscinas de Bolinha", icon: Package, color: "bg-brand-yellow" },
  { title: "Kits Festa", icon: Tag, color: "bg-green-500" },
  { title: "Esportivos", icon: Tag, color: "bg-purple-500" }
];