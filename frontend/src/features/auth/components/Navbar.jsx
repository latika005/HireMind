import "./navbar.scss";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                Interview<span className="highlight">Playbook</span>
            </div>

            <div className="navbar-links">
                <Link to="/main" className="nav-link">Home</Link>
                <Link to="/main/interview/1" className="nav-link">Interview Report</Link>
            </div>

            <button className="navbar-cta">Get Started</button>
        </nav>
    )
}

export default Navbar;