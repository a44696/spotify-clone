import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Check, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";

const SongsQueuingTable = ({ onSelectSong }) => {
  const { queuingSongs, fetchQueuingSongs, isLoading, acceptMusic, refuseMusic } = useMusicStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [actionType, setActionType] = useState(null);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`; // mm:ss
  };

  useEffect(() => {
    fetchQueuingSongs();
  }, [fetchQueuingSongs]);

  const openDialog = (song, type) => {
    setSelectedSong(song);
    setActionType(type);
    setIsDialogOpen(true);
  };

  const confirmAction = () => {
    if (selectedSong) {
      if (actionType === "accept") {
        acceptMusic(selectedSong.id);
      } else if (actionType === "refuse") {
        refuseMusic(selectedSong.id);
      }
      fetchQueuingSongs();
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
          {queuingSongs.map((song) => (
            <TableRow key={song.id} className='hover:bg-zinc-800/50'>
              <TableCell className={undefined} onClick={() => onSelectSong(song)}>
                <img src={song.thumbnail} alt={song.title} className='size-10 rounded object-cover' />
              </TableCell>
              <TableCell className='font-medium' onClick={() => onSelectSong(song)}>{song.title}</TableCell>
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
                    onClick={() => openDialog(song, "accept")}
                  >
                    <Check className='size-4' />
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                    onClick={() => openDialog(song, "refuse")}
                  >
                    <X className='size-4' />
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
          <DialogTitle>
            {actionType === "accept" ? "Confirm Approval" : "Confirm Rejection"}
          </DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to {actionType === "accept" ? "approve" : "reject"} the song "{selectedSong?.title}"?
        </p>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)} variant='secondary'>Cancel</Button>
          <Button onClick={confirmAction} variant={actionType == "accept" ? "default" : "destructive"}>
            {actionType === "accept" ? "Approve" : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  );
};
export default SongsQueuingTable;