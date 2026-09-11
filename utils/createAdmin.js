
import { User } from "../module/userModel.js";
import bcrypt from "bcrypt";
import "dotenv/config";


const createAdmin = async () => {
 try {
     const existingUser = await User.findOne({ role: "admin" });
     if(existingUser) return;

     const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

     const admin = await User.create({
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        role: "admin",
     });

     console.log("Admin created successfully");
 } catch (error) {
    return res.status(400).json({
        success: false,
        message: "Error creating admin",   
    })
 }
}

export default createAdmin