import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMusicStore } from "@/stores/useMusicStore";// Hook để lấy dữ liệu âm nhạc

const ArtistDetailPage = () => {
  const { artistId } = useParams(); // Lấy ID nghệ sĩ từ URL
  const { fetchArtistDetails, artistDetails, isLoading } = useMusicStore();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    if (artistId) {
      fetchArtistDetails(Number(artistId)); // Fetch thông tin nghệ sĩ khi có artistId
    }
  }, [artistId, fetchArtistDetails]);

  useEffect(() => {
    if (artistDetails) {
      setArtist(artistDetails); // Cập nhật thông tin nghệ sĩ khi đã có dữ liệu
    }
  }, [artistDetails]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div className="artist-detail-container">
      <div className="artist-header">
        <img
          src='/default_avatar_user.jpg'
          alt={artist.username}
          className="rounded-full w-48 h-48 object-cover mx-auto"
        />
        <h2 className="text-2xl text-center mt-4">{artist.username}</h2>
      </div>

      <div className="artist-songs">
        <h3 className="text-xl mt-8">Songs</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artist.songs.map((song) => (
            <li key={song.id} className="p-4 bg-zinc-800/40 rounded-md hover:bg-zinc-700/40 transition-all">
              <div className="font-medium">{song.title}</div>
              <div className="text-sm text-zinc-400">{song.artist.username}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="artist-albums mt-8">
        <h3 className="text-xl">Albums</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artist.albums.map((album) => (
            <li key={album.id} className="p-4 bg-zinc-800/40 rounded-md hover:bg-zinc-700/40 transition-all">
              <div className="font-medium">{album.title}</div>
              <div className="text-sm text-zinc-400">{album.releaseDate}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
