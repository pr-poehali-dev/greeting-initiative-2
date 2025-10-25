import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useGameStore } from '@/store/gameStore';

interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  experience: number;
  streak: number;
  avatar: string;
}

const LeaderboardPanel = () => {
  const { level, experience, streak, totalLessonsCompleted } = useGameStore();
  
  const userRank = 15;
  const leagueRanks = ['Бронза', 'Серебро', 'Золото', 'Платина', 'Алмаз'];
  const currentLeague = level < 5 ? 0 : level < 10 ? 1 : level < 20 ? 2 : level < 35 ? 3 : 4;
  
  const topPlayers: LeaderboardEntry[] = [
    { rank: 1, name: 'Александр М.', level: 42, experience: 25680, streak: 45, avatar: '👑' },
    { rank: 2, name: 'Мария К.', level: 38, experience: 21340, streak: 32, avatar: '🌟' },
    { rank: 3, name: 'Дмитрий П.', level: 35, experience: 19870, streak: 28, avatar: '⚡' },
    { rank: 4, name: 'Анна С.', level: 33, experience: 18450, streak: 25, avatar: '💎' },
    { rank: 5, name: 'Иван Р.', level: 31, experience: 17220, streak: 22, avatar: '🔥' },
    { rank: 6, name: 'Екатерина Л.', level: 29, experience: 16100, streak: 20, avatar: '✨' },
    { rank: 7, name: 'Михаил В.', level: 27, experience: 15320, streak: 18, avatar: '🎯' },
    { rank: 8, name: 'Ольга Н.', level: 25, experience: 14250, streak: 16, avatar: '🌈' },
    { rank: 9, name: 'Сергей Б.', level: 24, experience: 13780, streak: 15, avatar: '🚀' },
    { rank: 10, name: 'Наталья Ж.', level: 22, experience: 12890, streak: 14, avatar: '💫' },
  ];

  const getLeagueIcon = (league: number) => {
    const icons = ['🥉', '🥈', '🥇', '💎', '👑'];
    return icons[league];
  };

  const getLeagueColor = (league: number) => {
    const colors = [
      'from-amber-600 to-yellow-700',
      'from-gray-400 to-gray-600',
      'from-yellow-400 to-yellow-600',
      'from-cyan-400 to-blue-600',
      'from-purple-500 to-pink-600'
    ];
    return colors[league];
  };

  return (
    <div className="space-y-6">
      <Card className={`p-6 bg-gradient-to-r ${getLeagueColor(currentLeague)} text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-6xl mb-2">{getLeagueIcon(currentLeague)}</div>
            <h2 className="text-3xl font-black mb-1">
              Лига: {leagueRanks[currentLeague]}
            </h2>
            <p className="text-white/80">Ваш ранг: #{userRank}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black">{level}</div>
            <div className="text-sm text-white/80">Уровень</div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur border-2">
        <h3 className="text-2xl font-black text-foreground mb-4 flex items-center gap-2">
          <Icon name="Trophy" size={28} className="text-yellow-500" />
          Топ-10 игроков
        </h3>

        <div className="space-y-2">
          {topPlayers.map((player) => (
            <div
              key={player.rank}
              className={`p-4 rounded-lg transition-all ${
                player.rank <= 3
                  ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50'
                  : 'bg-muted/30 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`text-3xl font-black ${
                  player.rank === 1 ? 'text-yellow-500' :
                  player.rank === 2 ? 'text-gray-400' :
                  player.rank === 3 ? 'text-amber-600' :
                  'text-muted-foreground'
                }`}>
                  #{player.rank}
                </div>
                
                <div className="text-3xl">{player.avatar}</div>
                
                <div className="flex-1">
                  <div className="font-bold text-foreground">{player.name}</div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="TrendingUp" size={14} />
                      Уровень {player.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Flame" size={14} className="text-orange-500" />
                      {player.streak} дней
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-primary">{player.experience.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">опыта</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur border-2">
        <h3 className="text-2xl font-black text-foreground mb-4 flex items-center gap-2">
          <Icon name="User" size={28} className="text-primary" />
          Ваша статистика
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <div className="text-3xl font-black text-blue-500">{totalLessonsCompleted}</div>
            <div className="text-sm text-muted-foreground">Уроков пройдено</div>
          </div>
          
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <div className="text-3xl font-black text-orange-500">{streak}</div>
            <div className="text-sm text-muted-foreground">Дней подряд</div>
          </div>
          
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <div className="text-3xl font-black text-green-500">{level}</div>
            <div className="text-sm text-muted-foreground">Уровень</div>
          </div>
          
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <div className="text-3xl font-black text-purple-500">#{userRank}</div>
            <div className="text-sm text-muted-foreground">Место в лиге</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LeaderboardPanel;
