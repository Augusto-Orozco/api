import User from "../models/users.model.js"
import {hashPassword} from "../utils/hash.js"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username:username})
    if (!user) {
        return res.status(404).json({login:false, msg:"user not found", user:{}, token:""})
    }
    const saltSize = parseInt(process.env.SALT_SIZE) || 16
    const salt = user.password.substring(0, saltSize)
    const hashed = hashPassword(password, salt)
    
    if (user && user.password === hashed){
        const token = jwt.sign({sub:user._id}, process.env.JWT, {expiresIn:"1h"})
        res.json({login:true, msg:"ok", user:user, token:token})
    }
    else {
        res.status(404).json({login:false, msg:"wrong", user:{}, token:""})
    }
}