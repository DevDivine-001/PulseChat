import bcryptjs from 'bcryptjs';
import cloudinary from 'cloudinary';
import User from '../model/auth.model.js';
import { errorHandler } from '../middleware/Error.middleware.js';
import mongoose from 'mongoose';


export const updateProfile = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return next(errorHandler(401, 'You can only update your own account!'));
        }

        const userId = req.user.id;
        // Ensure this is coming from the middleware

        // Validate userId format
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const { profilePic, username, email, password } = req.body;

        // if (!profilePic || !username || !email || !password) {
        //     return res.status(400).json({ message: "Profile pic, username, email, and password are required." });
        // }

        if (password && password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const updates = { username, email, password };

        if (password) {
            updates.password = bcryptjs.hashSync(password, 10);
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updates.profilePic = uploadResponse.secure_url;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true },
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password: _, ...rest } = updatedUser._doc;

        res.status(200).json({
            message: "Profile updated successfully!",
            user: rest,
        });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const DeleteAccount = async (req, res, next) => {
    try {
        let userId = req.params.id;

        // Log the received ID for debugging
        // console.log("Received user ID:", userId);

        // Remove invalid characters (e.g., ":" or extra spaces)
        userId = userId.replace(/[^a-fA-F0-9]/g, '');

        // Validate the sanitized ID
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format. Please provide a valid 24-character hexadecimal string."
            });
        }

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Account deleted successfully!",
            // user: deletedUser,
        });
    } catch (error) {
        console.error("Error deleting account:", error);
        next(),
            res.status(500).json({
                success: false,
                message: "Internal server error.",
            });
    }
};