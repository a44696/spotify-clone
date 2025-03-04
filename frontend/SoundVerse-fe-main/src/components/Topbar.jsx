import {  SignedOut, SignOutButton, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react'
import React, { use } from 'react'
import { Link } from 'react-router-dom';
import SignInOAuthButtons from './SignInOAuthButton';
import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const Topbar = () => {
    const isAdmin = useAuthStore();
    console.log(isAdmin);
  return (
    <div className='flex justify-between items-center p-4 bg-zinc-900/75 backdrop-blur-md z-10 '>
        <div className='flex gap-2 items-center'>
            <img src="/spotify.png" alt="spotify logo" className="size-8 " />
            Spotify
        </div>
        <div className='flex items-center gap-4'>
            {isAdmin && (
                <Link to={"/admin"} className={cn(buttonVariants({variant:"outline"}))}>
                    <LayoutDashboardIcon className='size-4 mr-2'/>
                    Admin DashBoard
                </Link>
            )}
            
            <SignedOut>
                <Link to="/auth" className={cn(buttonVariants({ variant: "default" }))}>
                    Sign In
                </Link>
                
            </SignedOut>

            <UserButton />
            
        </div>
    </div>
  )
}

export default Topbar