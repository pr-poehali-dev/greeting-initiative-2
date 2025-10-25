import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useGameStore } from '@/store/gameStore';
import { Progress } from '@/components/ui/progress';

const AchievementsPanel = () => {
  const { achievements } = useGameStore();

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-black text-foreground mb-1">
              Достижения
            </h2>
            <p className="text-muted-foreground">
              Открыто {unlockedCount} из {totalCount}
            </p>
          </div>
          <div className="text-7xl">🏆</div>
        </div>

        <Progress value={progressPercent} className="h-3" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const progressPercent = (achievement.progress / achievement.target) * 100;
          
          return (
            <Card
              key={achievement.id}
              className={`p-6 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-2 border-yellow-500/50'
                  : 'bg-card/50 backdrop-blur border-2 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`text-6xl ${achievement.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {achievement.title}
                    </h3>
                    {achievement.unlocked && (
                      <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span className="text-xs font-bold text-green-500">Открыто</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement.description}
                  </p>

                  {!achievement.unlocked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-bold text-foreground">
                          {achievement.progress} / {achievement.target}
                        </span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                  )}

                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Icon name="Clock" size={14} />
                      <span>
                        Открыто {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {unlockedCount === 0 && (
        <Card className="p-12 text-center bg-card/50 backdrop-blur">
          <div className="text-8xl mb-4">🎯</div>
          <h3 className="text-3xl font-black text-foreground mb-2">
            Начни свой путь!
          </h3>
          <p className="text-xl text-muted-foreground">
            Проходи уроки и открывай достижения
          </p>
        </Card>
      )}

      {unlockedCount === totalCount && (
        <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50">
          <div className="flex items-center gap-4">
            <div className="text-8xl">👑</div>
            <div className="flex-1">
              <h3 className="text-3xl font-black text-foreground mb-1">
                Невероятно!
              </h3>
              <p className="text-xl text-muted-foreground">
                Ты открыл все достижения! Продолжай учиться!
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AchievementsPanel;
