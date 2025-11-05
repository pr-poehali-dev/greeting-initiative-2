import { useState, useCallback, useEffect } from 'react';
import ChessBoard from '@/components/ChessBoard';
import { Chess } from 'chess.js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ChessBot } from '@/data/chessBot';
import { useGameStore } from '@/store/gameStore';
import { toast } from 'sonner';

interface ChessGameProps {
  bot: ChessBot;
  onExit: () => void;
}

const ChessGame = ({ bot, onExit }: ChessGameProps) => {
  const [game, setGame] = useState(new Chess());
  const [gameMessages, setGameMessages] = useState<string[]>([]);
  const { addCoins } = useGameStore();
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'bot' | 'draw' | null>(null);

  useEffect(() => {
    addBotMessage(bot.phrases.greeting[Math.floor(Math.random() * bot.phrases.greeting.length)]);
  }, []);

  const addBotMessage = (message: string) => {
    setGameMessages(prev => [...prev, `${bot.name}: ${message}`]);
  };

  const getRandomPhrase = (phrases: string[]) => {
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  const makeRandomMove = useCallback(() => {
    const possibleMoves = game.moves();
    
    if (possibleMoves.length === 0) return;

    let chosenMove: string;
    
    switch (bot.difficulty) {
      case 'beginner':
        chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        break;
      case 'intermediate':
        const captureMoves = possibleMoves.filter(move => move.includes('x'));
        chosenMove = captureMoves.length > 0 && Math.random() > 0.3
          ? captureMoves[Math.floor(Math.random() * captureMoves.length)]
          : possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        break;
      case 'advanced':
      case 'expert':
      case 'master':
        const checkMoves = possibleMoves.filter(move => move.includes('+'));
        const captures = possibleMoves.filter(move => move.includes('x'));
        
        if (checkMoves.length > 0 && Math.random() > 0.4) {
          chosenMove = checkMoves[Math.floor(Math.random() * checkMoves.length)];
        } else if (captures.length > 0 && Math.random() > 0.2) {
          chosenMove = captures[Math.floor(Math.random() * captures.length)];
        } else {
          chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }
        break;
      default:
        chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }

    const gameCopy = new Chess(game.fen());
    gameCopy.move(chosenMove);
    setGame(gameCopy);

    if (Math.random() > 0.7) {
      setTimeout(() => {
        addBotMessage(getRandomPhrase(bot.phrases.goodMove));
      }, 500);
    }

    checkGameStatus(gameCopy);
  }, [game, bot]);

  const checkGameStatus = (currentGame: Chess) => {
    if (currentGame.isCheckmate()) {
      setGameOver(true);
      const isPlayerWin = currentGame.turn() === 'b';
      setWinner(isPlayerWin ? 'player' : 'bot');
      
      if (isPlayerWin) {
        const reward = Math.floor(bot.rating / 2);
        addCoins(reward);
        toast.success(`Победа! +${reward} монет`);
        setTimeout(() => {
          addBotMessage(getRandomPhrase(bot.phrases.losing));
        }, 500);
      } else {
        setTimeout(() => {
          addBotMessage(getRandomPhrase(bot.phrases.winning));
        }, 500);
      }
    } else if (currentGame.isDraw() || currentGame.isStalemate() || currentGame.isThreefoldRepetition()) {
      setGameOver(true);
      setWinner('draw');
      const drawReward = Math.floor(bot.rating / 4);
      addCoins(drawReward);
      toast('Ничья! +' + drawReward + ' монет');
    }
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (gameOver) return false;

    const gameCopy = new Chess(game.fen());
    
    // Проверяем, что сейчас ход белых (игрок)
    if (gameCopy.turn() !== 'w') {
      return false; // Не даём игроку ходить за чёрных
    }
    
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move === null) return false;

      setGame(gameCopy);

      if (move.captured && Math.random() > 0.6) {
        setTimeout(() => {
          addBotMessage(getRandomPhrase(bot.phrases.badMove));
        }, 300);
      }

      checkGameStatus(gameCopy);

      // Бот ходит только если игра не окончена и сейчас его ход (чёрные)
      if (!gameCopy.isGameOver() && gameCopy.turn() === 'b') {
        setTimeout(() => makeRandomMove(), 500);
      }

      return true;
    } catch {
      return false;
    }
  };

  const handleNewGame = () => {
    setGame(new Chess());
    setGameMessages([]);
    setGameOver(false);
    setWinner(null);
    addBotMessage(bot.phrases.greeting[Math.floor(Math.random() * bot.phrases.greeting.length)]);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button onClick={onExit} variant="ghost">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Выбрать другого бота
          </Button>
          <Button onClick={handleNewGame} variant="outline">
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Новая игра
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card/50 backdrop-blur border-2">
              <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{bot.avatar}</span>
                  <div>
                    <h2 className="text-2xl font-black text-foreground">{bot.name}</h2>
                    <p className="text-muted-foreground">{bot.personality}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-lg">
                  <Icon name="Trophy" size={20} className="text-amber-400" />
                  <span className="text-xl font-black text-amber-400">{bot.rating}</span>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <ChessBoard
                  position={game.fen()}
                  onPieceDrop={onDrop}
                />
              </div>

              {gameOver && (
                <div className="mt-6 text-center">
                  <div className={`text-4xl font-black mb-4 ${
                    winner === 'player' ? 'text-green-500' : 
                    winner === 'bot' ? 'text-red-500' : 'text-yellow-500'
                  }`}>
                    {winner === 'player' ? '🏆 ПОБЕДА!' : 
                     winner === 'bot' ? '💀 ПОРАЖЕНИЕ' : '🤝 НИЧЬЯ'}
                  </div>
                  <Button onClick={handleNewGame} size="lg">
                    <Icon name="RotateCcw" size={24} className="mr-2" />
                    Играть снова
                  </Button>
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/50 backdrop-blur border-2 h-[600px] flex flex-col">
              <h3 className="text-2xl font-black text-foreground mb-4 flex items-center gap-2">
                <Icon name="MessageSquare" size={24} />
                Чат
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {gameMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-muted/50 rounded-lg p-3 text-sm animate-in slide-in-from-bottom-2"
                  >
                    {msg}
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ход:</span>
                  <span className="font-bold">{game.turn() === 'w' ? 'Белые (Вы)' : 'Чёрные (Бот)'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ходов сделано:</span>
                  <span className="font-bold">{game.history().length}</span>
                </div>
                {game.inCheck() && (
                  <div className="text-red-500 font-bold text-center animate-pulse">
                    ШАХ!
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;