import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [passwordState, setPasswordState] = useState('password')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);

        if (isEmailValid && password.length != 0) {
            try {
                const res = await axios.post(import.meta.env.VITE_API_URL + "/login", { email, password });
                localStorage.setItem('userId', res?.data?.userId)
                alert("Click ok to continue");
                navigate('/dashboard', { replace: true });
            } catch (error) {
                console.error(error.response?.data?.message || "Something went wrong")
                alert(error.response?.data?.message || "Something went wrong")
            }
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (userId) navigate('/dashboard', { replace: true })
    }, [])

    return (
        <div className='move-to-center'>
            <h1 className='display-4 fw-bold'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className='register-inputs' type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='password-container'>
                    <label htmlFor="password">Password</label>
                    <input className='register-inputs' type={passwordState} id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className='eye'>
                        {
                            passwordState == "password" ?
                                <i className="bi bi-eye p-2" onClick={() => setPasswordState("text")}></i> :
                                <i className="bi bi-eye-slash p-2" onClick={() => setPasswordState("password")}></i>
                        }
                    </div>
                </div>
                <button className='btn btn-success'>Login</button>
                <p>
                    Don't have an account? <Link className='text-decoration-none' to={'/'}>Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login