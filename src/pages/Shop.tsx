import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useGameStore, ChessPlayer } from '@/store/gameStore';
import { toast } from 'sonner';

interface Pack {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  icon: string;
  minRating: number;
  maxRating: number;
  rarityChances: {
    gold: number;
    orange: number;
    blue: number;
    turquoise: number;
  };
}

const Shop = () => {
  const navigate = useNavigate();
  const { coins, spendCoins, addCard } = useGameStore();
  const [openingPack, setOpeningPack] = useState<Pack | null>(null);
  const [revealedCards, setRevealedCards] = useState<ChessPlayer[]>([]);

  const packs: Pack[] = [
    {
      id: 1,
      name: 'Стартовый пак',
      description: '3 базовые карточки',
      price: 100,
      color: 'from-zinc-700 to-zinc-900',
      icon: 'Package',
      minRating: 75,
      maxRating: 88,
      rarityChances: { gold: 0, orange: 0, blue: 20, turquoise: 80 }
    },
    {
      id: 2,
      name: 'Серебряный пак',
      description: '4 карточки (шанс на редкую)',
      price: 300,
      color: 'from-slate-400 to-slate-600',
      icon: 'ShoppingBag',
      minRating: 85,
      maxRating: 96,
      rarityChances: { gold: 0, orange: 5, blue: 45, turquoise: 50 }
    },
    {
      id: 3,
      name: 'Золотой пак',
      description: '5 карточек (гарантированная редкая)',
      price: 500,
      color: 'from-amber-500 to-yellow-700',
      icon: 'Star',
      minRating: 88,
      maxRating: 102,
      rarityChances: { gold: 5, orange: 25, blue: 50, turquoise: 20 }
    },
    {
      id: 4,
      name: 'Премиум пак',
      description: '6 элитных карточек',
      price: 800,
      color: 'from-purple-600 to-indigo-900',
      icon: 'Crown',
      minRating: 96,
      maxRating: 112,
      rarityChances: { gold: 15, orange: 40, blue: 35, turquoise: 10 }
    }
  ];

  const playerTemplates = [
    { name: 'Magnus Carlsen', position: 'ST', image: 'https://cdn.poehali.dev/files/6b501f62-297a-4e53-b859-cddd90807910.jpg' },
    { name: 'Garry Kasparov', position: 'CM', image: 'https://cdn.poehali.dev/files/fa2a2502-6820-4097-9db1-c1dab8addcd4.jpg' },
    { name: 'Hikaru Nakamura', position: 'CAM', image: 'https://cdn.poehali.dev/files/770c39ca-4e5e-4358-b255-0f826aa2ee48.jpg' },
    { name: 'Bobby Fischer', position: 'CF', image: 'https://cdn.poehali.dev/files/eb65bb6d-48c5-4110-89a6-c0a5d3276da3.jpg' },
  ];

  const getRarityByChance = (chances: Pack['rarityChances']): 'gold' | 'orange' | 'blue' | 'turquoise' => {
    const rand = Math.random() * 100;
    let cumulative = 0;
    
    for (const [rarity, chance] of Object.entries(chances)) {
      cumulative += chance;
      if (rand <= cumulative) {
        return rarity as 'gold' | 'orange' | 'blue' | 'turquoise';
      }
    }
    return 'turquoise';
  };

  const generateCard = (pack: Pack): ChessPlayer => {
    const rarity = getRarityByChance(pack.rarityChances);
    const template = playerTemplates[Math.floor(Math.random() * playerTemplates.length)];
    const rating = Math.floor(Math.random() * (pack.maxRating - pack.minRating + 1)) + pack.minRating;
    
    const baseStats = Math.floor(rating * 0.85);
    const variance = 10;
    
    return {
      id: Date.now() + Math.random(),
      name: template.name,
      rating,
      position: template.position,
      rarity,
      price: rating * 5000,
      image: template.image,
      stats: {
        PAC: Math.min(99, baseStats + Math.floor(Math.random() * variance)),
        SHO: Math.min(99, baseStats + Math.floor(Math.random() * variance)),
        PAS: Math.min(99, baseStats + Math.floor(Math.random() * variance)),
        DRI: Math.min(99, baseStats + Math.floor(Math.random() * variance)),
        DEF: Math.min(99, baseStats + Math.floor(Math.random() * variance)),
        PHY: Math.min(99, baseStats + Math.floor(Math.random() * variance)),
      },
      skill: Math.min(5, Math.floor(rating / 20)),
      weak_foot: Math.min(5, Math.floor(rating / 25))
    };
  };

  const handleBuyPack = (pack: Pack) => {
    if (!spendCoins(pack.price)) {
      toast.error('Недостаточно монет!');
      return;
    }

    setOpeningPack(pack);
    const cardsCount = pack.id + 2;
    const cards: ChessPlayer[] = [];
    
    for (let i = 0; i < cardsCount; i++) {
      const card = generateCard(pack);
      cards.push(card);
      addCard(card);
    }
    
    setRevealedCards(cards);
    toast.success(`Открыт ${pack.name}!`);
  };

  const handleClosePack = () => {
    setOpeningPack(null);
    setRevealedCards([]);
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'gold': return 'from-yellow-900/60 via-amber-800/50 to-yellow-900/60';
      case 'orange': return 'from-orange-900/60 via-orange-800/50 to-orange-900/60';
      case 'blue': return 'from-blue-950/60 via-blue-900/50 to-blue-950/60';
      case 'turquoise': return 'from-cyan-950/60 via-cyan-900/50 to-cyan-950/60';
      default: return 'from-zinc-900/60 via-zinc-800/50 to-zinc-900/60';
    }
  };

  if (openingPack && revealedCards.length > 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black text-foreground mb-4">
              🎉 {openingPack.name.toUpperCase()}
            </h1>
            <p className="text-2xl text-muted-foreground">Твои новые карточки!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {revealedCards.map((card, idx) => (
              <Card
                key={idx}
                className={`bg-gradient-to-br ${getRarityGradient(card.rarity)} p-6 border-2 rounded-3xl`}
              >
                <div className="text-center mb-4">
                  <div className="text-5xl font-black text-white mb-2">{card.rating}</div>
                  <div className="text-xl font-bold text-white/70">{card.position}</div>
                </div>
                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-black text-white text-center">{card.name}</h3>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={handleClosePack} size="lg" className="text-xl px-8 py-6">
              <Icon name="Check" size={24} className="mr-2" />
              Отлично!
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button onClick={() => navigate('/')} variant="ghost">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Меню
          </Button>
          <div className="flex items-center gap-3 bg-amber-500/20 px-6 py-3 rounded-full border-2 border-amber-500">
            <Icon name="Coins" size={28} className="text-amber-400" />
            <span className="text-3xl font-black text-amber-400">{coins}</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-7xl font-black text-foreground mb-4">МАГАЗИН</h1>
          <p className="text-xl text-muted-foreground">Покупай паки и получай карточки!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packs.map((pack) => (
            <Card
              key={pack.id}
              className={`bg-gradient-to-br ${pack.color} p-8 border-2 border-white/20 rounded-3xl hover:scale-105 transition-all cursor-pointer group`}
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Icon name={pack.icon as any} size={48} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-white mb-2">{pack.name}</h2>
                <p className="text-lg text-white/70 mb-4">{pack.description}</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Icon name="Coins" size={32} className="text-yellow-400" />
                  <span className="text-4xl font-black text-yellow-400">{pack.price}</span>
                </div>
                <Button
                  onClick={() => handleBuyPack(pack)}
                  disabled={coins < pack.price}
                  size="lg"
                  className="w-full text-xl py-6 bg-white text-black hover:bg-white/90 disabled:opacity-50"
                >
                  <Icon name="ShoppingCart" size={24} className="mr-2" />
                  Купить пак
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
