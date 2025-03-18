import React, { useState } from 'react';
import Topbar from '@/components/Topbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Trash, Plus, Calendar } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Create new playlist (only update UI, not API)
  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;

    // Tạo playlist mới
    const newPlaylist = {
      id: Date.now(), // Tạo ID tạm thời
      name: newPlaylistName,
      description: newDescription || "No description",
      createdAt: new Date().toISOString(), // Lấy thời gian hiện tại
      thumbnail: "/default-playlist.png", // Ảnh mặc định
    };

    // Cập nhật danh sách playlist
    setPlaylists([...playlists, newPlaylist]);

    // Reset input và đóng modal
    setNewPlaylistName('');
    setNewDescription('');
    setDialogOpen(false);
  };

  // Delete playlist
  const deletePlaylist = (id) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== id));
  };

  return (
    <div>
      
      <div className="my-7">
        <ScrollArea className="h-[calc(100vh-180px)] overflow-y-auto">
          <TableRow className=" text-white flex justify-between items-center">
            <TableHead className="text-left text-xl font-bold py-3">
              Your Playlists
            </TableHead>
            <TableHead className="text-right">
                  {/* Dialog to create a new playlist */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-black mb-4">
                    <Plus className="mr-2 h-4 w-4" /> Create Playlist
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-zinc-900 border-zinc-700">
                  <DialogHeader>
                    <DialogTitle>Create New Playlist</DialogTitle>
                    <DialogDescription>Enter a name and description for your new playlist</DialogDescription>
                  </DialogHeader>

                  <Input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Enter playlist name"
                    className="bg-zinc-800 border-zinc-700"
                  />

                  <Input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Enter description"
                    className="bg-zinc-800 border-zinc-700 mt-2"
                  />

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreatePlaylist}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableHead>
          </TableRow>
          

          

          {/* Table to display playlists */}
          <Table className="mt-4">
            <TableHeader>
              <TableRow className="hover:bg-zinc-800/50">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {playlists.map((playlist) => (
                <TableRow key={playlist.id} className="hover:bg-zinc-800/50">
                  <TableCell>
                    <img src={playlist.thumbnail} alt={playlist.name} className="size-10 rounded object-cover" />
                  </TableCell>
                  <TableCell className="font-medium">{playlist.name}</TableCell>
                  <TableCell>{playlist.description}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-zinc-400">
                      <Calendar className="h-4 w-4" />
                      {playlist.createdAt.split("T")[0]}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => deletePlaylist(playlist.id)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PlaylistPage;
