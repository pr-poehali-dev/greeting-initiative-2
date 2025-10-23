import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useEffect, useState } from 'react';

interface UserProfile {
  name: string;
  age: number;
  registered: boolean;
}

const MainMenu = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const menuItems = [
    {
      title: 'Играть',
      description: 'Открывать карточки и коллекционировать',
      icon: 'Play',
      color: 'from-green-600 to-emerald-600',
      hoverColor: 'hover:from-green-700 hover:to-emerald-700',
      route: '/cards'
    },
    {
      title: 'Профиль',
      description: 'Статистика и достижения',
      icon: 'User',
      color: 'from-blue-600 to-cyan-600',
      hoverColor: 'hover:from-blue-700 hover:to-cyan-700',
      route: '/profile'
    },
    {
      title: 'Коллекция',
      description: 'Все твои карточки',
      icon: 'Library',
      color: 'from-purple-600 to-pink-600',
      hoverColor: 'hover:from-purple-700 hover:to-pink-700',
      route: '/cards'
    },
    {
      title: 'Магазин',
      description: 'Покупай новые паки',
      icon: 'ShoppingBag',
      color: 'from-amber-600 to-orange-600',
      hoverColor: 'hover:from-amber-700 hover:to-orange-700',
      route: '/cards'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-3 tracking-tight">
            {userProfile?.name ? `Привет, ${userProfile.name}!` : 'ГЛАВНОЕ МЕНЮ'}
          </h1>
          <p className="text-2xl text-gray-400 font-medium">Выбери, что хочешь делать</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 hover:border-white/40 transition-all cursor-pointer group"
              onClick={() => navigate(item.route)}
            >
              <div className="flex items-start gap-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon name={item.icon as any} size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-black text-white mb-2 group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={32} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={() => {
              localStorage.removeItem('userProfile');
              window.location.reload();
            }}
            variant="ghost"
            className="text-white/50 hover:text-white/70"
          >
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти из профиля
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
