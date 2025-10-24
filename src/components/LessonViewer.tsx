import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Lesson } from '@/data/lessons';
import { useGameStore } from '@/store/gameStore';
import { toast } from 'sonner';

interface LessonViewerProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonViewer = ({ lesson, onBack }: LessonViewerProps) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { addCoins } = useGameStore();

  const question = lesson.questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) {
      toast.error('Выбери ответ!');
      return;
    }

    setShowExplanation(true);
    
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
      addCoins(question.reward);
      toast.success(`Правильно! +${question.reward} монет`);
    } else {
      toast.error('Неправильно. Читай объяснение!');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < lesson.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setShowQuestions(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / lesson.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-8xl mb-6">
            {percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '📚'}
          </div>
          <h1 className="text-6xl font-black text-foreground mb-4">
            Урок завершён!
          </h1>
          <p className="text-3xl text-muted-foreground mb-8">
            Результат: {score} из {lesson.questions.length} ({percentage}%)
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} size="lg" variant="outline">
              <Icon name="RotateCcw" size={24} className="mr-2" />
              Пройти снова
            </Button>
            <Button onClick={onBack} size="lg">
              <Icon name="ArrowLeft" size={24} className="mr-2" />
              К урокам
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showQuestions) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Button onClick={handleRestart} variant="ghost">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              К теории
            </Button>
            <div className="flex items-center gap-4">
              <div className="text-muted-foreground">
                Вопрос {currentQuestion + 1} / {lesson.questions.length}
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg">
                <Icon name="Check" size={20} className="text-green-500" />
                <span className="font-bold text-green-500">{score}</span>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur border-2">
            <h2 className="text-3xl font-black text-foreground mb-6">
              {question.question}
            </h2>

            <div className="space-y-3 mb-6">
              {question.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === question.correctAnswer;
                const showResult = showExplanation;
                
                let buttonClass = 'w-full p-4 text-left border-2 rounded-lg transition-all ';
                
                if (showResult) {
                  if (isCorrect) {
                    buttonClass += 'border-green-500 bg-green-500/20 text-green-500';
                  } else if (isSelected && !isCorrect) {
                    buttonClass += 'border-red-500 bg-red-500/20 text-red-500';
                  } else {
                    buttonClass += 'border-border bg-muted/50';
                  }
                } else {
                  buttonClass += isSelected 
                    ? 'border-primary bg-primary/20' 
                    : 'border-border hover:border-primary/50';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showExplanation}
                    className={buttonClass}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1 text-lg">{option}</span>
                      {showResult && isCorrect && (
                        <Icon name="Check" size={24} className="text-green-500" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <Icon name="X" size={24} className="text-red-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <Card className="p-4 bg-blue-500/10 border-blue-500/50 mb-6">
                <div className="flex items-start gap-3">
                  <Icon name="Lightbulb" size={24} className="text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-500 mb-2">Объяснение:</h3>
                    <p className="text-foreground">{question.explanation}</p>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex gap-3">
              {!showExplanation ? (
                <Button onClick={handleCheckAnswer} size="lg" className="w-full">
                  <Icon name="Check" size={24} className="mr-2" />
                  Проверить ответ
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} size="lg" className="w-full">
                  {currentQuestion < lesson.questions.length - 1 ? (
                    <>
                      <Icon name="ArrowRight" size={24} className="mr-2" />
                      Следующий вопрос
                    </>
                  ) : (
                    <>
                      <Icon name="Flag" size={24} className="mr-2" />
                      Завершить урок
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-8">
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Все уроки
        </Button>

        <Card className="p-8 bg-card/50 backdrop-blur border-2 mb-8">
          <h1 className="text-5xl font-black text-foreground mb-4">
            {lesson.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {lesson.description}
          </p>

          <div className="prose prose-lg max-w-none text-foreground">
            <div className="whitespace-pre-line leading-relaxed">
              {lesson.content}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-primary/20 to-primary/10 border-primary/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-foreground mb-2">
                Готов проверить знания?
              </h3>
              <p className="text-muted-foreground">
                {lesson.questions.length} {lesson.questions.length === 1 ? 'вопрос' : 'вопроса'} • 
                До {lesson.questions.reduce((sum, q) => sum + q.reward, 0)} монет
              </p>
            </div>
            <Button onClick={() => setShowQuestions(true)} size="lg">
              <Icon name="Play" size={24} className="mr-2" />
              Начать тест
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LessonViewer;
