import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useGameStore } from '@/store/gameStore';
import { toast } from 'sonner';

const DailyQuestsPanel = () => {
  const { dailyQuests, generateDailyQuests, addCoins } = useGameStore();

  useEffect(() => {
    generateDailyQuests();
  }, [generateDailyQuests]);

  const handleClaimReward = (questId: string, reward: number) => {
    addCoins(reward);
    toast.success(`Получено ${reward} монет!`);
  };

  const completedQuests = dailyQuests.filter(q => q.completed).length;
  const totalQuests = dailyQuests.length;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-primary/20 to-primary/10 border-primary/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-black text-foreground mb-1">
              Ежедневные задания
            </h2>
            <p className="text-muted-foreground">
              Выполняй задания каждый день и получай награды!
            </p>
          </div>
          <div className="text-6xl">📋</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Прогресс дня</span>
              <span className="font-bold text-foreground">{completedQuests} / {totalQuests}</span>
            </div>
            <Progress value={(completedQuests / totalQuests) * 100} className="h-3" />
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {dailyQuests.map((quest) => {
          const progressPercent = (quest.progress / quest.target) * 100;
          
          return (
            <Card
              key={quest.id}
              className={`p-6 transition-all ${
                quest.completed
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-card/50 backdrop-blur border-2 hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{quest.icon}</div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {quest.title}
                    </h3>
                    {quest.completed && (
                      <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span className="text-xs font-bold text-green-500">Выполнено</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {quest.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-bold text-foreground">
                        {quest.progress} / {quest.target}
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-2 rounded-lg mb-2">
                    <Icon name="Coins" size={20} className="text-yellow-500" />
                    <span className="font-black text-yellow-500 text-xl">
                      +{quest.reward}
                    </span>
                  </div>
                  
                  {quest.completed && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleClaimReward(quest.id, quest.reward)}
                    >
                      <Icon name="Gift" size={16} className="mr-2" />
                      Получено
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {dailyQuests.length === 0 && (
        <Card className="p-12 text-center bg-card/50 backdrop-blur">
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-2xl font-black text-foreground mb-2">
            Задания появятся скоро!
          </h3>
          <p className="text-muted-foreground">
            Новые ежедневные задания обновляются каждый день
          </p>
        </Card>
      )}

      {completedQuests === totalQuests && totalQuests > 0 && (
        <Card className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50">
          <div className="flex items-center gap-4">
            <div className="text-6xl">🎉</div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-foreground mb-1">
                Все задания выполнены!
              </h3>
              <p className="text-muted-foreground">
                Возвращайся завтра за новыми заданиями и наградами!
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DailyQuestsPanel;
