import Topbar from '@/components/Topbar'
import React, { use } from 'react'
import { useEffect } from 'react'
import { useMusicStore } from '@/stores/useMusicStore'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import FeaturedSection from './components/FeaturedSection'
import SectionGrid from './components/SectionGrid'
import { usePlayerStore } from '@/stores/usePlayerStore'
import SectionGridArtists from './components/SectionGridArtists'
import SectionGridAlbums from './components/SectionGridAlbums'

const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();

	const { initializeQueue } = usePlayerStore();

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
	// console.log([isLoading, madeForYouSongs, featuredSongs, trendingSongs]);

	useEffect(() => {
		if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, madeForYouSongs, featuredSongs, trendingSongs]);
	return (

		<div className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
			
			<ScrollArea className='h-[calc(100vh-180px)] overflow-y-auto'
				style={{
					scrollbarWidth: 'thin', /* Dùng cho Firefox */
					scrollbarColor: '#0f0f0f transparent' /* Màu thanh cuộn */
				}}>
				<div className='p-4 sm:p-6'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>Have a nice day</h1>
					<FeaturedSection />

					<div className='space-y-8'>
						<SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
						<SectionGridArtists title='Popular Artists'  isLoading={isLoading} />
						<SectionGridAlbums title='Albums'  isLoading={isLoading} />
					</div>
				</div>
			</ScrollArea>
		</div>
	)
}

export default HomePage