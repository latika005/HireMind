import "../style/home.scss";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview.js";
import { useState, useRef } from "react";
import Navbar from "../../auth/components/Navbar.jsx";

const Home = () => {
    
    let navigate = useNavigate();

    const { loading, generateReport } = useInterview();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");

    const resumeInputRef = useRef();

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0];
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        console.log(data._id)
        navigate(`/main/interview/${data._id}`);
    }

    if(loading){
        return (
            <main className="loading-screen">
                <h1>Loading your interview plan......</h1>
            </main>
        )
    }

    return (
        <main className="home">
           <Navbar/>
            <header className="home-header">
                <h1>
                    Turn any <span className="highlight">Job Description</span> & <span className="highlight">Resume</span> into an Unbeatable Interview Playbook
                </h1>
                <p>Paste the role, add your background, and get a tailored prep report in seconds.</p>
            </header>
            <div className="interview-input-group">
                <div className="left">
                <p>Job Description</p>
                <textarea
                 onChange={(e) => {
                    setJobDescription(e.target.value)
                 }}
                 name="jobDescription" id="jobDescription" placeholder="Enter the Job Description"></textarea>
            </div>
            <div className="right">
                <div className="input-group">
                    <p>Resume <small className="highlight">( Use Resume and self-description tgether for best results )</small></p>
                    <label className="file-label" htmlFor="resume">Upload Resume</label>
                    <input ref={resumeInputRef} hidden type="file" name="resume" id="resume" accept=".pdf"/>
                </div>
                <div className="input-group">
                    <p className="selfDescription">Self Description</p>
                    <textarea
                     onChange={(e) => {
                        setSelfDescription(e.target.value);
                     }}
                     name="selfDescription" id="selfDescription" placeholder="Enter details about yourself"></textarea>
                </div>
                <button 
                 onClick={() => {handleGenerateReport()}}
                className="generate-btn">Generate Interview Report</button>
            </div>
            </div>
        </main>
    )
}

export default Home;