import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUserStore } from "@/stores/useUserStore";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar, Edit, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";  // Import axios instance
import toast from "react-hot-toast";
const UsersTable = () => {
  const { users, fetchedUsers, deleteUser, updateUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchedUsers();
  }, [fetchedUsers]);

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleSaveChanges = async () => {
	try {
	  // Kiểm tra các trường bắt buộc
	  if (!currentUser.fullname ||!currentUser.username || !currentUser.email || !currentUser.role || !currentUser.status) {
		toast.error("Username, email, role, and status are required.");
		return;
	  }
  
	  // Kiểm tra và thay thế các giá trị null hoặc undefined nếu cần
	  const updatedUser = {
		...currentUser,
		country: currentUser.country || "Not Provided", // Thay thế nếu country là null
		dob: currentUser.dob || "Not Provided", // Thay thế nếu dob là null
	  };
	  
  
	  // Gửi yêu cầu PUT đến API /admin/update-user
	  const response = await axiosInstance.put(`/admin/update-user`, updatedUser);
  
	  // Kiểm tra kết quả từ API
	  if (response.data.status === "success") {
		toast.success("User updated successfully");
		setOpen(false);
		fetchedUsers();  // Tải lại danh sách người dùng nếu cần thiết
	  } else {
		toast.error("Failed to update user");
	  }
	} catch (error) {
	  console.error("Error updating user:", error.response ? error.response.data : error.message);
	  toast.error("Error updating user");
	}
  };
  

  return (
    <>
      <Table className={undefined}>
        <TableHeader className={undefined}>
          <TableRow className='hover:bg-zinc-800/50'>
            <TableHead className='w-[50px]'></TableHead>
            <TableHead className={undefined}>Username</TableHead>
            <TableHead className={undefined}>Email</TableHead>
            <TableHead className={undefined}>Gender</TableHead>
            <TableHead className={undefined}>Role</TableHead>
            <TableHead className={undefined}>Status</TableHead>
            <TableHead className={undefined}>Created At</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={undefined}>
          {users.map((user) => (
            <TableRow key={user.id} className='hover:bg-zinc-800/50'>
              <TableCell className={undefined}>
                <img
                  src={user.profilePicImage != null ? user.profilePicImage : "cover-images/12.jpg"}
                  alt={user.username}
                  className='size-10 rounded object-cover'
                />
              </TableCell>
              <TableCell className='font-medium'>{user.fullName}</TableCell>
              <TableCell className='font-medium'>{user.username}</TableCell>
              <TableCell className={undefined}>{user.email}</TableCell>
              <TableCell className={undefined}>{user.gender}</TableCell>
              <TableCell className={undefined}>{user.role}</TableCell>
              <TableCell className={undefined}>{user.status}</TableCell>
              <TableCell className={undefined}>
                <span className='inline-flex items-center gap-1 text-zinc-400'>
                  <Calendar className='h-4 w-4' />
                  {user.createdAt}
                </span>
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex gap-2 justify-end'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleEditClick(user)}
                    className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                  >
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => deleteUser(user.id)}
                    className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and click "Save Changes" to apply the updates.
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col gap-4'>
          <Input
              type='text'
              placeholder='Fullname'
              value={currentUser?.fullname || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, fullname: e.target.value })}
            />
            <Input
              type='text'
              placeholder='Username'
              value={currentUser?.username || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
            />
            <Input
              type='email'
              placeholder='Email'
              value={currentUser?.email || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            />
            <Input
              type='text'
              placeholder='Gender'
              value={currentUser?.gender || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })}
            />
            <Input
              type='text'
              placeholder='Role'
              value={currentUser?.role || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
            />
            <Input
              type='text'
              placeholder='Status'
              value={currentUser?.status || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSaveChanges}
              className='bg-blue-500 hover:bg-blue-600 text-white'
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersTable;
