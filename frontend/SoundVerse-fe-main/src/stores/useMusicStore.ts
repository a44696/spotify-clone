import { axiosInstance } from "@/lib/axios";
import { Album, Genre, MyStats, Playlist, Song, Stats, Artist } from "@/types";
import { toast } from "react-hot-toast";
import { create } from "zustand";


interface MusicStore {
	songs: Song[];
	albums: Album[];
	mySongs: Song[];
	myAlbums: Album[];
	genres: Genre[];
	playlists: Playlist[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	currentPlaylist: Playlist | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;
	myStats: MyStats;
	artists: Artist[];
	popularArtists: Artist[];
	popularAlbums: Album[];
	artistDetails: Artist | null;

	fetchGenres: () => Promise<void>;
	fetchPlaylists: () => Promise<void>;
	fetchPlaylistById: (id: number) => Promise<void>;
	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: number) => Promise<void>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	deleteSong: (id: number) => Promise<void>;
	deleteAlbum: (id: number) => Promise<void>;
	deletePlaylist: (id: number) => Promise<void>;
	fetchMyStats: () => Promise<void>;
	fetchMyAlbums: () => Promise<void>;
	fetchMySongs: () => Promise<void>;
	fetchPopularAlbums: () => Promise<void>;
	fetchPopularArtists: () => Promise<void>;
	addMusicToPlaylist: (playlist_id: number, music_id: number) => Promise<void>;
	deleteMusicFromPlaylist: (playlist_id: number, music_id: number) => Promise<void>;
	fetchArtistDetails: (id: number) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
	albums: [],
	songs: [],
	playlists: [],
	genres: [],
	isLoading: false,
	error: null,
	currentAlbum: null,
	currentPlaylist: null,
	madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],
	popularArtists: [],
	popularAlbums: [],
	stats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalUsers: 0,
		totalArtists: 0,
		totalSongsMonthly: 0,
		totalUsersMonthly: 0
	},
	artistDetails: null,
	mySongs: [],
	myAlbums: [],
	myStats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalFollowers: 0
	},
	artists: [],

	deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/album/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album.id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a.id === id)?.title ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete album: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	deletePlaylist: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/playlist/${id}`);
			set((state) => ({
				playlists: state.playlists.filter((playlist) => playlist.id !== id)
			}));
			toast.success("Playlist deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete playlist: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	addMusicToPlaylist: async (playlist_id, music_id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.post(`/playlist/${playlist_id}/songs/${music_id}`);
			set((state) => ({
				playlists: state.playlists.map((playlist) => {
					if (playlist.id === playlist_id) {
						return {
							...playlist,
							songs: [...playlist.songs, state.songs.find((song) => song.id === music_id)]
						};
					}
					return playlist;
				})
			}));
			toast.success("Playlist deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete playlist: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	deleteMusicFromPlaylist: async (playlist_id, music_id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/playlist/${playlist_id}/songs/${music_id}`);
			set((state) => ({
				playlists: state.playlists.map((playlist) => {
					if (playlist.id === playlist_id) {
						return {
							...playlist,
							songs: playlist.songs.filter((song) => song.id !== music_id)
						};
					}
					return playlist;
				})
			}));
			toast.success("Playlist deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete playlist: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/music/${id}`);

			set((state) => ({
				songs: state.songs.filter((song) => song.id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}
	},
	fetchSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/musics");
			set({ songs: response.data.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchStats: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/stats");
			set({ stats: response.data.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbums: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/albums");
			set({ albums: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchPlaylists: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/playlist");
			set({ playlists: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchArtistDetails: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/artist/${id}`);
			set({ artistDetails: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchPlaylistById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/playlist/${id}`);
			set({ currentPlaylist: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbumById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/album/${id}`);
			set({ currentAlbum: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchFeaturedSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/have-a-nice-day");
			set({ featuredSongs: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchMadeForYouSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/made-for-you");
			set({ madeForYouSongs: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchTrendingSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/trending");
			set({ trendingSongs: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchArtists: async () => {
		set({ isLoading: true, error: null });
		try {
		  const response = await axiosInstance.get("/admins/artists");
		  set({ artists: response.data.data });
		} catch (error: any) {
		  set({ error: error.message });
		} finally {
		  set({ isLoading: false });
		}
	},

	fetchGenres: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/genre");
			set({ genres: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchMySongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/music");
			set({ mySongs: response.data.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchMyAlbums: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/album");
			set({ myAlbums: response.data.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchPopularAlbums: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/popular-albums");
			set({ popularAlbums: response.data.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchPopularArtists: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/popular-artists");
			set({ popularArtists: response.data.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchMyStats: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/my-stats");
			set({ myStats: response.data.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));