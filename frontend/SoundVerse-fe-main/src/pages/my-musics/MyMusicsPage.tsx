import { useAuthStore } from '@/stores/useAuthStore'
import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Album, Music } from 'lucide-react';
import { useMusicStore } from '@/stores/useMusicStore';
import Header from '../admin/components/Header';
import SongsTabContent from '../admin/components/SongsTabContent';
import AlbumsTabContent from '../admin/components/AlbumsTabContent';
import { useAuth } from '@/providers/AuthContext';
import DashboardArtist from './DashboardArtist';

const MyMusicsPage = () => {
    const { loading, isArtist } = useAuth();
    const { isAdmin } = useAuthStore();
    const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

    useEffect(() => {
        fetchAlbums();
        fetchSongs();
        fetchStats();
    }, [fetchAlbums, fetchSongs, fetchStats]);

    if (!isArtist && !loading && !isAdmin) return <div>Unauthorized - you must be an artist</div>

    return (
        <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8'>
            <Header />

            <DashboardArtist />

            <Tabs defaultValue='songs' className='space-y-6'>
                <TabsList className='p-1 bg-zinc-800/50 '>
                    <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700 mx-3'>
                        <Music className='mr-2 size-4 rounded-md ' />
                        Songs
                    </TabsTrigger>
                    <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700 mx-3'>
                        <Album className='mr-2 size-4' />
                        Albums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='songs'>
                    <SongsTabContent />
                </TabsContent>
                <TabsContent value='albums'>
                    <AlbumsTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default MyMusicsPage