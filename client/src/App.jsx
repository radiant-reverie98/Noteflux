import { BrowserRouter, Routes,Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import Register from './Pages/Register'
import Login from "./Pages/Login"
import CreatePost from "./Pages/CreatePost"



function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<LandingPage/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/create" element={<CreatePost/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
