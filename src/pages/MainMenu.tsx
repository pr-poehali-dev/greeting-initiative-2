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
    },
    {
      title: 'Мессенджер',
      description: 'Переписка с Магнусом Карлсеном',
      icon: 'MessageSquare',
      color: 'from-slate-600 to-gray-600',
      hoverColor: 'hover:from-slate-700 hover:to-gray-700',
      route: '/chat'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black text-foreground mb-3">
            {userProfile?.name ? `ПРИВЕТ, ${userProfile.name.toUpperCase()}!` : 'ГЛАВНОЕ МЕНЮ'}
          </h1>
          <p className="text-xl text-muted-foreground font-medium tracking-wider">ВЫБЕРИ, ЧТО ХОЧЕШЬ ДЕЛАТЬ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 rounded-2xl p-8 transition-all cursor-pointer group hover:bg-card/70"
              onClick={() => navigate(item.route)}
            >
              <div className="flex items-start gap-6">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon name={item.icon as any} size={40} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    {item.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={32} className="text-muted-foreground group-hover:text-primary transition-colors" />
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
            className="text-muted-foreground hover:text-foreground"
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