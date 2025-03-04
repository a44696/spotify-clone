import React, { useState } from 'react';
import Topbar from '@/components/Topbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Play, Trash } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([...playlists, { id: Date.now(), name: newPlaylistName, songs: [] }]);
      setNewPlaylistName('');
      setShowForm(false);
    }
  };

  const handleAddSong = (playlistId) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: [...playlist.songs, { id: Date.now(), title: `Song ${playlist.songs.length + 1}` }],
        };
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
  };

  const handleRemoveSong = (playlistId, songId) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return { ...playlist, songs: playlist.songs.filter((song) => song.id !== songId) };
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
  };

  const handleRemovePlaylist = (playlistId) => {
    setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
  };

  return (
    <div>
      <Topbar />
      <div className='my-7 '>
        <ScrollArea className="h-[calc(100vh-180px)] overflow-y-auto"
          style={{scrollbarWidth: 'thin', /* Dùng cho Firefox */
            scrollbarColor: '#0f0f0f transparent' /* Màu thanh cuộn */}}
          >
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
                <Button className="mt-2" onClick={() => handleAddSong(playlist.id)}>Add Song</Button>
                
                <div className="mt-4 space-y-2">
                  {playlist.songs.map((song) => (
                    <div key={song.id} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
                      <span>{song.title}</span>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost"><Play /></Button>
                        <Button size="icon" variant="destructive" onClick={() => handleRemoveSong(playlist.id, song.id)}>
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
