import { useAuthStore } from '@/stores/useAuthStore'
import React, { useEffect } from 'react'
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Album, Music } from 'lucide-react';
import SongsTabContent from './components/SongsTabContent';
import AlbumsTabContent from './components/AlbumsTabContent';
import { useMusicStore } from '@/stores/useMusicStore';

const AdminPage = () => {
    const {isAdmin,isLoading} = useAuthStore();
    const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();
    useEffect(() => {
      fetchAlbums();
      fetchSongs();
      fetchStats();
    }, [fetchAlbums, fetchSongs, fetchStats]);
    if(!isAdmin && !isLoading) return <div>Unauthorized - you must be an admin</div>
  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8'>
    <Header />
    
    <DashboardStats/>

    <Tabs defaultValue='songs' className='space-y-6'>
				<TabsList className='p-1 bg-zinc-800/50 '>
					<TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700 mx-3'>
						<Music className='mr-2 size-4 rounded-md '  />
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

export default AdminPage