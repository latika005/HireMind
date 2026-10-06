import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Register = () => {

    const navigate = useNavigate();

    let { handleRegister , loading } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ username, email, password });
        navigate("/main");
    }

    if(loading){
        return ( <main><h1>Loading.......</h1></main> )
    }
    return (
        <main className="auth-page">
            <div className="form-container">
                <div className="form-header">
                    <h1>Create Account</h1>
                    <p>Register to get started</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="button primary-button"
                    >
                        Register
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <span 
                    onClick={() => {
                        navigate("/login")
                    }}
                    >Login</span>
                </p>
            </div>
        </main>
    );
};

export default Register;

