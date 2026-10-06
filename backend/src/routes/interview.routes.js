const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const interviewController = require("../controllers/interview.controller.js");
const upload = require("../middlewares/file.middleware.js");
const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self-description
 * @access private 
 */

interviewRouter.post("/", authMiddleware.authUser , upload.single("resume") ,  interviewController.generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewByIdController)

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


module.exports = interviewRouter;

