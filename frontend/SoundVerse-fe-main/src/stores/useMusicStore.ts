import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    Error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id : string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    songs: [],
    albums: [],
    isLoading: false,
    Error: null,
    currentAlbum: null,
    madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],
    
    fetchAlbums: async () => {
        set({isLoading: true, Error: null});

        try {
            const response = await axiosInstance.get("/albums");
            set({albums: response.data});
        } catch (error:any) {
            set({Error: error.response.data.message});
        }finally{
            set({isLoading: false});
        }
    },
    fetchAlbumById: async (id) => {
        set({ isLoading: true, Error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data });
		} catch (error: any) {
			set({ Error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
    },
    fetchFeaturedSongs: async () => {
        set({ isLoading: true, Error : null});
		try {
			const response = await axiosInstance.get("/songs/featured");
			set({ featuredSongs: response.data });
		} catch (Error: any) {
			set({ Error: Error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
    },
    fetchMadeForYouSongs: async () => {
		set({ isLoading: true, Error: null });
		try {
			const response = await axiosInstance.get("/songs/made-for-you");
			set({ madeForYouSongs: response.data });
		} catch (error: any) {
			set({ Error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchTrendingSongs: async () => {
		set({ isLoading: true, Error: null });
		try {
			const response = await axiosInstance.get("/songs/trending");
			set({ trendingSongs: response.data });
		} catch (error: any) {
			set({ Error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));