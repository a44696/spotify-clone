import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/Input';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useAuth } from "@/providers/AuthContext";

const Profile = () => {
    const { user, loading } = useAuth();
    console.log("User data from useAuth:", user);

    if (loading) {
        return <p className="text-white text-center">Loading...</p>;
    }

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
                    <div className='w-full'>
                        <div className="flex w-full justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-semibold">{user?.fullName || "Loading..."}</h2>
                                <p className="text-gray-500">@{user?.username || "Loading..."}</p>
                            </div>
                            
                            <div className="ml-auto text-right">
                                <span className={`px-2 py-1 text-sm text-white rounded-md ${user?.role === 'Admin' ? 'bg-red-500' : user?.role === 'Artist' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                                    {user?.role}
                                </span>
                                <p className="text-gray-400">Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Loading..."}</p>
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
                        <Input placeholder="Full Name" value={user?.fullName || ""} disabled />
                        <Input placeholder="Username" value={user?.username || ""} disabled />
                        <Input placeholder="Email" value={user?.email || ""} disabled />
                        <Input type="date" placeholder="Date of Birth" value={user?.dob || ""} disabled />
                        <Input placeholder="Gender" value={user?.gender || ""} disabled />
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
