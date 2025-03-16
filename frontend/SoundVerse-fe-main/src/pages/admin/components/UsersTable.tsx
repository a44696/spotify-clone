import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import React from "react";
import { useEffect } from "react";

const UsersTable = () => {
	const { albums, deleteAlbum, fetchAlbums, myAlbums, fetchMyAlbums } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
		fetchMyAlbums();
	}, [fetchAlbums, fetchMyAlbums]);

	return (
		<Table className={undefined}>
			<TableHeader className={undefined}>
				<TableRow className='hover:bg-zinc-800/50'>
					<TableHead className='w-[50px]'></TableHead>
					<TableHead className={undefined}>Username</TableHead>
					<TableHead className={undefined}>Email</TableHead>
					<TableHead className={undefined}>Gender</TableHead>
					<TableHead className={undefined}>Role</TableHead>
					<TableHead className={undefined}>Status</TableHead>
					<TableHead className={undefined}>Created At</TableHead>
					<TableHead className='text-right'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className={undefined}>
				{albums.map((album) => (
					<TableRow key={album.id} className='hover:bg-zinc-800/50'>
						<TableCell className='font-medium'>{album.title}</TableCell>
						<TableCell className={undefined}>{album.artistId}</TableCell>
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
									onClick={() => deleteAlbum(album.id)}
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
	);
};
export default UsersTable;