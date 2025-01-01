import { errorHandler } from "../middleware/Error.middleware.js";
import User from "../model/auth.model.js";
import bcryptjs from "bcryptjs"
import cloudinary from "cloudinary";


// export const updateProfile = async (req, res, next) => {
//     if (req.user.id !== req.params.id)
//         return next(errorHandler(401, 'You  can only update your own account!'));
//     try {
//         const { profilePic, username, email, } = req.body;
//         const userId = req.user._id;

//         // if (!profilePic || !username || !email || !password) {
//         //     return res.status(400).json({ message: "All fields are required for Update" });
//         // };

//         if (password.length < 6) {
//             return res.status(400).json({ message: "Password must be at least 6 characters" });
//         };

//         if (req.body.password) {
//             req.body.password = bcryptjs.hashSync(req.body.password, 10)

//         };

//         const uploadResponse = await cloudinary.uploader.upload(profilePic);
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//             $set: {
//                 userId,
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.body.password,
//                 profilePic: req.body.profilePic
//             },
//         },
//             { profilePic: uploadResponse.secure_url },
//             { new: true },
//         );
//         const { password, ...rest } = updatedUser._doc

//         res.status(200).json(updatedUser, rest);
//         // res.status(201).json(rest)
//     } catch (error) {
//         console.log("error in update profile:", error);
//         res.status(500).json({ message: "Internal server error" });
//         next(error)
//     }
// };



// export const DeleteAccount = async (req, res, next) => {

//     if (req.user.id === req.params.id)
//         // {
//         return next(errorHandler(400, "You can only delete your own account when LogIn.."))

//     // }
//     try {
//         await User.findByIdAndDelete(req.params.id)
//         res.clearCookie("jwt", "access_token", { maxAge: 0 })
//         res.status(200).json({ message: "User been deleted 😭😭😭😭!!!" })

//     } catch (error) {
//         next(error)


//     }
// }

export const updateProfile = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account!'));
    }

    try {
        const { profilePic, username, email, password } = req.body;
        const userId = req.user._id;

        // Validate required fields
        if (!username || !email || (password && password.length < 6)) {
            return res.status(400).json({ message: "All fields are required and password must be at least 6 characters" });
        }
        console.log(userId)

        // Hash password if provided
        if (password) {
            req.body.password = bcryptjs.hashSync(password, 10);
        }

        // Upload profile picture to Cloudinary if present
        let uploadedProfilePic = req.body.profilePic;
        if (profilePic) {
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            uploadedProfilePic = uploadResponse.secure_url; // Get the secure URL from Cloudinary
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username,
                    email,
                    password: req.body.password,
                    profilePic: uploadedProfilePic
                }
            },
            { new: true } // To return the updated document
        );

        // Remove password field from response
        const { password: _, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        console.log("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
        next(error);
    }
};

export const DeleteAccount = async (req, res, next) => {
    // Ensure user can only delete their own account
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only delete your own account..😭😭😭😭'));
    }

    try {
        // Delete user account from database
        await User.findByIdAndDelete(req.params.id);

        // Clear authentication cookies (JWT token)
        res.clearCookie('access_token');

        // Send success response
        res.status(200).json({ message: "User has been deleted 😭😭😭😭!!!" });
    } catch (error) {
        // Handle any potential errors
        console.error("Error deleting account:", error);
        next(error); // Pass error to error handler middleware
    }
};
