import Playlist from "../models/playlist.model.js"; // Import model Playlist
import mongoose from "mongoose";

// Lấy tất cả playlist
export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find(); // Lấy danh sách tất cả playlist từ database
    const formattedPlaylists = playlists.map((playlist) => ({
      id: playlist._id.toString(), // Chuyển từ _id sang id để dễ dàng sử dụng trong frontend
      name: playlist.name,
      songs: playlist.songs,
    }));
    res.json(formattedPlaylists); // Trả về danh sách playlist
  } catch (error) {
    console.error("Lỗi khi lấy playlist:", error);
    res.status(500).json({ message: "Không thể lấy playlist", error });
  }
};

// Tạo playlist mới
export const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Tên playlist không được để trống" });
    }

    const newPlaylist = new Playlist({
      name: name, // Tên playlist từ request body
      songs: [], // Ban đầu không có bài hát
    });

    await newPlaylist.save(); // Lưu playlist vào cơ sở dữ liệu
    const formattedPlaylist = {
      id: newPlaylist._id.toString(),  // Chuyển _id thành id
      name: newPlaylist.name,
      songs: newPlaylist.songs,
    };
    res.status(201).json(formattedPlaylist); // Trả về playlist mới vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo playlist:", error);
    res.status(500).json({ message: "Không thể tạo playlist", error });
  }
};

// Xóa playlist theo ID
export const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ request params
    console.log(`Đang xóa playlist với ID: ${id}`); // Log ID để kiểm tra

    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`ID không hợp lệ: ${id}`); // Log ID không hợp lệ
      return res.status(400).json({ message: "ID playlist không hợp lệ" });
    }

    const playlist = await Playlist.findByIdAndDelete(id); // Tìm và xóa playlist theo ID

    if (!playlist) {
      console.log(`Không tìm thấy playlist với ID: ${id}`); // Log khi không tìm thấy playlist
      return res.status(404).json({ message: "Playlist không tồn tại" });
    }

    console.log(`Playlist đã được xóa: ${playlist.name}`); // Log tên playlist đã xóa
    res.status(200).json({ message: "Playlist đã được xóa" }); // Trả về thông báo thành công
  } catch (error) {
    console.error("Lỗi khi xóa playlist:", error);
    res.status(500).json({ message: "Không thể xóa playlist", error });
  }
};


export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { song } = req.body;

    // Kiểm tra nếu playlistId hợp lệ
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist không tồn tại" });
    }

    // Kiểm tra nếu bài hát đã tồn tại trong playlist
    if (playlist.songs.some((s) => s.id === song.id)) {
      return res.status(400).json({ message: "Bài hát đã có trong playlist" });
    }

    // Thêm bài hát vào playlist
    playlist.songs.push(song);
    await playlist.save();

    res.status(200).json({ message: "Thêm bài hát vào playlist thành công!", playlist });
  } catch (error) {
    console.error("Lỗi khi thêm bài hát vào playlist:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist không tồn tại" });
    }

    playlist.songs = playlist.songs.filter((song) => song.id !== songId);
    await playlist.save();

    res.status(200).json({ message: "Xóa bài hát khỏi playlist thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa bài hát:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

