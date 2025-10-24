import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChessPlayer {
  id: number;
  name: string;
  rating: number;
  position: string;
  rarity: 'gold' | 'orange' | 'blue' | 'turquoise';
  price: number;
  image: string;
  stats: {
    PAC: number;
    SHO: number;
    PAS: number;
    DRI: number;
    DEF: number;
    PHY: number;
  };
  skill: number;
  weak_foot: number;
}

interface GameStore {
  coins: number;
  playerCards: ChessPlayer[];
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addCard: (card: ChessPlayer) => void;
  removeCard: (cardId: number) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      coins: 1000,
      playerCards: [],
      
      addCoins: (amount: number) => {
        set((state) => ({ coins: state.coins + amount }));
      },
      
      spendCoins: (amount: number) => {
        const currentCoins = get().coins;
        if (currentCoins >= amount) {
          set({ coins: currentCoins - amount });
          return true;
        }
        return false;
      },
      
      addCard: (card: ChessPlayer) => {
        set((state) => ({
          playerCards: [...state.playerCards, { ...card, id: Date.now() }]
        }));
      },
      
      removeCard: (cardId: number) => {
        set((state) => ({
          playerCards: state.playerCards.filter(card => card.id !== cardId)
        }));
      },
    }),
    {
      name: 'game-storage',
    }
  )
);
