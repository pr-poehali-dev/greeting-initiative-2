import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { lessons, Lesson } from '@/data/lessons';
import LessonViewer from '@/components/LessonViewer';

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
  topics: string[];
}

const Education = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const subjects: Subject[] = [
    {
      id: 1,
      name: 'Математика',
      icon: '🔢',
      color: 'from-blue-600 to-cyan-600',
      description: 'Алгебра, геометрия, теория вероятностей',
      topics: [
        'Уравнения и неравенства',
        'Функции и графики',
        'Геометрические фигуры',
        'Тригонометрия',
        'Производные и интегралы',
        'Теория вероятностей',
        'Комбинаторика',
        'Логарифмы и степени'
      ]
    },
    {
      id: 2,
      name: 'Русский язык',
      icon: '📖',
      color: 'from-red-600 to-pink-600',
      description: 'Грамматика, орфография, пунктуация',
      topics: [
        'Орфография и правописание',
        'Пунктуация',
        'Части речи',
        'Синтаксис',
        'Морфология',
        'Культура речи',
        'Стилистика',
        'Фразеология'
      ]
    },
    {
      id: 3,
      name: 'История',
      icon: '🏛️',
      color: 'from-amber-600 to-orange-600',
      description: 'История России и мира',
      topics: [
        'Древняя Русь',
        'Средневековье',
        'Российская империя',
        'XX век',
        'Великая Отечественная война',
        'СССР',
        'Современная Россия',
        'Всемирная история'
      ]
    },
    {
      id: 4,
      name: 'Физика',
      icon: '⚡',
      color: 'from-purple-600 to-indigo-600',
      description: 'Механика, электричество, оптика',
      topics: [
        'Механика',
        'Термодинамика',
        'Электричество',
        'Магнетизм',
        'Оптика',
        'Квантовая физика',
        'Ядерная физика',
        'Астрофизика'
      ]
    },
    {
      id: 5,
      name: 'Химия',
      icon: '🧪',
      color: 'from-green-600 to-emerald-600',
      description: 'Неорганическая и органическая химия',
      topics: [
        'Периодическая таблица',
        'Химические реакции',
        'Органическая химия',
        'Неорганическая химия',
        'Окислительно-восстановительные реакции',
        'Растворы и концентрации',
        'Электрохимия',
        'Химическая кинетика'
      ]
    },
    {
      id: 6,
      name: 'Биология',
      icon: '🧬',
      color: 'from-lime-600 to-green-700',
      description: 'Анатомия, генетика, экология',
      topics: [
        'Клетка',
        'Генетика',
        'Эволюция',
        'Анатомия человека',
        'Экология',
        'Ботаника',
        'Зоология',
        'Микробиология'
      ]
    },
    {
      id: 7,
      name: 'География',
      icon: '🌍',
      color: 'from-teal-600 to-cyan-700',
      description: 'Физическая и экономическая география',
      topics: [
        'Карты и координаты',
        'Климат и погода',
        'Рельеф и ландшафты',
        'Океаны и моря',
        'Страны мира',
        'Население',
        'Природные ресурсы',
        'Экономическая география'
      ]
    },
    {
      id: 8,
      name: 'Английский язык',
      icon: '🇬🇧',
      color: 'from-sky-600 to-blue-700',
      description: 'Грамматика, лексика, разговорная речь',
      topics: [
        'Времена глаголов',
        'Артикли',
        'Предлоги',
        'Модальные глаголы',
        'Условные предложения',
        'Фразовые глаголы',
        'Словообразование',
        'Идиомы'
      ]
    },
    {
      id: 9,
      name: 'Информатика',
      icon: '💻',
      color: 'from-slate-600 to-gray-700',
      description: 'Программирование и алгоритмы',
      topics: [
        'Алгоритмы',
        'Программирование на Python',
        'Структуры данных',
        'Базы данных',
        'Сети и интернет',
        'Информационная безопасность',
        'Логические схемы',
        'Системы счисления'
      ]
    },
    {
      id: 10,
      name: 'Обществознание',
      icon: '👥',
      color: 'from-rose-600 to-red-700',
      description: 'Общество, право, экономика',
      topics: [
        'Общество и человек',
        'Социальные отношения',
        'Политика',
        'Право',
        'Экономика',
        'Культура',
        'Духовная жизнь',
        'Социальная сфера'
      ]
    },
    {
      id: 11,
      name: 'Литература',
      icon: '📚',
      color: 'from-violet-600 to-purple-700',
      description: 'Русская и зарубежная литература',
      topics: [
        'Древнерусская литература',
        'Литература XIX века',
        'Литература XX века',
        'Поэзия',
        'Драматургия',
        'Зарубежная литература',
        'Литературные течения',
        'Анализ произведений'
      ]
    },
    {
      id: 12,
      name: 'Астрономия',
      icon: '🔭',
      color: 'from-indigo-600 to-blue-900',
      description: 'Космос, планеты, звёзды',
      topics: [
        'Солнечная система',
        'Планеты',
        'Звёзды и созвездия',
        'Галактики',
        'Космология',
        'Телескопы и наблюдения',
        'Освоение космоса',
        'Астрофизика'
      ]
    }
  ];

  if (selectedLesson) {
    return (
      <LessonViewer 
        lesson={selectedLesson} 
        onBack={() => setSelectedLesson(null)} 
      />
    );
  }

  if (selectedSubject) {
    const subjectLessons = lessons.filter(l => l.subjectId === selectedSubject.id);
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => setSelectedSubject(null)} variant="ghost" className="mb-8">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Все предметы
          </Button>

          <Card className={`bg-gradient-to-br ${selectedSubject.color} p-8 border-2 border-white/20 rounded-3xl mb-8`}>
            <div className="text-center text-white">
              <div className="text-8xl mb-4">{selectedSubject.icon}</div>
              <h1 className="text-6xl font-black mb-3">{selectedSubject.name.toUpperCase()}</h1>
              <p className="text-2xl text-white/80">{selectedSubject.description}</p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectLessons.map((lesson, idx) => (
              <Card
                key={lesson.id}
                className="p-6 bg-card/50 backdrop-blur border-2 hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-black text-primary">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{lesson.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Icon name="HelpCircle" size={16} className="text-amber-500" />
                      <span className="text-sm text-amber-500 font-semibold">
                        {lesson.questions.length} {lesson.questions.length === 1 ? 'вопрос' : 'вопроса'}
                      </span>
                    </div>
                  </div>
                  <Icon name="Play" size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Card>
            ))}
          </div>
          
          {subjectLessons.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <p className="text-xl text-muted-foreground">Уроки скоро появятся!</p>
            </div>
          )}
        </div>
      </div>
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
          <h1 className="text-7xl font-black text-foreground mb-4">УЧЁБА</h1>
          <p className="text-xl text-muted-foreground">Выбери предмет для изучения</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className={`bg-gradient-to-br ${subject.color} p-8 border-2 border-white/20 rounded-3xl hover:scale-105 transition-all cursor-pointer group`}
              onClick={() => setSelectedSubject(subject)}
            >
              <div className="text-center text-white">
                <div className="text-7xl mb-4">{subject.icon}</div>
                <h2 className="text-3xl font-black mb-3">{subject.name}</h2>
                <p className="text-white/80 text-lg mb-4">{subject.description}</p>
                <div className="flex items-center justify-center gap-2 text-white/60">
                  <Icon name="BookOpen" size={20} />
                  <span className="text-sm font-semibold">{subject.topics.length} тем</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;