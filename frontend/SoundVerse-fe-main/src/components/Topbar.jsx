import { SignedIn, SignedOut, SignIn, SignOutButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';
import SignInOAuthButtons from './SignInOAuthButton';

const Topbar = () => {
    const isAdmin = false;
  return (
    <div className='flex justify-between items-center p-4 bg-zinc-900/75 backdrop-blur-md z-10 '>
        <div className='flex gap-2 items-center'>
            Spotify
        </div>
        <div className='flex items-center gap-4'>
            {isAdmin && (
                <Link to={"/admin"} className="flex items-center">
                    <LayoutDashboardIcon className='size-4 mr-2'/>
                    Admin DashBoard
                </Link>
            )}
            <SignedIn>
                {console.log('User is signed in')}
                <SignOutButton />
            </SignedIn>
            <SignedOut>
                <SignInOAuthButtons/>
            </SignedOut>
            
        </div>
    </div>
  )
}

export default Topbar