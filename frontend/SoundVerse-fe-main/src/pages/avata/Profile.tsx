import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from '@/components/ui/Input';
import axios from "axios";
import { ScrollArea } from '@radix-ui/react-scroll-area';

const Profile = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("My Bio");

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"));

        if (userInfo) {
            setEmail(userInfo.email);
            setFullName(userInfo.fullName);
            setUsername(userInfo.username);
        } else {
            // Gọi API chỉ khi không có dữ liệu trong localStorage
            axios.get(`/api/auth/me`)
                .then(response => {
                    const userData = response.data;
                    setFullName(userData.fullName);
                    setUsername(userData.username);
                    setEmail(userData.email);

                    // Lưu vào localStorage để sử dụng sau
                    localStorage.setItem("user", JSON.stringify(userData));
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []); // Chỉ chạy một lần khi component mount

    return (
        <ScrollArea className='h-[calc(100vh-180px)] overflow-y-auto'
                        style={{
                            scrollbarWidth: 'thin', /* Dùng cho Firefox */
                            scrollbarColor: '#0f0f0f transparent' /* Màu thanh cuộn */
                        }}>
            <div className="max-w-2xl mx-auto p-6 bg-black shadow-md rounded-md">
                {/* Ảnh đại diện + Thông tin */}
                <div className="flex items-center gap-4">
                    <img src="/cover-images/12.jpg" alt="Avatar" className="w-24 h-24 rounded-full border" />
                    <div>
                        <h2 className="text-2xl font-semibold">{fullName || "Loading..."}</h2>
                        <p className="text-gray-500">@{username || "Loading..."}</p>
                        {/* Nút đổi ảnh */}
                        <div className="mt-4">
                            <Button variant="outline">Change Photo</Button>
                        </div>
                    </div>
                </div>

                

                {/* Cài đặt thông tin */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Settings</h3>
                    <div className="space-y-4">
                        <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input label="Email" value={email} disabled />
                        <textarea className="w-full border p-2 rounded-md" placeholder="About" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>
                </div>

                {/* Đổi mật khẩu */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                    <div className="space-y-4">
                        <Input type="password" placeholder="Current Password" />
                        <Input type="password" placeholder="New Password" />
                        <Input type="password" placeholder="Confirm Password" />
                    </div>
                </div>

                {/* Nút lưu thay đổi */}
                <div className="mt-6">
                    <Button>Save Changes</Button>
                </div>
            </div>
        </ScrollArea>
    );
};

export default Profile;
