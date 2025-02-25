import React from 'react'
import { Button } from './ui/button';
import { useSignIn } from '@clerk/clerk-react';



const SignInOAuthButton = () => {
	const {signIn,isLoaded}=useSignIn();
	if(!isLoaded){
		return null;
	};
	const SignInWithGoogle = () =>{
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete:"/auth-callback",
		});
	};
  return( <Button onClick={SignInWithGoogle} variant = {"secondary "} className = "w-full text-white border-zinc-200 h-11" >
	<img src='/google.png' alt='Google' className='size-5' />
	continue with google
  </Button>)
  
};

export default SignInOAuthButton