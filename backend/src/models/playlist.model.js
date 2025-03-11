// models/playlist.js
import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên playlist
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }] // Mảng các bài hát (dùng ObjectId để tham chiếu đến model Song)
  },
  { timestamps: true } // Tự động thêm thời gian tạo và cập nhật
);

// Tạo model Playlist từ schema
const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist; // Export model để có thể sử dụng ở nơi khác
