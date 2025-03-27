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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const formatDate = (inputDate) => {
    console.log(inputDate);

    if (inputDate.includes('/')) {
      return inputDate
    }
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  }

  const countries = [
    { code: "vn", name: "Việt Nam" },
    { code: "us", name: "USA" },
    { code: "uk", name: "Anh" },
    { code: "fr", name: "Pháp" },
  ];

  const handleSaveChanges = async () => {
    try {
      if (!currentUser.username || !currentUser.email || !currentUser.role || !currentUser.status) {
        toast.error("Username, email, role, and status are required.");
        return;
      }

      const updatedUser = {
        username: currentUser.username,
        gender: currentUser.gender,
        fullName: currentUser.fullName,
        country: currentUser.country,
        dob: currentUser.dob ? formatDate(currentUser.dob) : null,
        status: currentUser.status,
        role: currentUser.role,
      };

      const response = await axiosInstance.put(`/admin/update_user/${currentUser.id}`, updatedUser);

      if (response.data.status === "success") {
        toast.success("User updated successfully");
        setOpen(false);
        fetchedUsers();
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
                    className='text-green-400 hover:text-green-300 hover:bg-green-400/10'
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
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={currentUser?.username || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={currentUser?.fullName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              type='email'
              placeholder='email'
              disabled
              value={currentUser?.email || ''}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                name="gender"
                value={currentUser?.gender}
                onChange={handleInputChange}
                className="p-2 rounded bg-zinc-800 text-white w-full"
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
              <select
                name="country"
                value={currentUser?.country || ''}
                onChange={handleInputChange}
                className="p-2 rounded bg-zinc-800 text-white w-full"
                required
              >
                <option value="">Chọn quốc gia</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="role"
                value={currentUser?.role || ''}
                onChange={handleInputChange}
                className="p-2 rounded bg-zinc-800 text-white w-full"
                required
              >
                <option value="">Chọn Role</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
                <option value="ARTIST">Artist</option>
              </select>
              <select
                name="status"
                value={currentUser?.status || ''}
                onChange={handleInputChange}
                className="p-2 rounded bg-zinc-800 text-white w-full"
                required
              >
                <option value="">Chọn Status</option>
                <option value="ACTIVE">Active</option>
                <option value="DELETED">Deleted</option>
                <option value="DISABLED">Disabled</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
            <Input
              type="date"
              name="dob"
              value={currentUser?.dob ? currentUser.dob.split("/").reverse().join("-") : ""}
              onChange={handleInputChange} className={undefined} />
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
