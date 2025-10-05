import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import joi from "joi";
import jwt from "jsonwebtoken";

const registerSchema = joi.object({
    username:joi.string().required().max(30).min(3),
    email:joi.string().email().required(),
    password:joi.string().min(8).required(),
    role: joi.string().valid('user','admin').optional()
})
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password:joi.string().required()
})
export const login = async (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);

        if (error) return res.status(400).json({ message: error.details[0].message });

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        // JWT Payload: Username is correctly included here for the middleware
        const payload = { id: user._id, username: user.username, role: user.role };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        // FIX: Include the username in the JSON response body for the frontend client
        res.json({
            token,
            userId: user._id,
            username: user.username, // <--- ADDED USERNAME HERE
            role: user.role
        });
    } catch (e) {
        next(e);
    }
};


export const register = async (req,res,next)=>{
    try{
        const {error} = registerSchema.validate(req.body);

        if(error) return res.status(400).json({message:error.details[0].message});

        const {username , email,password , role} = req.body;

        const existingUser = await User.findOne({
            $or: [
                {email},
                {username}
            ]
        });

        if (existingUser) return res.status(400).json({message:"User already exist"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            username,
            email,
            password:hashedPassword,
            role
        })

        await user.save();

        res.status(201).json({message:"User saved successfully"});


    } catch (e){
        next(e)
    }

}
