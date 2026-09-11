import { User } from "../module/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const userRegister = async (req, res) => {
 try {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    if(password.length < 8){
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters",
        });
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashPassword
    });

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.status(200).json({
        success: true,
        message: "User registered successfully",
        data:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
   
 } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message
    });
 }
}