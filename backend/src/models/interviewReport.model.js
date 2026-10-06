const mongoose = require("mongoose");

/**
 * - job description schema : String
 * - resume text : String
 * - self-description : String
 * 
 * -- matchScore : Number 
 * 
 * - Technical Questions : [{
 *                              question : "" ,
 *                              intent : "",
 *                              answer : ""
 *                         },
 *                         {
 *                              question : "" ,
 *                              intent : "",
 *                              answer : ""
 *                         },
 *                         ]
 * - Behavioral Questions: [{
 *                             question : "",
 *                             intention : "",
 *                             answer : ""
 *                          },
 *                          {
 *                             question : "",
 *                             intention : "",
 *                             answer : ""
 *                          }
 *                         ]
 * - Skill Gaps : [{
 *                  skill : "",
 *                  severity : {
 *                               type : String,
 *                               enum : ["low", "medium", "high"]
 *                             }
 *                }]
 * - Preparation Plan : [{
 *                          day : Number,
 *                          focus : String,
 *                          tasks : ["" , "" , ""]
 *                      }]
 * 
 */
const technicalQuestionsSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Technical question is required"]
    },
    intention : {
        type : String,
        required : [true, "Intention are required"],
    },
    answer : {
        type : String,
        required : [true, "Answer is required"]
    }
}, {
    _id : false
})

const behavioralQuestionsSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Behavioral question is required"]
    },
    intention : {
        type : String,
        required : [true, "Intention are required"],
    },
    answer : {
        type : String,
        required : [true, "Answer is required"]
    }
}, {
    _id : false
})

const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true, "Skill is required"]
    },
    severity : {
        type : String,
        enum : ["low", "medium", "high"],
        required : [true, "Severity is required"]
    }
}, {
    _id : false
})

const preparationSchema = new mongoose.Schema({
    day : {
        type : Number,
        required : [true, "Day is required"],
    },
    focus : {
        type : String,
        required : [true, "Focus is required"]
    },
    tasks : [{
        type : String,
        required : [true, "Task is required"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required:  [true, "Job Description is required"]
    },
    resume : {
        type : String
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100
    },
    technicalQuestions : [ technicalQuestionsSchema ],
    behavioralQuestions : [ behavioralQuestionsSchema ],
    skillGaps : [ skillGapSchema ],
    preparationPlan : [ preparationSchema ],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title : {
        required : [true, "Title is required"],
        type : String
    }
})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema);

module.exports = interviewReportModel;