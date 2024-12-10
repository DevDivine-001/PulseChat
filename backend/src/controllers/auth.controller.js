// import express from "express"
// import mongoose from "mongoose"
import cors from 'cors'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"


export const SignIn = (req, res) => {

    try {

    } catch (error) {

    }

}

export const LogIn = (req, res) => {

    try {

    } catch (error) {

    }
}

export const LogOut = (req, res) => {

    try {
        res.cookie("jwt", "access_token", { maxAge: 0 })
        res.status(200).json({ message: "User has been LogOut successfully" })

    } catch (error) {
        console.log(error.message, "Error in logout the User")
        res.status(500).json({ message: "Internal Server Error" })

    }
}
