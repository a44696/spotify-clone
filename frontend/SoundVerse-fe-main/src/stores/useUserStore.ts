import { create } from "zustand";
import { User } from "@/types";
import { axiosInstance } from "@/lib/axios";

interface UserStore {
    users: User[];
		currentUser: User;
    isLoading: boolean;
		error: string | null;
		isFollow: boolean;

    fetchedUsers: () => Promise<void>;
		fetchCurrentUser: (id: number) => void;
		followArtist: (id: number) => void;
		unfollowArtist: (id: number) => void;
		checkFollowArtist: (id: number) => void;
		deleteUser: (id: number) => void;
		updateUser: (id: number) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
    users: [],
    isLoading: false,
		error: null,
		isFollow: false,
		currentUser: null,

	fetchedUsers: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/users");
			set({ users: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchCurrentUser: async (id: number) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/users/${id}`);
			set({ currentUser: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	followArtist: async (id: number) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.post(`/follow/${id}`);
			set({ isFollow: true });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	unfollowArtist: async (id: number) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/follow/${id}`);
			set({ isFollow: false });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	checkFollowArtist: async (id: number) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/follow/${id}`);
			set({ isFollow: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	deleteUser: async (id: number) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/users/${id}`);
			set((state) => ({
				users: state.users.filter((user) => user.id !== id),
			}));
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	updateUser: async (id: number) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.put(`/admin/update-user/${id}`);
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
})); 