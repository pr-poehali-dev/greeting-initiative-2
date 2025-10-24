import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  youtubeId: string;
}

const Music = () => {
  const navigate = useNavigate();
  const [currentSong, setCurrentSong] = useState<number | null>(null);

  const songs: Song[] = [
    {
      id: 1,
      title: "Cadillac",
      artist: "Моргенштерн",
      duration: "2:58",
      cover: "https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=400",
      youtubeId: "RhMYBfF7-hE"
    },
    {
      id: 2,
      title: "Ice",
      artist: "Моргенштерн",
      duration: "2:45",
      cover: "https://images.unsplash.com/photo-1551410224-699683e15636?w=400",
      youtubeId: "8KQEk8u90tE"
    },
    {
      id: 3,
      title: "Aristocrat",
      artist: "Моргенштерн",
      duration: "3:12",
      cover: "https://images.unsplash.com/photo-1549737221-68148895eb30?w=400",
      youtubeId: "1uVdR8RkMD0"
    },
    {
      id: 4,
      title: "Yung Hefner",
      artist: "Моргенштерн",
      duration: "3:08",
      cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400",
      youtubeId: "ND3V8DCBHBU"
    },
    {
      id: 5,
      title: "Пососи",
      artist: "Моргенштерн",
      duration: "2:52",
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400",
      youtubeId: "4B4C01h1lYY"
    },
    {
      id: 6,
      title: "Familia",
      artist: "Моргенштерн",
      duration: "3:24",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      youtubeId: "nN1bT5z4C1E"
    }
  ];

  const handlePlay = (songId: number) => {
    setCurrentSong(songId);
  };

  const currentSongData = songs.find(s => s.id === currentSong);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-6 pb-32">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-8"
        >
          <Icon name="ArrowLeft" size={24} />
          <span className="text-lg font-semibold">Назад</span>
        </button>

        <div className="mb-8">
          <h1 className="text-5xl font-bebas text-amber-400 mb-2">Музыка</h1>
          <p className="text-zinc-400 text-lg">Саундтреки для победителей</p>
        </div>

        <div className="space-y-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className={`bg-zinc-900/50 backdrop-blur border-2 ${
                currentSong === song.id
                  ? 'border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'border-amber-500/30'
              } rounded-lg p-4 hover:border-amber-500 transition-all duration-300`}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                  {currentSong === song.id && (
                    <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                      <Icon name="Volume2" size={24} className="text-amber-400 animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bebas text-white truncate">{song.title}</h3>
                  <p className="text-zinc-400">{song.artist}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-zinc-500 font-mono text-sm">{song.duration}</span>
                  <button
                    onClick={() => handlePlay(song.id)}
                    className="w-12 h-12 bg-amber-500 hover:bg-amber-400 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Icon
                      name="Play"
                      size={20}
                      className="text-black"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentSong && currentSongData && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/98 backdrop-blur border-t-2 border-amber-500/30 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 p-4 border-b border-amber-500/20">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={currentSongData.cover}
                  alt={currentSongData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bebas text-lg truncate">{currentSongData.title}</h4>
                <p className="text-zinc-400 text-sm">{currentSongData.artist}</p>
              </div>
              <button
                onClick={() => setCurrentSong(null)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentSongData.youtubeId}?autoplay=1`}
                title={currentSongData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
