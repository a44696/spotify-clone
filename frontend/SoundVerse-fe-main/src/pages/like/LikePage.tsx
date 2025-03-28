import React, { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Play, Pause, Clock } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const LikePage = () => {
  const { fetchLikedSongs, likedSongs = [] } = useMusicStore();
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();

  useEffect(() => {
    fetchLikedSongs();
  }, []);

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="p-6 text-white bg-gradient-to-b from-neutral-900 to-black min-h-screen">
      <ScrollArea className="h-[calc(100vh-250px)] overflow-y-auto">
        <h1 className="text-5xl font-bold mb-6">Liked Songs</h1>

        <div className="bg-black/20 backdrop-blur-sm">
          <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
            <div>#</div>
            <div>Title</div>
            <div>Artist</div>
            <div><Clock className="h-4 w-4" /></div>
          </div>
          <div className="px-6">
            <div className="space-y-2 py-4">
              {likedSongs.length > 0 ? (
                likedSongs.map((song, index) => {
                  const isCurrentSong = currentSong?.id === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => handlePlayPause(song)}
                      className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                    >
                      <div className="flex items-center justify-center">
                        {isCurrentSong && isPlaying ? (
                          <Pause className="h-4 w-4 text-green-500" />
                        ) : (
                          <Play className="h-4 w-4 hidden group-hover:block" />
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <img src={song.thumbnail || "/default_album.jpg"} alt={song.title} className='size-10 rounded object-cover' />
                        <div>
                          <div className="font-medium text-white">{song.title}</div>
                        </div>
                      </div>
                      <div className="flex items-center">{song.artist}</div>
                      <div className="flex items-center">{formatDuration(song.length)}</div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-400">No liked songs found</p>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LikePage;
