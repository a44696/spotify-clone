import { axiosInstance } from "@/lib/axios";

import { Album, Artist, Genre, Playlist, Song, Stats } from "@/types";

import { toast } from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
	songs: Song[];
	albums: Album[];
	genres: Genre[];
	playlists: Playlist[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;
	artists: Artist[];

	fetchGenres: () => Promise<void>;
	fetchPlaylists: () => Promise<void>;
	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: number) => Promise<void>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	deleteSong: (id: number) => Promise<void>;
	deleteAlbum: (id: number) => Promise<void>;

	fetchArtists: () => Promise<void>;

	deletePlaylist: (id: number) => Promise<void>;

}

export const useMusicStore = create<MusicStore>((set) => ({
	albums: [],
	songs: [],
	playlists: [],
	genres: [],
	isLoading: false,
	error: null,
	currentAlbum: null,
	madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],
	stats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalUsers: 0,
		totalArtists: 0,
		totalSongsMonthly: 0,
		totalUsersMonthly: 0
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
			await axiosInstance.delete(`/song/${id}`);

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
			const response = await axiosInstance.get("/music");
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
			const response = await axiosInstance.get("/stats");
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
			const response = await axiosInstance.get("/album");
			
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
			const response = await axiosInstance.get("/song/featured");
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
			const response = await axiosInstance.get("/songs/trending");
			set({ trendingSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
	fetchArtists: async () => {
		set({ isLoading: true, error: null });
		try {
		  const response = await axiosInstance.get("/artists"); // Giả sử bạn có API để lấy danh sách nghệ sĩ
		  set({ artists: response.data.data }); // Lưu dữ liệu nghệ sĩ vào state
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
	}
}));