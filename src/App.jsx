
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Login from './Components/Pages/Login'
import PrivateRoute from './Components/Pages/PrivateRoute'
import LandingPage from './Components/Pages/LandingPage'


function App() {

  return (
    //     <>
    // <LandingPage />
    //     </>



    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/landingpage" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
