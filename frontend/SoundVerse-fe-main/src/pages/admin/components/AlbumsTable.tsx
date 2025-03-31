import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AlbumsTable = () => {
	const { albums, deleteAlbum, fetchAlbums } = useMusicStore();
	let albumsToDisplay = albums ?? [];
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [albumToDelete, setAlbumToDelete] = useState(null);

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	const handleDeleteClick = (album) => {
		setAlbumToDelete(album);
		setIsDialogOpen(true);
	};
	const confirmDelete = () => {
		if (albumToDelete) {
			deleteAlbum(albumToDelete.id);
		}
		setIsDialogOpen(false);
	};

	return (
		<>
			<Table className={undefined}>
				<TableHeader className={undefined}>
					<TableRow className='hover:bg-zinc-800/50'>
						<TableHead className='w-[50px]'></TableHead>
						<TableHead className={undefined}>Title</TableHead>
						<TableHead className={undefined}>Artist</TableHead>
						<TableHead className={undefined}>Songs</TableHead>
						<TableHead className={undefined}>Created At</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className={undefined}>
					{albumsToDisplay.map((album) => (
						<TableRow key={album.id} className='hover:bg-zinc-800/50'>
							<TableCell className={undefined}>
								<img src={album.thumbnail} alt={album.title} className='w-10 h-10 rounded object-cover' />
							</TableCell>
							<TableCell className='font-medium'>
								<Link to={`/albums/${album.id}`}>
									{album.title}
								</Link>
							</TableCell>
							<TableCell className={undefined}>{album.artist}</TableCell>
							<TableCell className={undefined}>
								<span className='inline-flex items-center gap-1 text-zinc-400'>
									<Music className='h-4 w-4' />
									{album.songs.length} songs
								</span>
							</TableCell>
							<TableCell className={undefined}>
								<span className='inline-flex items-center gap-1 text-zinc-400'>
									<Calendar className='h-4 w-4' />
									{album.createdAt}
								</span>
							</TableCell>
							<TableCell className='text-right'>
								<div className='flex gap-2 justify-end'>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => handleDeleteClick(album)}
										className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
									>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div>	
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirm Deletion</DialogTitle>
						</DialogHeader>
						<p>Are you sure you want to delete the album "{albumToDelete?.title}"?</p>
						<DialogFooter>
							<Button onClick={() => setIsDialogOpen(false)} variant='secondary'>Cancel</Button>
							<Button onClick={confirmDelete} variant='destructive'>Delete</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};
export default AlbumsTable;