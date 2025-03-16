export interface Song {
	id: number;
	title: string;
	artistId: number;
	artist: string;
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
	artistId: number;
	artist: string;
	listOfMusic: number;
	createdAt: string;
	songs: Song[];
}
export interface Playlist {
	id: number;      
	name: string;
	songs: Song[];    
	createdAt: string;
}
export interface Stats {
	totalSongs: number;
	totalSongsMonthly: number;
	totalAlbums: number;
	totalUsers: number;
	totalUsersMonthly: number;
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
export interface Artist {
	id: number;
	name: string;
	thumbnail: string;
  }