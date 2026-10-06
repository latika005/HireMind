const {PDFParse} = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service.js");
const interviewReportModel = require("../models/interviewReport.model.js");


/**
 * 
 * @description Controller to generate interview report based on user self-description, resume and job-description
 */
async function generateInterviewReportController(req, res){

   const parser = new PDFParse({
    data: req.file.buffer
   });

   const result = await parser.getText();

   const resumeContent = result.text;

   await parser.destroy();

    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume : resumeContent,
        selfDescription,
        jobDescription
    })

    let interviewReport = await interviewReportModel.create({
        user : req.user.id,
        resume : resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    return res.status(201).json({
    message : "Interview report generated successfully",
    interviewReport 
    })
}

/**
 * 
 */
async function getInterviewByIdController(req, res){

    const interviewId = req.params;

    const interviewReport = await interviewReportModel.findOne({
        _id : interviewId,
        user : req.user.id
    })

    if(!interviewReport){
        return res.status(404).json({
            message : "Interview report fetched successfully"
        })
    }

    res.status(200).json({
        message : "Interview report fetched successfully.",
        interviewReport
    })
}

/**
 * @description Controller to get all interview reports of logged-in user.
 */
async function getAllInterviewReportsController(req, res){
    const interviewReports = await interviewReportModel.find({ user : req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -updatedAt -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
        message  : "Interview reports fetched successfully.",
        interviewReports
    })
}

module.exports = {
    generateInterviewReportController,
    getInterviewByIdController,
    getAllInterviewReportsController
}