/*
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../module/userModel.js";


export const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.status(400).json({
                success: false,
                message: "incorrect password"
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
       
        if (user.role === "admin") {
            return res.status(200).json({
                success: true,
                message: "Admin logged in successfully",
                data:{
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token
                }
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data:{
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token
                }
            });
        }
       
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message  || "Internal server error"
        });
    }
}

*/




import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../module/userModel.js";



//LOGIN PAGE
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
          
        });

        if (user.role === "admin") {
            return res.status(201).json({
                success: true,
                message: "Admin register successfully",
                token,
                admin: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: "admin"
                }
            })
        } else {
            return res.status(201).json({
                success: true,
                message: "User login Successfully",
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: "user"
                }
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
