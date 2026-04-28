import { create } from 'zustand';

export interface ShelfItem {
  id: number;
  name: string;
  brand: string;
  image: string;
  category: string;
  usage: number;
  color: string;
}

export interface Journey {
  id: string;
  name: string;
  destination: string;
  fromDate: string;
  toDate: string;
  climate?: 'tropical' | 'dry' | 'cold' | 'temperate';
  condition?: string;
  packingList: { itemId: number; packed: boolean; recommended: boolean }[];
}

interface JourneyState {
  items: ShelfItem[];
  journeys: Journey[];
  addItem: (item: ShelfItem) => void;
  addJourney: (journey: Journey) => void;
  updateJourney: (id: string, updates: Partial<Journey>) => void;
  deleteJourney: (id: string) => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  items: [
    {
      id: 1,
      name: 'Tatcha Water Cream',
      brand: 'TATCHA',
      image: 'https://www.joycegiraud.com/cdn/shop/files/PET_SHAMPOO_CLOSED_FRONT_copy_150x.png?v=1728410142',
      category: 'Creams',
      usage: 92,
      color: '#FFF3F6',
    },
    {
      id: 2,
      name: 'La Mer Soft Cream',
      brand: 'LA MER',
      image: 'https://www.joycegiraud.com/cdn/shop/files/Pure4.png?v=1729636331',
      category: 'Creams',
      usage: 85,
      color: '#EAF6FF',
    },
    {
      id: 3,
      name: 'Radiance Serum',
      brand: 'JOYCE GIRAUD',
      image: 'https://www.joycegiraud.com/cdn/shop/files/Ultimate_beauty_sleep_60_days_500x.png?v=1746571919',
      category: 'Serums',
      usage: 78,
      color: '#FDF7E2',
    },
    {
      id: 4,
      name: 'Hydra Mist',
      brand: 'HYDRA',
      image: 'https://www.joycegiraud.com/cdn/shop/t/42/assets/NOURISHINGCONDITIONER.png?v=108449484283680266711728966512',
      category: 'Mists',
      usage: 64,
      color: '#F3F4F6',
    },
  ],
  journeys: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  addJourney: (journey) => set((state) => ({ journeys: [journey, ...state.journeys] })),
  updateJourney: (id, updates) =>
    set((state) => ({
      journeys: state.journeys.map((j) => (j.id === id ? { ...j, ...updates } : j)),
    })),
  deleteJourney: (id) =>
    set((state) => ({
      journeys: state.journeys.filter((j) => j.id !== id),
    })),
}));
