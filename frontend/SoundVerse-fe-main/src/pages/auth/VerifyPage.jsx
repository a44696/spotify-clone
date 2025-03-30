import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/utils";
import toast from "react-hot-toast";

const VerifyPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState(""); // Thêm state để lưu email
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Nhận dữ liệu từ trang đăng ký

  // Lấy email từ location hoặc localStorage
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      localStorage.setItem("email", location.state.email); // Lưu email
    } else {
      setEmail(localStorage.getItem("email") || ""); // Nếu có, lấy từ localStorage
    }
  }, [location.state]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerify = async () => {
    if (!email) {
      alert("Không tìm thấy email! Vui lòng đăng ký lại.");
      return;
    }

    setIsLoading(true);
    try {
      const code = otp.join("");
      const response = await fetch(`${apiUrl.baseURL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode: code }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.status === "success") {
        alert(data.message);
        navigate("/auth");
      } else {
        alert("Mã OTP không hợp lệ. Vui lòng thử lại!");
      }
    } catch (error) {
      alert("Lỗi khi xác minh: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.success("Không tìm thấy email! Vui lòng đăng ký lại.");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch(`${apiUrl.baseURL}/auth/resend?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === "success") {
        toast.success("Mã OTP đã được gửi lại!");
      } else {
        toast.error("Không thể gửi lại mã OTP. Vui lòng thử lại sau!");
      }
    } catch (error) {
      toast.error("Lỗi khi gửi lại OTP: " + error.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-zinc-900 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-white text-xl font-bold mb-4 text-center">
          Xác minh Email
        </h2>
        <p className="text-gray-400 text-center mb-4">
          Nhập mã xác thực đã gửi đến email: <b className="text-white">{email}</b>
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((value, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={value}
              maxLength={1}
              className="w-12 h-12 text-center text-2xl bg-zinc-800 text-white"
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        <div className="mt-4 text-center">
          <p
            onClick={handleResendOtp}
            className="text-green-500 hover:underline cursor-pointer text-left ml-6 my-3  "
          >
            {isResending ? "Đang gửi lại..." : "Gửi lại OTP"}
          </p>
        </div>

        <Button
          onClick={handleVerify}
          className="w-full bg-emerald-500 hover:bg-emerald-600"
          disabled={isLoading}
        >
          {isLoading ? "Đang xác minh..." : "Xác nhận"}
        </Button>

        
      </div>
    </div>
  );
};

export default VerifyPage;
