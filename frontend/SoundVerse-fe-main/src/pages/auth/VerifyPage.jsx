import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

const VerifyPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { signUp } = useSignUp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý thay đổi từng ô OTP
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Chỉ cho phép số

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Chuyển đến ô tiếp theo nếu nhập xong 1 số
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Gửi mã OTP để xác thực
  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const code = otp.join(""); // Nối 6 số lại thành mã OTP hoàn chỉnh
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        alert("Xác minh thành công! Đang chuyển hướng...");
        navigate("/"); // Chuyển về trang chính sau khi xác minh thành công
      } else {
        alert("Mã OTP không hợp lệ. Vui lòng thử lại!");
      }
    } catch (error) {
      alert("Lỗi: " + (error.errors?.[0]?.message || "Có lỗi xảy ra!"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-zinc-900 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-white text-xl font-bold mb-4 text-center">
          Xác minh Email
        </h2>
        <p className="text-gray-400 text-center mb-4">
          Nhập mã xác thực 6 số đã gửi đến email của bạn.
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
            />
          ))}
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
