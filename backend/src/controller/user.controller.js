import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const currentUserId = req.auth.userId;
		const users = await User.find({ _id: { $ne: currentUserId } });
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const registerUser = async (req, res, next) => {
	try {
		const { clerkId, fullName, email, imageUrl } = req.body;

		// 🔹 Kiểm tra nếu user đã tồn tại
		let existingUser = await User.findOne({ clerkId });
		if (existingUser) {
			return res.status(200).json(existingUser); // Trả về user đã tồn tại thay vì insert lại
		}

		// 🔹 Nếu chưa có, tạo user mới
		const newUser = new User({
			clerkId,
			fullName,
			email,
			imageUrl,
		});

		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};
export const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};