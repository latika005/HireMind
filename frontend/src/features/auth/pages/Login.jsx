import "../auth.form.scss";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import { useState } from "react";

const Login = () => {

    const navigate = useNavigate();

    const { loading, handleLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({email, password})
        navigate("/main");
    }

    if(loading){
        return (
            <main>
                <h1>Loading .....</h1>
            </main>
        )
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <div className="form-header">
                    <h1>Welcome Back</h1>
                    <p>Login to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                        onChange={
                            (e) => {
                                setEmail(e.target.value)
                            }
                        }
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }
                        }
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                    </div>



                    <button type="submit" className="button primary-button">
                        Login
                    </button>
                </form>

                <p className="signup-text">
                    Don't have an account? 
                    <span 
                    onClick={() => {
                        navigate("/")
                    }}
                    >Sign up</span>
                </p>
            </div>
        </main>
    );
};

export default Login;