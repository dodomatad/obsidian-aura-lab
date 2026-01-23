// Central product data for the complete Opium fleet
import boatPono from '@/assets/boat-pono.png';
import boatSurfski from '@/assets/boat-surfski.png';
import boatPink from '@/assets/boat-pink.png';
import boatCarbon from '@/assets/boat-carbon.png';
import boatCamo from '@/assets/boat-camo.png';

// PONO Gallery Images
import ponoDetail1 from '@/assets/boats/pono/pono-detail-1.jpg';
import ponoDetail2 from '@/assets/boats/pono/pono-detail-2.jpg';
import ponoDetail3 from '@/assets/boats/pono/pono-detail-3.jpg';
import ponoDetail4 from '@/assets/boats/pono/pono-detail-4.jpg';
import ponoDetail5 from '@/assets/boats/pono/pono-detail-5.jpg';
import ponoDetail6 from '@/assets/boats/pono/pono-detail-6.jpg';

export interface ColorOption {
  id: string;
  name: string;
  color: string;
  image: string;
}

export interface ProductSpecs {
  length: string;
  beam: string;
  weight: string;
  capacity?: string;
  material?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Surfski Individual' | 'Surfski Duplo' | 'Canoa Havaiana';
  level: string;
  levelColor: string; // Tailwind class
  difficultyLevel: number; // 0-100 numeric scale for StabilityMeter
  description: string;
  image: string;
  specs: ProductSpecs;
  features: string[];
  colors: ColorOption[];
  defaultImage: string;
  galleryImages?: string[]; // Optional product photo gallery
}

