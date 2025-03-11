import { SignedOut, SignOutButton, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { Input } from './ui/Input';
import { useAuth } from "@/providers/AuthContext";
import SignInOAuthButtons from './SignInOAuthButton';

const Topbar = () => {
    const { user } = useAuth();  // Lấy thông tin người dùng
    const isAdmin = useAuthStore(); // Kiểm tra quyền admin
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Xử lý tìm kiếm
    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}`);
        }
    };

    return (
        <div className='flex justify-between items-center p-4 bg-zinc-900/75 backdrop-blur-md z-10'>
            
            {/* Logo */}
            <div className='flex gap-2 items-center'>
                <img src="/spotify.png" alt="spotify logo" className="size-8" />
                <span className="text-white font-semibold text-lg">Spotify</span>
            </div>
            
            {/* Search Bar */}
            <div className='flex items-center gap-4 flex-1 justify-center'>
                <div className='flex items-center border border-zinc-700 rounded-lg overflow-hidden'>
                    <Input
                        type="text"
                        placeholder="Search songs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className='bg-zinc-800 border-none text-white px-4 py-2 w-64'
                    />
                    <button
                        onClick={handleSearch}
                        className='bg-emerald-500 px-4 py-2 hover:bg-emerald-600 flex items-center'
                    >
                        <Search className='size-5 text-black' />
                    </button>
                </div>
            </div>

            {/* Admin Dashboard & User Controls */}
            <div className='flex items-center gap-4'>
                {isAdmin.isAdmin && (
                    <Link to='/admin' className={cn(buttonVariants({ variant: 'outline' }))}>
                        <LayoutDashboardIcon className='size-4 mr-2' />
                        Admin Dashboard
                    </Link>
                )}

                {!user && (
                    <SignedOut>
                        <Link to="/auth" className={cn(buttonVariants({ variant: "default" }))}>
                            Sign In
                        </Link>
                    </SignedOut>
                )}

                {user && (
                    <>
                        <Link to={"/profile"}>
                            <img style={{ width: "50px", height: "50px", borderRadius: "40px", margin: "10px" }} 
                                 className="avatar" 
                                 src="cover-images/12.jpg" 
                                 alt="User Avatar"
                            />
                        </Link>
                    </>
                )}

                <UserButton />
            </div>
        </div>
    );
};

export default Topbar;
