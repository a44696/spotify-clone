import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { useAuth } from "@/providers/AuthContext";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { getCurrentUser } = useAuth();
  const { checkAdminStatus } = useAuthStore();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
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
        toast.success(data.message);
        await getCurrentUser();
        await checkAdminStatus();
        navigate("/");
      } else {
        toast.error(data.message);
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
          Sign In
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-zinc-400 text-center mt-4">
          Don't have an account?
          <Link
            to="/signup"
            className="text-emerald-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
