import React, { useState, useEffect } from 'react';
import Topbar from '@/components/Topbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Play, Pause, Trash } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useAuth } from "@clerk/clerk-react";
import { usePlayerStore } from '@/stores/usePlayerStore'; // Import store

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [availableSongs, setAvailableSongs] = useState([]);
  const { getToken } = useAuth();
  const { currentSong, isPlaying, setCurrentSong, togglePlay, initializeQueue } = usePlayerStore(); // Use player store
  const [playingSongId, setPlayingSongId] = useState(null); // Store song ID for playing state

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("Không có token");
        const response = await fetch("http://localhost:5000/api/songs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Lỗi lấy danh sách bài hát");
        }
        const data = await response.json();
        setAvailableSongs(data);
      } catch (error) {
        console.error("Lỗi khi tải bài hát:", error);
      }
    };
    fetchSongs();
  }, []);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([...playlists, { id: Date.now(), name: newPlaylistName, songs: [] }]);
      setNewPlaylistName('');
      setShowForm(false);
    }
  };

  const handleAddSong = (playlistId, song) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return { ...playlist, songs: [...playlist.songs, song] };
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
  };

  const handleRemoveSong = (playlistId, songId) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return { ...playlist, songs: playlist.songs.filter((song) => song._id !== songId) };
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
  };

  const handleRemovePlaylist = (playlistId) => {
    setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
  };

  const handlePlaySong = (song) => {
    if (song._id === currentSong?._id) {
      togglePlay(); // Toggle play/pause if it's the same song
    } else {
      setCurrentSong(song); // Set new song and play
      setPlayingSongId(song._id); // Set playing song ID
    }
  };

  return (
    <div>
      <Topbar />
      <div className='my-7'>
        <ScrollArea className="h-[calc(100vh-180px)] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Your Playlists</h1>
          <Button onClick={() => setShowForm(true)}>Create Playlist</Button>
          
          {showForm && (
            <div className="mt-4 flex gap-2">
              <Input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Enter playlist name"
              />
              <Button onClick={handleCreatePlaylist}>Save</Button>
            </div>
          )}

          <div className="mt-6 space-y-4">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{playlist.name}</h2>
                  <Button size="icon" variant="destructive" onClick={() => handleRemovePlaylist(playlist.id)}>
                    <Trash />
                  </Button>
                </div>

                {/* Add songs to playlist */}
                <div className="mt-2">
                  <h3 className="text-lg">Add a song:</h3>
                  {availableSongs.length > 0 ? (
                    availableSongs.map((song) => (
                      <Button key={song._id} onClick={() => handleAddSong(playlist.id, song)}>
                        {song.title} - {song.artist}
                      </Button>
                    ))
                  ) : (
                    <p>No songs available</p>
                  )}
                </div>

                {/* Song list with Play button */}
                <div className="mt-4 space-y-2">
                  {playlist.songs.map((song) => (
                    <div key={song._id} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
                      <span>{song.title} - {song.artist}</span>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handlePlaySong(song)}>
                          {playingSongId === song._id && isPlaying ? (
                            <Pause />
                          ) : (
                            <Play />
                          )}
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => handleRemoveSong(playlist.id, song._id)}>
                          <Trash />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PlaylistPage;
