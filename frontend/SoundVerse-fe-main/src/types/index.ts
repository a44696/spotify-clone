export interface Song {
	_id: string;
	title: string;
	artist: string;
	albumId: string | null;
	imageUrl: string;
	audioUrl: string;
	duration: number;
	createdAt: string;
	updatedAt: string;
}

export interface Album {
	_id: string;
	title: string;
	artist: string;
	imageUrl: string;
	releaseYear: number;
	songs: Song[];
}
export interface Playlist {
	_id: string;          // ID của playlist
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