import Navbar from './Navbar'
import DisplayText from './DisplayText'
import TodoContainer from './TodoContainer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        async function getTodos() {
            const userId = localStorage.getItem('userId')
            if (!userId) navigate('/login')
            const res = await axios.get(import.meta.env.VITE_API_URL + "/get-todos", {
                params: {
                    userId
                }
            })

            if (!res?.data) localStorage.clear()

            setUser(res?.data)
        }
        getTodos()
    }, [])

    if (!user) return

    return (
        <>
            <Navbar email={user.email} />
            <DisplayText userName={user.name} />
            <TodoContainer />
        </>
    )
}

export default Home