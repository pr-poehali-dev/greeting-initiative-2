import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RegisterFormProps {
  onRegister: (name: string, age: number) => void;
}

export default function RegisterForm({ onRegister }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Введи своё имя');
      return;
    }

    const ageNum = parseInt(age);
    if (!age || ageNum < 5 || ageNum > 120) {
      setError('Укажи корректный возраст (от 5 до 120 лет)');
      return;
    }

    onRegister(name.trim(), ageNum);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center px-4">
      <Card className="bg-gradient-to-br from-purple-900/40 via-blue-800/30 to-purple-900/40 backdrop-blur-sm p-8 border-2 border-purple-700/60 rounded-3xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
            <Icon name="User" size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            РЕГИСТРАЦИЯ
          </h1>
          <p className="text-lg text-gray-400">Расскажи немного о себе</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-bold mb-2 text-lg">
              Твоё имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введи своё имя"
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 text-lg"
              maxLength={30}
            />
          </div>

          <div>
            <label className="block text-white font-bold mb-2 text-lg">
              Сколько тебе лет?
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Твой возраст"
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 text-lg"
              min="5"
              max="120"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-3 flex items-center gap-2">
              <Icon name="AlertCircle" size={20} className="text-red-400" />
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-black text-xl py-6"
          >
            <Icon name="Play" size={24} className="mr-2" />
            Начать играть
          </Button>
        </form>
      </Card>
    </div>
  );
}
