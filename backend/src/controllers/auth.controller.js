import bcryptjs from 'bcryptjs'
import User from '../model/auth.model.js'
import { TokenCode } from '../Database/utils.js'
import cloudinary from '../Database/cloudinary.js';


export const SignUp = async (req, res) => {
    const {
        fullname, username, email, password, } = req.body;

    try {
        if (!fullname || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ username, email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            fullname: fullname,
            username: username,
            email: email,
            // profilePic,
            password: hashedPassword,
        });

        await newUser.save();
        TokenCode(newUser._id, res);

        res.status(201).json({
            message: "User has been created successfully",
        });
    } catch (error) {
        console.error("Error in SignIn controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const LogIn = async (req, res) => {
    const { username, email, password, } = req.body

    try {

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Email,username and password are required" });
        }

        const user = await User.findOne({ username, email, })
        if (!user) {
            return res.status(400).json({ message: "Invalid credent" })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid credent" })
        }

        TokenCode(user._id, res)
        res.status(200).json({
            _id: user._id,
            // username: user.username,
            // email: user.email,
            message: "User Logged in successfully"

        })

    } catch (error) {
        console.log(error.message, "Error in Login the User")
        res.status(500).json({ message: "Internal Server Error" })

    }
}

export const LogOut = (req, res) => {

    try {
        res.clearCookie("jwt", "access_token", { maxAge: 0 })
        res.status(200).json({ message: "User has been Logged out successfully" })

    } catch (error) {
        console.log(error.message, "Error in logout the User")
        res.status(500).json({ message: "Internal Server Error" })

    }
}


export const CheckAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in CheckAuth User")
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateProfile = async (req, res, next) => {

    try {

        // if (req.user.id !== req.params.id) {
        //     return next(errorHandler(401, 'You can only update your own account! When you are login ..'));
        // }
        const { profilePic, username, email, password } = req.body;
        const userId = req.user._id;

        // if (!profilePic || !username || !email || !password) {
        //     return res.status(400).json({ message: "Profile pic is required" });
        // }

        if (password && password.length < 6) {
            return res.status(400).json({ message: "Your Password must be at least 6 characters long." })

        }
        const updates = { username, email, password }

        if (password && password.length < 6) {
            updates.password = bcryptjs.hashSync(password, 10)

        }


        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updates.profilePic = uploadResponse.secure_url
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const { password: _, ...rest } = updatedUser._doc

        res.status(200).json({
            message: "Profile updated successfully!",
            user: rest,
        });
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// export const updateProfile = async (req, res) => {
//     try {
//         const { profilePic } = req.body;
//         const userId = req.user._id;

//         if (!profilePic) {
//             return res.status(400).json({ message: "Profile pic is required" });
//         }

//         const uploadResponse = await cloudinary.uploader.upload(profilePic);
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { profilePic: uploadResponse.secure_url },
//             { new: true }
//         );

//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.log("error in update profile:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
