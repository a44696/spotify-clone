import React, { useState, useEffect } from 'react';
import Topbar from '@/components/Topbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Trash, Plus, Play, Pause } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useAuth } from '@clerk/clerk-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [currentSong, setCurrentSong] = useState(null); // Song đang phát
  const [dialogOpen, setDialogOpen] = useState(false);
  const { getToken } = useAuth();

  // Fetch playlists when component mounts
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error('Không có token');

        const response = await fetch('http://localhost:5000/api/playlists', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Lỗi lấy danh sách playlist');
        }

        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Lỗi khi tải playlist:', error);
      }
    };

    fetchPlaylists();
  }, [getToken]);

  // Create a new playlist
  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim()) {
      try {
        const token = await getToken();
        const response = await fetch('http://localhost:5000/api/playlists', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newPlaylistName }),
        });

        if (!response.ok) {
          throw new Error('Lỗi khi tạo playlist');
        }

        const newPlaylist = await response.json();
        setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
        setNewPlaylistName('');
        setDialogOpen(false);
      } catch (error) {
        console.error('Lỗi khi tạo playlist:', error);
      }
    }
  };

  // Delete a playlist
  const handleDeletePlaylist = async (playlistId) => {
    if (!playlistId) {
      console.error('Playlist ID không hợp lệ:', playlistId);
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:5000/api/playlists/${playlistId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Lỗi khi xóa playlist');
      }

      setPlaylists((prevPlaylists) => prevPlaylists.filter((playlist) => playlist.id !== playlistId));
    } catch (error) {
      console.error('Lỗi khi xóa playlist:', error);
    }
  };

  // Handle Play/Pause
  const handlePlayPause = (song) => {
    if (currentSong && currentSong.id === song.id) {
      setCurrentSong(null); // Stop the current song
    } else {
      setCurrentSong(song); // Play the selected song
    }
  };

  // Remove song from playlist
  const handleRemoveSong = async (playlistId, songId) => {
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:5000/api/playlists/${playlistId}/remove/${songId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Lỗi khi xóa bài hát khỏi playlist');
      }

      // Update the playlists state to remove the song
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) => {
          if (playlist.id === playlistId) {
            playlist.songs = playlist.songs.filter((song) => song.id !== songId);
          }
          return playlist;
        })
      );
    } catch (error) {
      console.error('Lỗi khi xóa bài hát:', error);
    }
  };

  return (
    <div>
      <Topbar />
      <div className="my-7">
        <ScrollArea className="h-[calc(100vh-180px)] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Your Playlists</h1>

          {/* Dialog to create a new playlist */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
                <Plus className="mr-2 h-4 w-4" /> Create Playlist
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-900 border-zinc-700">
              <DialogHeader>
                <DialogTitle>Create New Playlist</DialogTitle>
                <DialogDescription>Enter a name for your new playlist</DialogDescription>
              </DialogHeader>

              <Input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Enter playlist name"
                className="bg-zinc-800 border-zinc-700"
              />

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePlaylist}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="mt-6 space-y-4">
            {playlists.length === 0 ? (
              <p>No playlists found</p>
            ) : (
              playlists.map((playlist) => (
                <div key={playlist.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{playlist.name}</h2>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDeletePlaylist(playlist.id)} // Ensure valid ID is passed here
                    >
                      <Trash />
                    </Button>
                  </div>

                  {/* Hiển thị bài hát trong playlist */}
                  <div className="mt-4 space-y-2">
                    {playlist.songs.map((song) => (
                      <div key={song.id} className="flex justify-between items-center">
                        <div className="text-sm">{song.title} - {song.artist}</div>
                        <div className="flex gap-2 items-center">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handlePlayPause(song)}
                          >
                            {currentSong && currentSong.id === song.id ? (
                              <Pause className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5" />
                            )}
                          </Button>

                          {/* Nút xóa bài hát khỏi playlist */}
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleRemoveSong(playlist.id, song.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PlaylistPage;
