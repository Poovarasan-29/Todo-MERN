import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ email }) => {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <nav>
            <div>
                <p className="m-0" style={{ color: 'rgba(255,255,255,0.8)' }}>{email}</p>
                <button className="btn btn-danger logout-btn" onClick={handleLogout}><i className="bi bi-box-arrow-right fs-5"></i></button>
            </div>
        </nav>
    )
}

export default Navbar