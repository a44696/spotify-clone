import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash } from "lucide-react";
import React from "react";
import { useEffect } from "react";

const PlaylistsTable = () => {
    const { playlists, fetchPlaylists } = useMusicStore();

    useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

    return (
        <Table className={undefined}>
            <Table className="mt-4">
                <TableHeader className={undefined}>
                    <TableRow className="hover:bg-zinc-800/50">
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead className={undefined}>ID</TableHead>
                        <TableHead className={undefined}>Name</TableHead>
                        <TableHead className={undefined}>Description</TableHead>
                        <TableHead className={undefined}>songs</TableHead>
                        <TableHead className={undefined}>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className={undefined}>
                    {playlists.map((playlist) => (
                        <TableRow key={playlist.id} className="hover:bg-zinc-800/50">
                            <TableCell className={undefined}>
                                <img src={playlist.thumbnail} alt={playlist.name} className="size-10 rounded object-cover" />
                            </TableCell>
                            <TableCell className="font-medium">{playlist.name}</TableCell>
                            <TableCell className={undefined}>{playlist.description}</TableCell>
                            <TableCell className={undefined}>
                                <span className='inline-flex items-center gap-1 text-zinc-400'>
                                    <Music className='h-4 w-4' />
                                    {playlist.songs.length} songs
                                </span>
                            </TableCell>
                            <TableCell className={undefined}>
                                <span className="inline-flex items-center gap-1 text-zinc-400">
                                    <Calendar className="h-4 w-4" />
                                    {playlist.createdAt}
                                </span>
                            </TableCell>

                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                // onClick={() => deletePlaylist(playlist.id)}
                                >
                                    <Trash className="size-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Table>
    );
};
export default PlaylistsTable;