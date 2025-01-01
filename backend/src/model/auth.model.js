import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true

    },
    username: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        validate: {
            validator: function (value) {
                const fakeDomains = ["tempmail.com", "10minutemail.com", "mailinator.com"];
                const domain = value.split('@')[1];
                return !fakeDomains.includes(domain);
            },
            message: "Please use a real email address, not a disposable one."
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6

    },
    profilePic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        // required: true
    }
}, { timeseries: true })

const User = mongoose.model("User", userSchema)

export default User