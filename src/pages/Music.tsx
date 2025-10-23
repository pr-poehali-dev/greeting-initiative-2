import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

const Music = () => {
  const navigate = useNavigate();
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const songs: Song[] = [
    {
      id: 1,
      title: "The Godfather Theme",
      artist: "Nino Rota",
      duration: "3:42",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400"
    },
    {
      id: 2,
      title: "Dark Knight",
      artist: "Hans Zimmer",
      duration: "4:18",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
    },
    {
      id: 3,
      title: "Scarface (Push It to the Limit)",
      artist: "Paul Engemann",
      duration: "3:04",
      cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400"
    },
    {
      id: 4,
      title: "Eye of the Tiger",
      artist: "Survivor",
      duration: "4:04",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400"
    },
    {
      id: 5,
      title: "Immigrant Song",
      artist: "Led Zeppelin",
      duration: "2:26",
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400"
    },
    {
      id: 6,
      title: "Bad to the Bone",
      artist: "George Thorogood",
      duration: "4:51",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
    }
  ];

  const handlePlayPause = (songId: number) => {
    if (currentSong === songId && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentSong(songId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-6">
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
                currentSong === song.id && isPlaying
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
                  {currentSong === song.id && isPlaying && (
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
                    onClick={() => handlePlayPause(song.id)}
                    className="w-12 h-12 bg-amber-500 hover:bg-amber-400 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Icon
                      name={currentSong === song.id && isPlaying ? "Pause" : "Play"}
                      size={20}
                      className="text-black"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentSong && (
          <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur border-t-2 border-amber-500/30 p-4">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <div className="flex-1">
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-amber-500 to-amber-600 ${
                      isPlaying ? 'animate-pulse' : ''
                    }`}
                    style={{ width: '35%' }}
                  />
                </div>
              </div>
              <Icon name="Music" size={24} className="text-amber-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Music;
