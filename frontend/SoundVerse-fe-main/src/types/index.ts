export interface Song {
	id: number;
	title: string;
	artist: string;
	albumId: string | null;
	imageUrl: string;
	audioUrl: string;
	duration: number;
	createdAt: string;
}

export interface Album {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
	listOfMusic: number;
	artistId: number;
	createdAt: string;
	songs: Song[];
}
export interface Playlist {
	id: number;          // ID của playlist
	name: string;         // Tên playlist
	userId: string;       // ID của người sở hữu playlist
	songs: Song[];        // Danh sách bài hát trong playlist
	createdAt: string;    // Ngày tạo playlist
	updatedAt: string;    // Ngày cập nhật playlist
}
export interface Stats {
	totalSongs: number;
	totalAlbums: number;
	totalUsers: number;
	totalArtists: number;
}
export interface User {
	_id: string;
	clerkId: string;
	fullName: string;
	imageUrl: string;
}
export interface Genre {
	id: string;
	title: string;
}