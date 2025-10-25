import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useGameStore } from '@/store/gameStore';

const StatsPanel = () => {
  const {
    level,
    experience,
    streak,
    totalLessonsCompleted,
    totalQuestionsAnswered,
    totalCorrectAnswers,
    perfectScores,
    coins
  } = useGameStore();

  const expForNextLevel = level * 100;
  const expProgress = (experience / expForNextLevel) * 100;
  const accuracyPercent = totalQuestionsAnswered > 0 
    ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-4xl font-black text-foreground mb-1">
              Уровень {level}
            </h2>
            <p className="text-muted-foreground">
              {experience} / {expForNextLevel} опыта
            </p>
          </div>
          <div className="text-7xl">🎓</div>
        </div>

        <Progress value={expProgress} className="h-4 mb-2" />
        <p className="text-sm text-muted-foreground text-right">
          До следующего уровня: {expForNextLevel - experience} XP
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-500/5 border-orange-500/30">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Flame" size={24} className="text-orange-500" />
            <h3 className="font-bold text-foreground">Серия</h3>
          </div>
          <div className="text-4xl font-black text-orange-500">{streak}</div>
          <p className="text-sm text-muted-foreground">дней подряд</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/30">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Coins" size={24} className="text-yellow-500" />
            <h3 className="font-bold text-foreground">Монеты</h3>
          </div>
          <div className="text-4xl font-black text-yellow-500">{coins}</div>
          <p className="text-sm text-muted-foreground">в кошельке</p>
        </Card>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur border-2">
        <h3 className="text-2xl font-black text-foreground mb-4 flex items-center gap-2">
          <Icon name="BarChart" size={28} className="text-primary" />
          Статистика обучения
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Icon name="BookOpen" size={20} className="text-blue-500" />
              </div>
              <div>
                <div className="font-bold text-foreground">Уроков пройдено</div>
                <div className="text-sm text-muted-foreground">Всего завершено</div>
              </div>
            </div>
            <div className="text-3xl font-black text-blue-500">
              {totalLessonsCompleted}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Icon name="HelpCircle" size={20} className="text-purple-500" />
              </div>
              <div>
                <div className="font-bold text-foreground">Вопросов решено</div>
                <div className="text-sm text-muted-foreground">Всего ответов</div>
              </div>
            </div>
            <div className="text-3xl font-black text-purple-500">
              {totalQuestionsAnswered}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Icon name="Target" size={20} className="text-green-500" />
              </div>
              <div>
                <div className="font-bold text-foreground">Точность</div>
                <div className="text-sm text-muted-foreground">Правильных ответов</div>
              </div>
            </div>
            <div className="text-3xl font-black text-green-500">
              {accuracyPercent}%
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-amber-500/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Icon name="Award" size={20} className="text-amber-500" />
              </div>
              <div>
                <div className="font-bold text-foreground">Идеальных результатов</div>
                <div className="text-sm text-muted-foreground">100% правильных</div>
              </div>
            </div>
            <div className="text-3xl font-black text-amber-500">
              {perfectScores}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/50">
        <div className="flex items-center gap-4">
          <div className="text-6xl">💪</div>
          <div className="flex-1">
            <h3 className="text-2xl font-black text-foreground mb-1">
              Продолжай в том же духе!
            </h3>
            <p className="text-muted-foreground">
              {streak > 0 ? `Ты занимаешься ${streak} ${streak === 1 ? 'день' : 'дней'} подряд!` : 'Начни учиться уже сегодня!'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatsPanel;
