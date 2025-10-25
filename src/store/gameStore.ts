import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChessPlayer {
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

export interface LessonProgress {
  lessonId: number;
  completed: boolean;
  score: number;
  totalQuestions: number;
  completedAt?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  progress: number;
  target: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  reward: number;
  completed: boolean;
  type: 'lessons' | 'questions' | 'streak' | 'perfect';
}

interface GameStore {
  coins: number;
  playerCards: ChessPlayer[];
  level: number;
  experience: number;
  streak: number;
  lastStudyDate: string;
  lessonProgress: Record<number, LessonProgress>;
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  totalLessonsCompleted: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  perfectScores: number;
  
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addCard: (card: ChessPlayer) => void;
  removeCard: (cardId: number) => void;
  
  addExperience: (amount: number) => void;
  completLesson: (lessonId: number, score: number, totalQuestions: number) => void;
  updateStreak: () => void;
  unlockAchievement: (achievementId: string) => void;
  completeDailyQuest: (questId: string) => void;
  generateDailyQuests: () => void;
  updateQuestProgress: (type: string, amount?: number) => void;
}

const initialAchievements: Achievement[] = [
  { id: 'first_lesson', title: 'Первые шаги', description: 'Завершите первый урок', icon: '🎓', unlocked: false, progress: 0, target: 1 },
  { id: 'lessons_10', title: 'Знаток', description: 'Завершите 10 уроков', icon: '📚', unlocked: false, progress: 0, target: 10 },
  { id: 'lessons_50', title: 'Эрудит', description: 'Завершите 50 уроков', icon: '🧠', unlocked: false, progress: 0, target: 50 },
  { id: 'perfect_5', title: 'Перфекционист', description: 'Получите 5 идеальных результатов', icon: '💯', unlocked: false, progress: 0, target: 5 },
  { id: 'streak_7', title: 'Неделя знаний', description: 'Учитесь 7 дней подряд', icon: '🔥', unlocked: false, progress: 0, target: 7 },
  { id: 'streak_30', title: 'Месяц силы', description: 'Учитесь 30 дней подряд', icon: '⚡', unlocked: false, progress: 0, target: 30 },
  { id: 'questions_100', title: 'Сотня вопросов', description: 'Ответьте на 100 вопросов', icon: '❓', unlocked: false, progress: 0, target: 100 },
  { id: 'questions_500', title: 'Гуру', description: 'Ответьте на 500 вопросов', icon: '🎯', unlocked: false, progress: 0, target: 500 },
  { id: 'rich', title: 'Богач', description: 'Накопите 10000 монет', icon: '💰', unlocked: false, progress: 0, target: 10000 },
  { id: 'level_10', title: 'Уровень 10', description: 'Достигните 10 уровня', icon: '⭐', unlocked: false, progress: 0, target: 10 },
];

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      coins: 1000,
      playerCards: [],
      level: 1,
      experience: 0,
      streak: 0,
      lastStudyDate: '',
      lessonProgress: {},
      achievements: initialAchievements,
      dailyQuests: [],
      totalLessonsCompleted: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      perfectScores: 0,
      
      addCoins: (amount: number) => {
        set((state) => ({ coins: state.coins + amount }));
        const state = get();
        if (state.coins >= 10000 && !state.achievements.find(a => a.id === 'rich')?.unlocked) {
          get().unlockAchievement('rich');
        }
      },
      
      spendCoins: (amount: number) => {
        const currentCoins = get().coins;
        if (currentCoins >= amount) {
          set({ coins: currentCoins - amount });
          return true;
        }
        return false;
      },
      
      addCard: (card: ChessPlayer) => {
        set((state) => ({
          playerCards: [...state.playerCards, { ...card, id: Date.now() }]
        }));
      },
      
      removeCard: (cardId: number) => {
        set((state) => ({
          playerCards: state.playerCards.filter(card => card.id !== cardId)
        }));
      },
      
      addExperience: (amount: number) => {
        set((state) => {
          const newExp = state.experience + amount;
          const expForNextLevel = state.level * 100;
          
          if (newExp >= expForNextLevel) {
            const newLevel = state.level + 1;
            const leftoverExp = newExp - expForNextLevel;
            
            if (newLevel === 10) {
              get().unlockAchievement('level_10');
            }
            
            return {
              experience: leftoverExp,
              level: newLevel,
              coins: state.coins + (newLevel * 50)
            };
          }
          
          return { experience: newExp };
        });
      },
      
      completLesson: (lessonId: number, score: number, totalQuestions: number) => {
        const state = get();
        const isFirstTime = !state.lessonProgress[lessonId]?.completed;
        const isPerfect = score === totalQuestions;
        
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: {
              lessonId,
              completed: true,
              score,
              totalQuestions,
              completedAt: Date.now()
            }
          },
          totalLessonsCompleted: isFirstTime ? state.totalLessonsCompleted + 1 : state.totalLessonsCompleted,
          totalQuestionsAnswered: state.totalQuestionsAnswered + totalQuestions,
          totalCorrectAnswers: state.totalCorrectAnswers + score,
          perfectScores: isPerfect && isFirstTime ? state.perfectScores + 1 : state.perfectScores
        }));
        
        get().addExperience(score * 10);
        get().updateStreak();
        get().updateQuestProgress('lessons', 1);
        get().updateQuestProgress('questions', totalQuestions);
        
        if (isPerfect) {
          get().updateQuestProgress('perfect', 1);
        }
        
        const newState = get();
        if (newState.totalLessonsCompleted === 1) get().unlockAchievement('first_lesson');
        if (newState.totalLessonsCompleted === 10) get().unlockAchievement('lessons_10');
        if (newState.totalLessonsCompleted === 50) get().unlockAchievement('lessons_50');
        if (newState.perfectScores === 5) get().unlockAchievement('perfect_5');
        if (newState.totalQuestionsAnswered >= 100) get().unlockAchievement('questions_100');
        if (newState.totalQuestionsAnswered >= 500) get().unlockAchievement('questions_500');
      },
      
      updateStreak: () => {
        const today = new Date().toDateString();
        const state = get();
        
        if (state.lastStudyDate === today) {
          return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (state.lastStudyDate === yesterdayStr || state.lastStudyDate === '') {
          const newStreak = state.streak + 1;
          set({ streak: newStreak, lastStudyDate: today });
          
          get().updateQuestProgress('streak');
          
          if (newStreak === 7) get().unlockAchievement('streak_7');
          if (newStreak === 30) get().unlockAchievement('streak_30');
        } else {
          set({ streak: 1, lastStudyDate: today });
        }
      },
      
      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          achievements: state.achievements.map(a => 
            a.id === achievementId && !a.unlocked
              ? { ...a, unlocked: true, unlockedAt: Date.now() }
              : a
          )
        }));
      },
      
      completeDailyQuest: (questId: string) => {
        set((state) => ({
          dailyQuests: state.dailyQuests.map(q =>
            q.id === questId ? { ...q, completed: true } : q
          )
        }));
      },
      
      generateDailyQuests: () => {
        const today = new Date().toDateString();
        const state = get();
        
        if (state.dailyQuests.length > 0 && state.dailyQuests[0].id.includes(today)) {
          return;
        }
        
        const quests: DailyQuest[] = [
          {
            id: `${today}-lessons`,
            title: 'Пройди 3 урока',
            description: 'Завершите 3 урока сегодня',
            icon: '📖',
            progress: 0,
            target: 3,
            reward: 100,
            completed: false,
            type: 'lessons'
          },
          {
            id: `${today}-questions`,
            title: 'Ответь на 10 вопросов',
            description: 'Ответьте правильно на 10 вопросов',
            icon: '❓',
            progress: 0,
            target: 10,
            reward: 150,
            completed: false,
            type: 'questions'
          },
          {
            id: `${today}-perfect`,
            title: 'Идеальный результат',
            description: 'Получите 100% в любом уроке',
            icon: '💯',
            progress: 0,
            target: 1,
            reward: 200,
            completed: false,
            type: 'perfect'
          }
        ];
        
        set({ dailyQuests: quests });
      },
      
      updateQuestProgress: (type: string, amount: number = 1) => {
        const state = get();
        
        set({
          dailyQuests: state.dailyQuests.map(q => {
            if (q.type === type && !q.completed) {
              const newProgress = q.progress + amount;
              
              if (newProgress >= q.target) {
                get().addCoins(q.reward);
                return { ...q, progress: q.target, completed: true };
              }
              
              return { ...q, progress: newProgress };
            }
            return q;
          })
        });
      },
    }),
    {
      name: 'game-storage',
    }
  )
);