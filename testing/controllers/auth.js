import User from "../models/user.js";

export const signup = async (req, res) => {
    console.log("req.body", req.body);


    const user = new User(req.body);
    try {
        const userData = await user.save();
        res.status(201).json({
            message: "User created",
            user: userData
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
