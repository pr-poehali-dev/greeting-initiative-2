import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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
        return 'from-yellow-600 via-yellow-400 to-yellow-600';
      case 'orange':
        return 'from-orange-600 via-orange-400 to-orange-600';
      case 'blue':
        return 'from-blue-600 via-blue-400 to-blue-600';
      case 'turquoise':
        return 'from-cyan-600 via-cyan-400 to-cyan-600';
      default:
        return 'from-gray-600 via-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'gold':
        return 'border-yellow-500';
      case 'orange':
        return 'border-orange-500';
      case 'blue':
        return 'border-blue-500';
      case 'turquoise':
        return 'border-cyan-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] py-12 px-4">
      <div className="max-w-7xl mx-auto">
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
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300 rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${
                    player.rarity === 'gold' ? '#FFD700, #FFA500' :
                    player.rarity === 'orange' ? '#FF8C00, #FF6347' :
                    player.rarity === 'blue' ? '#4169E1, #1E90FF' :
                    '#00CED1, #20B2AA'
                  })`
                }}
              />
              
              <Card className={`relative bg-gradient-to-br ${getRarityGradient(player.rarity)} p-6 border-4 ${getRarityBorder(player.rarity)} rounded-3xl overflow-hidden shadow-2xl`}>
                <div className="h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-left">
                      <div className="text-5xl font-black text-white mb-1">{player.rating}</div>
                      <div className="text-xl font-bold text-gray-300">{player.position}</div>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700">
                        <span className="text-sm font-bold text-white">{player.position}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="w-48 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-white text-center mb-2">
                      {player.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-400 font-medium">PAC</div>
                      <div className="text-xl font-bold text-white">{player.stats.PAC}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 font-medium">SHO</div>
                      <div className="text-xl font-bold text-white">{player.stats.SHO}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 font-medium">PAS</div>
                      <div className="text-xl font-bold text-white">{player.stats.PAS}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 font-medium">DRI</div>
                      <div className="text-xl font-bold text-white">{player.stats.DRI}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 font-medium">DEF</div>
                      <div className="text-xl font-bold text-white">{player.stats.DEF}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 font-medium">PHY</div>
                      <div className="text-xl font-bold text-white">{player.stats.PHY}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-1">
                      <Icon name="Zap" size={16} className="text-yellow-500" />
                      <span className="text-sm font-bold text-white">{player.skill}★</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Navigation" size={16} className="text-gray-400" />
                      <span className="text-sm font-bold text-white">{player.weak_foot}★</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl py-3 px-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={20} className="text-yellow-300" />
                        <span className="text-2xl font-black text-white">
                          {(player.price / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="text-xs font-bold text-orange-100 uppercase">FUT</div>
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