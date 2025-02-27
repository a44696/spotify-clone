import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";



export const useMusicStore = create((set) => ({
    songs: [],
    albums: [],
    isLoading: false,
    Error: null,

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
    }
}));