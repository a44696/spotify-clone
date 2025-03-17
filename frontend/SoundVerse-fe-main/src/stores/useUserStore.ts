import { create } from "zustand";
import { User } from "@/types";
import { axiosInstance } from "@/lib/axios";

interface UserStore {
    users: User[];
    isLoading: boolean;
	error: string | null;

    fetchedUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    users: [],
    isLoading: false,
	error: null,

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
})); 