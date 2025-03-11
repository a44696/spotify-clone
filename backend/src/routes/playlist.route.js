import express from 'express';
import { getPlaylists, createPlaylist, deletePlaylist , addSongToPlaylist , removeSongFromPlaylist } from '../controller/playlist.controller.js'; // Import từ controller

const router = express.Router();

// Định nghĩa các route cho playlist
router.get('/', getPlaylists);
router.post('/', createPlaylist);
router.delete('/:id', deletePlaylist);

router.post('/:playlistId/add', addSongToPlaylist);
router.post('/:playlistId/remove/:songId', removeSongFromPlaylist);

  
export default router;
