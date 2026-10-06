const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

/**
 * @route POST
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route GET
 * @description Login an existing user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/route/logout
 * @description clear token from user-cookie and add token in the blacklist
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged-in user details
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser , authController.getMeController)


module.exports = authRouter;