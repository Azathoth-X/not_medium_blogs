import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Blogs } from "./pages/Blogs"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Blog } from "./pages/Blog"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="blog/:blogid" element={<Blog/>}/>
          <Route path="blogs" element={<Blogs/>}></Route>
          <Route path="signin" element={<Signin/>}></Route>
          <Route path="signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
   </>
  )
}

export default App
