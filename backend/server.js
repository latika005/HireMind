const app = require("./src/app/app.js");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./src/config/db.js")
// const generateInterviewReport = require("./src/services/ai.service.js");
// const { resume, selfDescription, jobDescription } = require("./src/services/temp.js");

// We're configuring Node.js's DNS resolver to use two public DNS servers:  ( 1.1.1.1  ---> Cloudflare )  ( 8.8.8.8 ---> Google )
// These servers resolve domain names, including MongoDB Atlas SRV records.
// These servers resolve domain names, including MongoDB Atlas SRV records.
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"])


connectDB();

// generateInterviewReport({
//     resume,
//     selfDescription,
//     jobDescription
// });

// console.log("Server is running...")


app.listen(process.env.PORT, () => {
    console.log(`Server running ${process.env.PORT}`)
})