import React, { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import { useNavigate } from "react-router-dom";
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import SignInOAuthButton from '@/components/SignInOAuthButton';
import { useAuth } from "@/providers/AuthContext";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { getCurrentUser } = useAuth();
  const navigate = useNavigate();

  const toggleAuthMode = () => setIsSignUp(!isSignUp);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      if (isSignUp) {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          setIsLoading(false);
          return;
        }
        
        // Đăng ký tài khoản mới
        // await signUp.create({ emailAddress: email, password });
        // await signUp.prepareEmailAddressVerification();
        alert('Check your email to verify your account!');
        navigate("/verify");
      } else {
        // Đăng nhập
        // await signIn.create({ identifier: email, password });
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });
        const data = await response.json();
        if (data.status == 'success') {
          alert(data.message);
          await getCurrentUser();
          navigate("/");
        }else {
          alert(data.message);
        }
      }
    } catch (error) {
      alert('Error: ' + error.errors[0]?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-zinc-900 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-white text-xl font-bold mb-4 text-center">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isSignUp && (
            <Input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-zinc-800 text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <SignInOAuthButton />

        <p className="text-zinc-400 text-center mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleAuthMode}
            className="text-emerald-400 hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
