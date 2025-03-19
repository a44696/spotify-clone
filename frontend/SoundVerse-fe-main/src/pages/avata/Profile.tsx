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
    const [dob, setDob] = useState("");
    const [role, setRole] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"));

        if (userInfo) {
            setEmail(userInfo.email);
            setFullName(userInfo.fullName);
            setUsername(userInfo.username);
            setDob(userInfo.dob || "");
            setRole(userInfo.role || "User");
            setCreatedAt(userInfo.createdAt || "");
        } else {
            // Gọi API chỉ khi không có dữ liệu trong localStorage
            axios.get(`/api/auth/me`)
                .then(response => {
                    const userData = response.data;
                    setFullName(userData.fullName);
                    setUsername(userData.username);
                    setEmail(userData.email);
                    setDob(userData.dob || "");
                    setRole(userData.role || "User");
                    setCreatedAt(userData.createdAt || "");

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
                    <div className=''>
                        <div className="flex w-full justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold">{fullName || "Loading..."}</h2>
                                <p className="text-gray-500">@{username || "Loading..."}</p>
                            </div>
                            
                            <div className="ml-auto text-right">
                                <span className={`px-2 py-1 text-sm text-white rounded-md ${role === 'Admin' ? 'bg-red-500' : role === 'Artist' ? 'bg-blue-500' : 'bg-gray-500'}`}>{role}</span>
                                <p className="text-gray-400">Joined: {createdAt ? new Date(createdAt).toLocaleDateString() : "Loading..."}</p>
                            </div>
                        </div>
                        {/* Nút đổi ảnh */}
                        <div className="mt-4">
                            <Button variant="outline">Change Photo</Button>
                        </div>
                    </div>
                </div>

                {/* Cài đặt thông tin */}
                <div className="mt-6">
                    <div className="space-y-4">
                        <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder="Email" value={email} disabled />
                        <Input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
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
