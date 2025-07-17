import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import './styles/Responsive.css'
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Home />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App