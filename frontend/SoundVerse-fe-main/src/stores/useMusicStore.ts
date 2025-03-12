import { axiosInstance } from "@/lib/axios";
import { Album, Genre, Song, Stats } from "@/types";
import { toast } from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
	songs: Song[];
	albums: Album[];
	genres: Genre[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;

	fetchGenres: () => Promise<void>;
	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: number) => Promise<void>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	deleteSong: (id: number) => Promise<void>;
	deleteAlbum: (id: number) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
	albums: [],
	songs: [],
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
	},

	deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
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
	deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/songs/${id}`);

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
			const response = await axiosInstance.get("/songs");
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
			const response = await axiosInstance.get("/album/get-albums-by-userid");
			set({ albums: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbumById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
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
			const response = await axiosInstance.get("/songs/featured");
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
			set({ madeForYouSongs: [
				{id: 1,
				title: 'hehe',
				artist: 'khanh',
				albumId: null,
				imageUrl: 'https://sound-verse.s3.us-east-1.amazonaws.com/1/thumbnails/test-thumbnail-1741774860593-7731a36f-887a-4e79-a7df-928aae36af7d.png?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLWVhc3QtMSJIMEYCIQC0mCKqfWyGEJ2GoZ%2FGwzLcIV79KS2L0sDelh31c3CjuAIhAJSzuazzlxF6PAfGeZqmIQ94BMlHNcE1vNwHteTuCNTaKtQDCLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNDc3NDk4MzU4OTYxIgyrZdNpFC9s8ssFv3YqqANZ2YYHOQlEJRB%2Bh7GD3xG9XojvrTcjVaw0q%2BSyJmOfKxmK%2BySihK7PctMmI2DifQl%2BEHo8Ci6t1528SVKgnwVQ68zR4ISM2owVY47BuienkZ9MiQOvFJqB90modXDOy%2FcTobkHAxG5YqF8Ht4oSDimxRp%2BTVDtNVCJ4VCAfwN0RjKsesnzSdJgOM2%2FYB3eOENQNQXYW2UcXs5Bd%2FS4ONB%2BMP2AZ4%2FMEs4UfSiRIm5a%2Fg7y%2FnFOWATp9NAwXtwiLzV0NnNoIZyTfjZYCNuXRS3EJJUPups%2BdlEwzR1ruqbay9VS7VkhN0SfRbEavg6fGdJL2MQ5uoED2kv%2B4VAxRBKslny3OIE11IAD3ew8EyDEZNxDomxwBORx%2BnFjlVNMP%2BWrtAzQRKjDufOvgE4rDnYWwVR%2FJMgjlwZtk%2BdSYZxdMpYD1ppiqqWd1cXDibI1eIgbdrGY84gWgC4d7LeyETjNaTFdfFRZlAfCPV%2B7timEuPme47nAaydlwIjeDTtEPE1OyYB%2BuN3DkwHLwYBRmsHVCNXKyyxEA7p7AqGSEB5hJY8M8kVUI%2FLyMOrExb4GOuMC2JZQhfKU2XkrsR86xn79FowwqrnJwq9Z5U0LH1PAaLv1XLy1Uy9xf0J6FFG8YLeYSh9HyaSL4QH0oGEkzb38Jd6lPTXWkr5l1%2FUbz55GYW5n2i21jCD1Ajo5EZgfTs4tvSd2P2ld3Bv%2FyWSgEHQIfsgho13AWIhOimP0jPFjoTTCERgCnjnNDLz5fqBtQG4jwIS9nKl4mTDdlVE1alO%2Bs32wL34b5y6Dw%2BKGgmmGqaErSQqqLIpA%2Bu3jnYkl9Ri8VixhBF%2F%2FCu%2FPw2OmnEZwYPXSZZPoXFNeG%2F0dxm6fN6IWFkw0BgO%2Fp2jRaG16yOCTHojXn2B%2Bv%2FcWGf54G73RoKagCFVEnJKP4kOZnFqa8r3dOHWJVunUkzjNLcvTwxzgh1cW36INLt3FKIGFGTnTKTgkKqHmsT6FBqufhTW84LU4bwzmIrjG0BZhmHPyN9facjsxF7dLBr200pJcfywcHPqkfA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAW6LI6XSY23C7KYV3%2F20250312%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250312T103548Z&X-Amz-Expires=720&X-Amz-SignedHeaders=host&X-Amz-Signature=b00b0c908ce8a764b4ef778e230c946cf97a08444484c95b5e8871d704cea370',
				audioUrl: 'https://sound-verse.s3.us-east-1.amazonaws.com/1/test-1741774860593-1df8a1c8-1d39-4a21-b740-50109bd2cadc.mp3?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLWVhc3QtMSJIMEYCIQC0mCKqfWyGEJ2GoZ%2FGwzLcIV79KS2L0sDelh31c3CjuAIhAJSzuazzlxF6PAfGeZqmIQ94BMlHNcE1vNwHteTuCNTaKtQDCLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNDc3NDk4MzU4OTYxIgyrZdNpFC9s8ssFv3YqqANZ2YYHOQlEJRB%2Bh7GD3xG9XojvrTcjVaw0q%2BSyJmOfKxmK%2BySihK7PctMmI2DifQl%2BEHo8Ci6t1528SVKgnwVQ68zR4ISM2owVY47BuienkZ9MiQOvFJqB90modXDOy%2FcTobkHAxG5YqF8Ht4oSDimxRp%2BTVDtNVCJ4VCAfwN0RjKsesnzSdJgOM2%2FYB3eOENQNQXYW2UcXs5Bd%2FS4ONB%2BMP2AZ4%2FMEs4UfSiRIm5a%2Fg7y%2FnFOWATp9NAwXtwiLzV0NnNoIZyTfjZYCNuXRS3EJJUPups%2BdlEwzR1ruqbay9VS7VkhN0SfRbEavg6fGdJL2MQ5uoED2kv%2B4VAxRBKslny3OIE11IAD3ew8EyDEZNxDomxwBORx%2BnFjlVNMP%2BWrtAzQRKjDufOvgE4rDnYWwVR%2FJMgjlwZtk%2BdSYZxdMpYD1ppiqqWd1cXDibI1eIgbdrGY84gWgC4d7LeyETjNaTFdfFRZlAfCPV%2B7timEuPme47nAaydlwIjeDTtEPE1OyYB%2BuN3DkwHLwYBRmsHVCNXKyyxEA7p7AqGSEB5hJY8M8kVUI%2FLyMOrExb4GOuMC2JZQhfKU2XkrsR86xn79FowwqrnJwq9Z5U0LH1PAaLv1XLy1Uy9xf0J6FFG8YLeYSh9HyaSL4QH0oGEkzb38Jd6lPTXWkr5l1%2FUbz55GYW5n2i21jCD1Ajo5EZgfTs4tvSd2P2ld3Bv%2FyWSgEHQIfsgho13AWIhOimP0jPFjoTTCERgCnjnNDLz5fqBtQG4jwIS9nKl4mTDdlVE1alO%2Bs32wL34b5y6Dw%2BKGgmmGqaErSQqqLIpA%2Bu3jnYkl9Ri8VixhBF%2F%2FCu%2FPw2OmnEZwYPXSZZPoXFNeG%2F0dxm6fN6IWFkw0BgO%2Fp2jRaG16yOCTHojXn2B%2Bv%2FcWGf54G73RoKagCFVEnJKP4kOZnFqa8r3dOHWJVunUkzjNLcvTwxzgh1cW36INLt3FKIGFGTnTKTgkKqHmsT6FBqufhTW84LU4bwzmIrjG0BZhmHPyN9facjsxF7dLBr200pJcfywcHPqkfA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAW6LI6XSY23C7KYV3%2F20250312%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250312T103232Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=9e8fc32c23b48713c7257583e4f6bb082c47a4b9b45f305fa80bfab16855af95',
				duration: 53.9429,
				createdAt: '2025-03-12 10:26:45.594981'}
			] });
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