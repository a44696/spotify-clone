import React, { useState } from "react";
import { Input } from "@/components/ui/Input"; // Đảm bảo file Input đã tồn tại
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios"; // Để gọi API lưu tài khoản

const SignUpForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/signup", {
        username: form.username,
        password: form.password,
      });

      if (res.data.success) {
        alert("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
        navigate("/login"); // Chuyển hướng đến trang đăng nhập
      }
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi đăng ký!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-white text-2xl font-bold mb-4">Đăng Ký</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="username"
            placeholder="Tên tài khoản"
            value={form.username}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full bg-emerald-500">
            Đăng Ký
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
