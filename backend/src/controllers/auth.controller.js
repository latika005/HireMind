const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");

/**
 * @route POST /api/auth/register
 * @name registerUserController
 * @description Register a new user
 * @access Public
 */
async function registerUserController(req, res){

    let { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message : "Please provide username, email and password"
        })
    }

    let isUserExists = await userModel.findOne({
        $or: [{ username } , { email }]
    })

    if(isUserExists){
        return res.status(400).json({
            message : "User already exists"
        })
    }

    let hashedPassword = await bcrypt.hash(password, 10)

    let user = await userModel.create({
        username, 
        email,
        password : hashedPassword 
    })

    let token = await jwt.sign(
        { id : user._id, username : user.username },
        process.env.JWT_SECRET,
        { expiresIn : "1d" }
    )

    res.cookie("token", token);

    res.status(201).json({
        message : "User created successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        },
    })
}

/**
 * @route GET /api/auth/login
 * @name loginUserController
 * @description login a user, expects email ans password in the request-body
 * @access Public
 */
async function loginUserController(req, res){

    let { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message : "Fill the required fields"
        })
    }

    let user = await userModel.findOne({ email })

    if(!user){
        return res.status(400).json({
            message : "User not found"
        })
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    let token = await jwt.sign(
        { id : user._id, username : user.username },
        process.env.JWT_SECRET,
        { expiresIn : "1d" }
    )

    res.cookie("token" ,token);

    res.status(200).json({
        message : "User loggedin successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}

/**
 * @route GET /api/route/logout
 * @name logoutUserController
 * @description clear token from user-cookie and add token in the blacklist
 * @access Public
 */
async function logoutUserController(req, res){
    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token");

    res.status(200).json({
        message : "User logged out successfully"
    })
}
/**
 * 
 * @route
 * @name getmeController
 * @description get the current logged in user details, expects token in the request
 * @access Private
 */
async function getMeController(req, res){

    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message : "User details fetched successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })

}
module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
