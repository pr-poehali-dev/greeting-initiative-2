import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface PlayerStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalCards: number;
  goldCards: number;
  totalMatches: number;
  wins: number;
  coins: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const [playerStats] = useState<PlayerStats>({
    level: 1,
    xp: 0,
    xpToNextLevel: 1000,
    totalCards: 0,
    goldCards: 0,
    totalMatches: 0,
    wins: 0,
    coins: 0
  });

  const xpProgress = (playerStats.xp / playerStats.xpToNextLevel) * 100;
  const winRate = ((playerStats.wins / playerStats.totalMatches) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#1A1A2E] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-6 text-white/70 hover:text-white"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к карточкам
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
            ПРОФИЛЬ ИГРОКА
          </h1>
          <p className="text-xl text-gray-400 font-medium mb-6">Твоя статистика и прогресс</p>
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black text-lg px-8 py-6"
          >
            <Icon name="Play" size={24} className="mr-2" />
            Начать играть
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-amber-900/40 via-yellow-800/30 to-amber-900/40 backdrop-blur-sm p-8 border-2 border-amber-700/60 rounded-3xl mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-white/95 mb-2">Уровень {playerStats.level}</h2>
              <p className="text-white/60">
                {playerStats.xp.toLocaleString()} / {playerStats.xpToNextLevel.toLocaleString()} XP
              </p>
            </div>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center border-4 border-white/20">
              <span className="text-4xl font-black text-white">{playerStats.level}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="h-4 bg-black/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-sm text-white/50 mt-2 text-center">
              {((playerStats.xpToNextLevel - playerStats.xp) / 1000).toFixed(1)}K XP до следующего уровня
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Icon name="Coins" size={24} className="text-amber-400" />
            <span className="text-3xl font-black text-white/95">
              {(playerStats.coins / 1000).toFixed(0)}K
            </span>
            <span className="text-white/60">монет</span>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-blue-900/40 via-blue-700/30 to-blue-900/40 backdrop-blur-sm p-6 border-2 border-blue-700/60 rounded-3xl">
            <div className="flex items-start justify-between mb-4">
              <Icon name="Library" size={32} className="text-blue-400" />
              <div className="text-right">
                <div className="text-4xl font-black text-white/95">{playerStats.totalCards}</div>
                <div className="text-sm text-white/60">Всего карточек</div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
              <Icon name="Star" size={20} className="text-amber-400" />
              <span className="text-white/90 font-bold">{playerStats.goldCards} золотых карт</span>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/40 via-orange-700/30 to-orange-900/40 backdrop-blur-sm p-6 border-2 border-orange-700/60 rounded-3xl">
            <div className="flex items-start justify-between mb-4">
              <Icon name="Trophy" size={32} className="text-orange-400" />
              <div className="text-right">
                <div className="text-4xl font-black text-white/95">{playerStats.wins}</div>
                <div className="text-sm text-white/60">Побед</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-white/70">Винрейт</span>
              <span className="text-2xl font-black text-green-400">{winRate}%</span>
            </div>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-cyan-900/40 via-cyan-700/30 to-cyan-900/40 backdrop-blur-sm p-6 border-2 border-cyan-700/60 rounded-3xl">
          <h3 className="text-2xl font-black text-white/95 mb-4 flex items-center gap-2">
            <Icon name="Target" size={28} className="text-cyan-400" />
            Достижения
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/20 rounded-xl border border-white/10">
              <Icon name="Flame" size={32} className="text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white/95">0</div>
              <div className="text-xs text-white/60">Дней подряд</div>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-xl border border-white/10">
              <Icon name="Award" size={32} className="text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white/95">{playerStats.totalMatches}</div>
              <div className="text-xs text-white/60">Игр сыграно</div>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-xl border border-white/10">
              <Icon name="Zap" size={32} className="text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white/95">0</div>
              <div className="text-xs text-white/60">Макс комбо</div>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-xl border border-white/10">
              <Icon name="Crown" size={32} className="text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white/95">0</div>
              <div className="text-xs text-white/60">Титулов</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;