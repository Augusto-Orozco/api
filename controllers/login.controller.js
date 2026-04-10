import User from "../models/users.model.js"

export const login = async (req, res) => {
    const {username, password} = req.body
    const user = await User.find({username, password})
    if (user.password === password) {
        res.json({login: true,msg: "Login successful", user:user})
    } else {
        res.status(404).json({login: false, msg: "worng", user:{}})
    }
}