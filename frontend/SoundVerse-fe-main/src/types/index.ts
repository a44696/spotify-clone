export interface Song {
	id: number;
	title: string;
	artist: User;
	genre: string;
	description: string;
	albumId: string | null;
	thumbnail: string;
	filePath: string;
	length: number;
	createdAt: string;
}

export interface Album {
	id: number;
	title: string;
	description: string;
	thumbnail: string;
	artist: User;
	listOfMusic: number;
	createdAt: string;
	songs: Song[];
}
export interface Playlist {
	id: number;      
	name: string;     
	userId: number;   
	songs: Song[];    
	createdAt: string;
}
export interface Stats {
	totalSongs: number;
	totalAlbums: number;
	totalUsers: number;
	totalArtists: number;
}
export interface User {
	id: number;
	username: string;
	email: string;
	gender: string;
	country: string;
	profilePicImage: string | null;
	fullName: string;
	dob: string;
	createdAt: string
}
export interface Genre {
	id: string;
	title: string;
}