// Complete fleet data
export const productsData: Record<string, Product> = {
  // --- SURFSKI INDIVIDUAL ---
  pono: {
    id: 'pono',
    name: 'PONO',
    tagline: 'Estabilidade e Controle',
    category: 'Surfski Individual',
    level: 'Fácil (Iniciante)',
    levelColor: 'text-emerald-400',
    difficultyLevel: 15, // Mais Estável
    description: 'Ideal para iniciantes e nível intermediário. Atende até o avançado pois navega perfeitamente até nas piores condições de mar.',
    image: boatPono,
    specs: {
      length: '6.20m',
      beam: '42cm',
      weight: '11kg',
      capacity: '120kg',
      material: 'Fibra de Carbono + Kevlar',
    },
    features: [
      'Cockpit ergonômico com ajuste lombar',
      'Proa hidrodinâmica para mínima resistência',
      'Sistema de drenagem automática',
      'Compartimentos estanques para equipamentos',
      'Acabamento UV resistant',
    ],
    colors: [
      { id: 'default', name: 'Branco Ártico', color: '#E8E8E8', image: boatPono },
      { id: 'pink', name: 'Rosa Sunset', color: '#E8A4B8', image: boatPink },
      { id: 'carbon', name: 'Carbono Stealth', color: '#2A2A2A', image: boatCarbon },
      { id: 'camo', name: 'Camuflagem Ocean', color: '#4A6741', image: boatCamo },
    ],
    defaultImage: boatPono,
    galleryImages: [
      ponoDetail1,
      ponoDetail2,
      ponoDetail3,
      ponoDetail4,
      ponoDetail5,
      ponoDetail6,
    ],
  },
  moana: {
    id: 'moana',
    name: 'MOANA',
    tagline: 'Conquiste o Oceano',
    category: 'Surfski Individual',
    level: 'Fácil a Intermediário',
    levelColor: 'text-emerald-400',
    difficultyLevel: 30,
    description: 'Ideal para iniciantes e intermediários, mas com performance que atende o nível avançado.',
    image: boatSurfski,
    specs: {
      length: '6.40m',
      beam: '43cm',
      weight: '12kg',
      capacity: '115kg',
      material: 'Fibra de Vidro + Carbono',
    },
    features: [
      'Alta estabilidade primária',
      'Cockpit espaçoso e confortável',
      'Compartimentos de carga',
      'Ideal para travessias',
      'Construção durável',
    ],
    colors: [
      { id: 'default', name: 'Branco Oceano', color: '#E8E8E8', image: boatSurfski },
      { id: 'camo', name: 'Camuflagem', color: '#4A6741', image: boatCamo },
    ],
    defaultImage: boatSurfski,
  },
  siou: {
    id: 'siou',
    name: 'SIOU',
    tagline: 'Versatilidade Total',
    category: 'Surfski Individual',
    level: 'Fácil a Intermediário',
    levelColor: 'text-emerald-400',
    difficultyLevel: 40,
    description: 'Versatilidade total. Ideal para quem busca evolução segura entre o nível iniciante e intermediário.',
    image: boatSurfski,
    specs: {
      length: '6.00m',
      beam: '45cm',
      weight: '12kg',
      capacity: '110kg',
      material: 'Fibra de Carbono',
    },
    features: [
      'Design versátil para evolução',
      'Estabilidade superior',
      'Cockpit confortável',
      'Ideal para aprendizado',
      'Fácil manobra',
    ],
    colors: [
      { id: 'default', name: 'Branco Classic', color: '#E8E8E8', image: boatSurfski },
      { id: 'carbon', name: 'Carbono', color: '#2A2A2A', image: boatCarbon },
    ],
    defaultImage: boatSurfski,
  },
  dw: {
    id: 'dw',
    name: 'DW',
    tagline: 'Mestre das Ondas',
    category: 'Surfski Individual',
    level: 'Intermediário a Avançado',
    levelColor: 'text-orange-400',
    difficultyLevel: 70,
    description: 'Ideal para nível intermediário e avançado. O Surfski perfeito para Downwind e Competições.',
    image: boatSurfski,
    specs: {
      length: '6.20m',
      beam: '42cm',
      weight: '11kg',
      capacity: '95kg',
      material: 'Carbono Aeroespacial',
    },
    features: [
      'Proa projetada para ondas',
      'Estabilidade em condições extremas',
      'Aceleração rápida',
      'Controle preciso de leme',
      'Para atletas experientes',
    ],
    colors: [
      { id: 'default', name: 'Branco Racing', color: '#F0F0F0', image: boatSurfski },
      { id: 'carbon', name: 'Stealth Carbon', color: '#1A1A1A', image: boatCarbon },
    ],
    defaultImage: boatSurfski,
  },
  infinity: {
    id: 'infinity',
    name: 'INFINITY',
    tagline: 'Velocidade Pura',
    category: 'Surfski Individual',
    level: 'Avançado (Elite)',
    levelColor: 'text-red-500',
    difficultyLevel: 95, // Mais Veloz/Instável
    description: 'O Surfski mais rápido do Brasil. Para atletas que buscam velocidade pura, perfeito para competições de Alta Performance.',
    image: boatSurfski,
    specs: {
      length: '6.45m',
      beam: '40cm',
      weight: '10.5kg',
      capacity: '95kg',
      material: 'Carbono Pré-Preg Aeroespacial',
    },
    features: [
      'Geometria de ataque para velocidade máxima',
      'Leme integrado com controle por pedal',
      'Cockpit de competição otimizado',
      'Peso ultraleve sem comprometer rigidez',
      'Hidrodinâmica testada em túnel de vento',
    ],
    colors: [
      { id: 'default', name: 'Branco Performance', color: '#F0F0F0', image: boatSurfski },
      { id: 'carbon', name: 'Full Carbon', color: '#1A1A1A', image: boatCarbon },
      { id: 'camo', name: 'Tactical Green', color: '#3D4F3A', image: boatCamo },
    ],
    defaultImage: boatSurfski,
  },

  // --- SURFSKI DUPLO ---
  azimut: {
    id: 'azimut',
    name: 'AZIMUT',
    tagline: 'Duplo Estável',
    category: 'Surfski Duplo',
    level: 'Fácil (Duplo)',
    levelColor: 'text-emerald-400',
    difficultyLevel: 20,
    description: 'Muito estável, leve e veloz. Atende todos os públicos e navega com segurança em qualquer condição de mar.',
    image: boatSurfski,
    specs: {
      length: '7.40m',
      beam: '48cm',
      weight: '18kg',
      capacity: '200kg',
      material: 'Carbono Pré-Preg',
    },
    features: [
      'Design hidrodinâmico otimizado',
      'Cockpit de competição duplo',
      'Sistema de leme responsivo',
      'Construção ultraleve',
      'Acabamento premium',
    ],
    colors: [
      { id: 'default', name: 'Branco Performance', color: '#F0F0F0', image: boatSurfski },
      { id: 'carbon', name: 'Full Carbon', color: '#1A1A1A', image: boatCarbon },
    ],
    defaultImage: boatSurfski,
  },
  'molokay-ss': {
    id: 'molokay-ss',
    name: 'MOLOKAY SS',
    tagline: 'Performance Dupla',
    category: 'Surfski Duplo',
    level: 'Avançado (Duplo)',
    levelColor: 'text-red-500',
    difficultyLevel: 90,
    description: 'O Surfski duplo mais rápido do Brasil. Perfeito para competições de Alta Performance, Downwind e Upwind.',
    image: boatSurfski,
    specs: {
      length: '7.50m',
      beam: '46cm',
      weight: '17kg',
      capacity: '190kg',
      material: 'Carbono Aeroespacial',
    },
    features: [
      'Velocidade máxima em dupla',
      'Estabilidade para alta performance',
      'Cockpits sincronizados',
      'Ideal para competições',
      'Construção ultraleve',
    ],
    colors: [
      { id: 'default', name: 'Branco Racing', color: '#F0F0F0', image: boatSurfski },
      { id: 'carbon', name: 'Carbon Elite', color: '#1A1A1A', image: boatCarbon },
    ],
    defaultImage: boatSurfski,
  },

  // --- CANOAS HAVAIANAS ---
  'haka-oc1': {
    id: 'haka-oc1',
    name: 'HAKA OC1',
    tagline: 'Performance Polinésia',
    category: 'Canoa Havaiana',
    level: 'Fácil (Individual)',
    levelColor: 'text-emerald-400',
    difficultyLevel: 25,
    description: 'Canoa Individual. Muito estável, leve e veloz. Ideal para todos os públicos.',
    image: boatSurfski,
    specs: {
      length: '6.30m',
      beam: '40cm',
      weight: '14kg',
      capacity: '105kg',
      material: 'Carbono + Kevlar',
    },
    features: [
      'Design tradicional havaiano',
      'Ama (flutuador) em carbono',
      'Assento ergonômico ajustável',
      'Conexões Iako reforçadas',
      'Homologada para competições',
    ],
    colors: [
      { id: 'default', name: 'Branco Tradicional', color: '#E8E8E8', image: boatSurfski },
      { id: 'carbon', name: 'Carbon Race', color: '#2A2A2A', image: boatCarbon },
    ],
    defaultImage: boatSurfski,
  },
  'huna-oc2': {
    id: 'huna-oc2',
    name: 'HUNA OC2',
    tagline: 'Aventura em Dupla',
    category: 'Canoa Havaiana',
    level: 'Fácil (Dupla)',
    levelColor: 'text-emerald-400',
    difficultyLevel: 25,
    description: 'Canoa Dupla. Diversão garantida com estabilidade e velocidade.',
    image: boatSurfski,
    specs: {
      length: '7.00m',
      beam: '45cm',
      weight: '20kg',
      capacity: '180kg',
      material: 'Fibra de Vidro + Carbono',
    },
    features: [
      'Estabilidade para dupla',
      'Compartimento de carga',
      'Conforto para longas remadas',
      'Ama reforçada',
      'Fácil entrada e saída',
    ],
    colors: [
      { id: 'default', name: 'Branco Explorer', color: '#E8E8E8', image: boatSurfski },
      { id: 'camo', name: 'Ocean Camo', color: '#4A6741', image: boatCamo },
    ],
    defaultImage: boatSurfski,
  },
};

// Helper functions to get products by category
export const getSurfskiIndividual = (): Product[] => 
  Object.values(productsData).filter(p => p.category === 'Surfski Individual');

export const getSurfskiDuplo = (): Product[] => 
  Object.values(productsData).filter(p => p.category === 'Surfski Duplo');

export const getCanoasHavaianas = (): Product[] => 
  Object.values(productsData).filter(p => p.category === 'Canoa Havaiana');

// Get all products as array
export const getAllProducts = (): Product[] => Object.values(productsData);

// Spec labels with icons
export const specLabels: Record<string, { label: string }> = {
  length: { label: 'Comprimento' },
  beam: { label: 'Boca' },
  weight: { label: 'Peso' },
  capacity: { label: 'Capacidade' },
  material: { label: 'Material' },
};
