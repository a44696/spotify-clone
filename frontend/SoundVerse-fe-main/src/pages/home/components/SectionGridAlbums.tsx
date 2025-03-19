import { Button } from '@/components/ui/button';
import SectionGridSkeleton from './SectionGridSkeleton';
import React, { useEffect } from 'react';
import { useMusicStore } from '@/stores/useMusicStore';



const SectionGridAlbums = () => {
    const { albums, isLoading, fetchAlbums} = useMusicStore();
    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);
  if (isLoading) return <SectionGridSkeleton />;

  return (
    <div className="mb-8">
      {/* Tiêu đề + nút Hiện tất cả */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Popular Albums</h2>
        <Button variant="link" className="text-sm hover:text-white">
          Show All
        </Button>
      </div>

      {/* Danh sách album dạng lưới */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              {/* Ảnh album */}
              <div className="aspect-square overflow-hidden rounded-md">
                <img
                  src={album.thumbnail}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Tên album */}
            <h3 className="font-medium text-center mb-1">{album.title}</h3>

            {/* Nghệ sĩ */}
            <p className="text-sm text-gray-400 text-center">{album.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGridAlbums;
