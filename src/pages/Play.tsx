import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { chessBots, ChessBot } from '@/data/chessBot';
import ChessGame from '@/components/ChessGame';

const Play = () => {
  const navigate = useNavigate();
  const [selectedBot, setSelectedBot] = useState<ChessBot | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced', 'expert', 'master'];
  const difficultyColors = {
    beginner: 'from-green-600 to-emerald-600',
    intermediate: 'from-blue-600 to-cyan-600',
    advanced: 'from-purple-600 to-pink-600',
    expert: 'from-orange-600 to-red-600',
    master: 'from-yellow-600 to-amber-600'
  };

  const difficultyLabels = {
    beginner: 'Новичок',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
    expert: 'Эксперт',
    master: 'Мастер'
  };

  const filteredBots = filterDifficulty === 'all' 
    ? chessBots 
    : chessBots.filter(bot => bot.difficulty === filterDifficulty);

  if (selectedBot) {
    return (
      <ChessGame 
        bot={selectedBot} 
        onExit={() => setSelectedBot(null)} 
      />
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
        </div>

        <div className="text-center mb-12">
          <h1 className="text-7xl font-black text-foreground mb-4">ШАХМАТЫ</h1>
          <p className="text-xl text-muted-foreground">Выбери соперника и играй!</p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {difficulties.map(diff => (
            <Button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              variant={filterDifficulty === diff ? 'default' : 'outline'}
              className="capitalize"
            >
              {diff === 'all' ? 'Все уровни' : difficultyLabels[diff as keyof typeof difficultyLabels]}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBots.map((bot) => (
            <Card
              key={bot.id}
              className={`bg-gradient-to-br ${difficultyColors[bot.difficulty]} p-6 border-2 border-white/20 rounded-3xl hover:scale-105 transition-all cursor-pointer group`}
              onClick={() => setSelectedBot(bot)}
            >
              <div className="text-center">
                <div className="text-7xl mb-4">{bot.avatar}</div>
                <h2 className="text-3xl font-black text-white mb-2">{bot.name}</h2>
                <p className="text-white/70 mb-3">{bot.personality}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Icon name="Trophy" size={20} className="text-yellow-400" />
                  <span className="text-2xl font-black text-yellow-400">{bot.rating}</span>
                </div>
                <div className="px-3 py-1 bg-black/30 rounded-lg inline-block">
                  <span className="text-sm font-bold text-white/90 capitalize">
                    {difficultyLabels[bot.difficulty]}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Play;
