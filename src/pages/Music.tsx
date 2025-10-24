import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  url: string;
}

const Music = () => {
  const navigate = useNavigate();
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songs: Song[] = [
    {
      id: 1,
      title: "Буханка",
      artist: "UNNV",
      duration: "3:15",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Мой калашников",
      artist: "UNNV",
      duration: "3:42",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Мамбл",
      artist: "UNNV",
      duration: "2:58",
      cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: 4,
      title: "Рэпую в шапке",
      artist: "UNNV",
      duration: "3:28",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
      id: 5,
      title: "На районе",
      artist: "UNNV",
      duration: "3:05",
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
      id: 6,
      title: "Черная волга",
      artist: "UNNV",
      duration: "4:12",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = (songId: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSong === songId && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (currentSong !== songId) {
        const song = songs.find(s => s.id === songId);
        if (song) {
          audio.src = song.url;
          setCurrentSong(songId);
        }
      }
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentSongData = songs.find(s => s.id === currentSong);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-6 pb-32">
      <audio ref={audioRef} />
      
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
      </div>

      {currentSong && currentSongData && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/98 backdrop-blur border-t-2 border-amber-500/30 p-4 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-3">
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
                onClick={() => handlePlayPause(currentSong)}
                className="w-10 h-10 bg-amber-500 hover:bg-amber-400 rounded-full flex items-center justify-center transition-colors"
              >
                <Icon
                  name={isPlaying ? "Pause" : "Play"}
                  size={18}
                  className="text-black"
                />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-zinc-500 text-xs font-mono w-10">{formatTime(currentTime)}</span>
              <div 
                className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <span className="text-zinc-500 text-xs font-mono w-10">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;