import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

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

  const [players] = useState<ChessPlayer[]>([
    {
      id: 1,
      name: 'Magnus Carlsen',
      rating: 112,
      position: 'ST',
      rarity: 'gold',
      price: 560000,
      image: 'https://cdn.poehali.dev/files/6b501f62-297a-4e53-b859-cddd90807910.jpg',
      stats: { PAC: 99, SHO: 98, PAS: 97, DRI: 98, DEF: 99, PHY: 99 },
      skill: 5,
      weak_foot: 5
    },
    {
      id: 2,
      name: 'Magnus Carlsen',
      rating: 102,
      position: 'ST',
      rarity: 'orange',
      price: 340000,
      image: 'https://cdn.poehali.dev/files/fa2a2502-6820-4097-9db1-c1dab8addcd4.jpg',
      stats: { PAC: 96, SHO: 96, PAS: 97, DRI: 98, DEF: 97, PHY: 99 },
      skill: 4,
      weak_foot: 4
    },
    {
      id: 3,
      name: 'Magnus Carlsen',
      rating: 96,
      position: 'ST',
      rarity: 'blue',
      price: 270000,
      image: 'https://cdn.poehali.dev/files/770c39ca-4e5e-4358-b255-0f826aa2ee48.jpg',
      stats: { PAC: 95, SHO: 94, PAS: 96, DRI: 96, DEF: 96, PHY: 98 },
      skill: 4,
      weak_foot: 3
    },
    {
      id: 4,
      name: 'Magnus Carlsen',
      rating: 88,
      position: 'ST',
      rarity: 'turquoise',
      price: 155000,
      image: 'https://cdn.poehali.dev/files/eb65bb6d-48c5-4110-89a6-c0a5d3276da3.jpg',
      stats: { PAC: 86, SHO: 88, PAS: 87, DRI: 85, DEF: 86, PHY: 90 },
      skill: 3,
      weak_foot: 2
    }
  ]);

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.price - a.price);
  }, [players]);

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'gold':
        return 'from-amber-900/40 via-yellow-800/30 to-amber-900/40';
      case 'orange':
        return 'from-orange-900/40 via-orange-700/30 to-orange-900/40';
      case 'blue':
        return 'from-blue-900/40 via-blue-700/30 to-blue-900/40';
      case 'turquoise':
        return 'from-cyan-900/40 via-cyan-700/30 to-cyan-900/40';
      default:
        return 'from-gray-900/40 via-gray-700/30 to-gray-900/40';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'gold':
        return 'border-amber-700/60';
      case 'orange':
        return 'border-orange-700/60';
      case 'blue':
        return 'border-blue-700/60';
      case 'turquoise':
        return 'border-cyan-700/60';
      default:
        return 'border-gray-700/60';
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <Button
            onClick={handleBackToMenu}
            variant="ghost"
            className="text-white/70 hover:text-white"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Меню
          </Button>
          <Button
            onClick={() => navigate('/profile')}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold"
          >
            <Icon name="User" size={20} className="mr-2" />
            Сводка
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
            CHESS ULTIMATE TEAM
          </h1>
          <p className="text-xl text-gray-400 font-medium">Premium Cards Collection</p>
        </div>

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
      </div>
    </div>
  );
};

export default Index;