import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Pause, Clock } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import React from "react";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const SearchResultsPage = () => {
    const { query } = useParams();
    const [songs, setSongs] = useState([]);
    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/songs/search?query=${query}`);
                const data = await response.json();
                setSongs(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        fetchSongs();
    }, [query]);

    const handlePlaySong = (index) => {
        playAlbum(songs, index);
    };

    return (
        <div>
            <Topbar />
            <ScrollArea className='h-[calc(100vh-180px)] overflow-y-auto' 
  		        style={{scrollbarWidth: 'thin', /* Dùng cho Firefox */
			    scrollbarColor: '#0f0f0f transparent' /* Màu thanh cuộn */}}>
                <h1 className="text-2xl font-bold mb-4 my-5">Search Results for "{query}"</h1>
                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-md">
                    {/* Table Header */}
                    <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 border-b border-white/5">
                        <div>#</div>
                        <div>Title</div>
                        <div>Artist</div>
                        <div>
                            <Clock className="h-4 w-4" />
                        </div>
                    </div>

                    {/* Song List */}
                    <div className="space-y-2 py-4">
                        {songs.map((song, index) => {
                            const isCurrentSong = currentSong?._id === song._id;
                            return (
                                <div key={song._id}
                                    onClick={() => handlePlaySong(index)}
                                    className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md cursor-pointer"
                                >
                                    <div className="flex items-center justify-center">
                                        {isCurrentSong && isPlaying ? (
                                            <Pause className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Play className="h-4 w-4" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src={song.imageUrl} alt={song.title} className="size-10" />
                                        <div>
                                            <div className="font-medium text-white">{song.title}</div>
                                            <div>{song.artist}</div>
                                        </div>
                                    </div>
                                    <div>{song.artist}</div>
                                    <div>{formatDuration(song.duration)}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default SearchResultsPage;
