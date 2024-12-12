import bcryptjs from 'bcryptjs'
import User from '../model/auth.model.js'

export const SignIn = async (req, res) => {

    const { fullname, username, email, password, profilePic } = req.body

    try {

        if (!fullname || !username || !email || !password || !profilePic) {
            return new Error("All Fields are require")

        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const user = await User.findOne({ username, email })

        if (user) return res.status(400).json({ message: "User already exists" })

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            fullname, username, email: hashedPassword, profilePic,
            password: hashedPassword
        })


        if (newUser) {

        } else {
            res.status(400).json({ message: "Invalid user data" })

        }

        await newUser.save()


    } catch (error) {

    }

}

export const LogIn = async (req, res) => {
    const { username, email, password, } = req.body

    try {
        const newUser = await User.findOne({ username, email, })
        if (!newUser) {

        }

    } catch (error) {

    }
}

export const LogOut = (req, res) => {

    try {
        res.clearCookie("jwt", "access_token", { maxAge: 0 })
        res.status(200).json({ message: "User has been LogOut successfully" })

    } catch (error) {
        console.log(error.message, "Error in logout the User")
        res.status(500).json({ message: "Internal Server Error" })

    }
}
