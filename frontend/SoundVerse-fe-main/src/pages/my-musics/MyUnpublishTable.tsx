import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Globe } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";

const MyUnpublishTable = () => {
  const { myUnpublish, fetchMyUnpublish, isLoading, publishMusic } = useMusicStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`; // mm:ss
  };

  useEffect(() => {
    fetchMyUnpublish();
  }, [fetchMyUnpublish]);

  const openDeleteDialog = (song) => {
    setSelectedSong(song);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedSong) {
      publishMusic(selectedSong.id);
      fetchMyUnpublish();
    }
    setIsDialogOpen(false);
  };

  // if (isLoading) {
  //   return (
  //     <div className='flex items-center justify-center py-8'>
  //       <div className='text-zinc-400'>Loading queuing songs...</div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Table className={undefined}>
        <TableHeader className={undefined}>
          <TableRow className='hover:bg-zinc-800/50'>
            <TableHead className='w-[50px]'></TableHead>
            <TableHead className={undefined}>Title</TableHead>
            <TableHead className={undefined}>Artist</TableHead>
            <TableHead className={undefined}>Genre</TableHead>
            <TableHead className={undefined}>Duration</TableHead>
            <TableHead className={undefined}>Release Date</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className={undefined}>
          {myUnpublish.map((song) => (
            <TableRow key={song.id} className='hover:bg-zinc-800/50'>
              <TableCell className={undefined}>
                <img src={song.thumbnail} alt={song.title} className='size-10 rounded object-cover' />
              </TableCell>
              <TableCell className='font-medium'>{song.title}</TableCell>
              <TableCell className={undefined}>{song.artist}</TableCell>
              <TableCell className={undefined}>{song.genre}</TableCell>
              <TableCell className={undefined}>{formatTime(song.length)}</TableCell>
              <TableCell className={undefined}>
                <span className='inline-flex items-center gap-1 text-zinc-400'>
                  <Calendar className='h-4 w-4' />
                  {song.createdAt.split("T")[0]}
                </span>
              </TableCell>

              <TableCell className='text-right'>
                <div className='flex gap-2 justify-end'>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className='text-green-400 hover:text-green-300 hover:bg-green-400/10'
                    onClick={() => openDeleteDialog(song)}
                  >
                    <Globe className='size-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to publish the song "{selectedSong?.title}"?
        </p>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)} variant='secondary'>Cancel</Button>
          <Button onClick={confirmDelete} variant='default'>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  );
};
export default MyUnpublishTable;