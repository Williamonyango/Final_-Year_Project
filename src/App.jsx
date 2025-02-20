
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Login from './Components/Pages/Login'


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
