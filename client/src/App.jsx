import { BrowserRouter, Routes,Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import Register from './Pages/Register'
import Login from "./Pages/Login"
import CreatePost from "./Pages/CreatePost"
import PostDesc from "./Pages/PostDesc"
import { UserProvider } from "./utils/UserContext"



function App() {
  

  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<LandingPage/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/create" element={<CreatePost/>}/>
          {/* <Route path = "/posts/:id" element={<PostDesc/>}/> */}
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
