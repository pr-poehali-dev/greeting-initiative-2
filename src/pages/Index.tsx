import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';

interface ChessPlayer {
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

const Index = () => {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate('/');
  };
  
  const playHoverSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {}
  };

  const { playerCards } = useGameStore();

  const sortedPlayers = useMemo(() => {
    return [...playerCards].sort((a, b) => b.price - a.price);
  }, [playerCards]);

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'gold':
        return 'from-yellow-900/60 via-amber-800/50 to-yellow-900/60';
      case 'orange':
        return 'from-orange-900/60 via-orange-800/50 to-orange-900/60';
      case 'blue':
        return 'from-blue-950/60 via-blue-900/50 to-blue-950/60';
      case 'turquoise':
        return 'from-cyan-950/60 via-cyan-900/50 to-cyan-950/60';
      default:
        return 'from-zinc-900/60 via-zinc-800/50 to-zinc-900/60';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'gold':
        return 'border-amber-600/80';
      case 'orange':
        return 'border-orange-600/80';
      case 'blue':
        return 'border-blue-600/80';
      case 'turquoise':
        return 'border-cyan-600/80';
      default:
        return 'border-zinc-600/80';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <Button
            onClick={handleBackToMenu}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Меню
          </Button>
          <Button
            onClick={() => navigate('/profile')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
          >
            <Icon name="User" size={20} className="mr-2" />
            Сводка
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-7xl font-black text-foreground mb-4">
            МОЯ КОЛЛЕКЦИЯ
          </h1>
          <p className="text-xl text-muted-foreground font-medium tracking-wider">
            {playerCards.length === 0 ? 'У тебя пока нет карточек. Купи паки в магазине!' : `ВСЕГО КАРТОЧЕК: ${playerCards.length}`}
          </p>
        </div>

        {playerCards.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📦</div>
            <h2 className="text-4xl font-black text-muted-foreground mb-4">Коллекция пуста</h2>
            <Button onClick={() => navigate('/shop')} size="lg" className="text-xl">
              <Icon name="ShoppingBag" size={24} className="mr-2" />
              Открыть магазин
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedPlayers.map((player) => (
            <div
              key={player.id}
              className="group relative transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              onMouseEnter={playHoverSound}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500 rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${
                    player.rarity === 'gold' ? '#D97706, #92400E' :
                    player.rarity === 'orange' ? '#C2410C, #7C2D12' :
                    player.rarity === 'blue' ? '#1D4ED8, #1E3A8A' :
                    '#0E7490, #155E75'
                  })`
                }}
              />
              
              <Card className={`relative bg-gradient-to-br ${getRarityGradient(player.rarity)} backdrop-blur-sm p-6 border-2 ${getRarityBorder(player.rarity)} rounded-3xl overflow-hidden shadow-xl animate-shimmer`}
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 3s ease-in-out infinite'
                }}>
                <div className="h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-left">
                      <div className="text-5xl font-black text-white/95 mb-1">{player.rating}</div>
                      <div className="text-xl font-bold text-white/70">{player.position}</div>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 bg-black/30 rounded-lg border border-white/20">
                        <span className="text-sm font-bold text-white/90">{player.position}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-white/20">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-white/95 text-center mb-2">
                      {player.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-xs text-white/50 font-medium">PAC</div>
                      <div className="text-xl font-bold text-white/90">{player.stats.PAC}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-white/50 font-medium">SHO</div>
                      <div className="text-xl font-bold text-white/90">{player.stats.SHO}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-white/50 font-medium">PAS</div>
                      <div className="text-xl font-bold text-white/90">{player.stats.PAS}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-white/50 font-medium">DRI</div>
                      <div className="text-xl font-bold text-white/90">{player.stats.DRI}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-white/50 font-medium">DEF</div>
                      <div className="text-xl font-bold text-white/90">{player.stats.DEF}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-white/50 font-medium">PHY</div>
                      <div className="text-xl font-bold text-white/90">{player.stats.PHY}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-1">
                      <Icon name="Zap" size={16} className="text-amber-400/80" />
                      <span className="text-sm font-bold text-white/90">{player.skill}★</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Navigation" size={16} className="text-white/50" />
                      <span className="text-sm font-bold text-white/90">{player.weak_foot}★</span>
                    </div>
                  </div>

                  <div className="bg-black/20 backdrop-blur-sm rounded-xl py-3 px-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={20} className="text-amber-400/80" />
                        <span className="text-2xl font-black text-white/95">
                          {(player.price / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white/60 uppercase">FUT</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Index;