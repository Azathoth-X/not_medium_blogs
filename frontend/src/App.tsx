import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Blogs } from "./pages/Blogs"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Blog } from "./pages/Blog"
import { NewBlog } from "./pages/NewBlog"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="blog/:blogid" element={<Blog/>}/>
          <Route path="blogs" element={<Blogs/>}></Route>
          <Route path="signin" element={<Signin/>}></Route>
          <Route path="signup" element={<Signup/>}></Route>
          <Route path="create" element={<NewBlog/>}></Route>
        </Routes>
      </BrowserRouter>
   </>
  )
}

export default App
