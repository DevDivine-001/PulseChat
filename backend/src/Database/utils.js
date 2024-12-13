import jwt from "jsonwebtoken"

export const TokenCode = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.jwt_secret, { expiresIn: "2d" })
    res.cookie("jwt", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict",
        // CSRF Attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
    return token
}