import { useNavigate, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/Avatar";
import { useBlog } from "../hooks/useBlogs";
import { useEffect } from "react";
import { LoadingBlog } from "../components/LoadingBlog";

export function Blog(){
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const { blogid } = useParams()
    
    // Use useEffect to handle navigation for missing blogid to avoid render issues
    useEffect(() => {
        if(!blogid) navigate("/notfound")
        if(!token)navigate("/signin")
    }, [blogid, navigate, token])
    
    // Use the hook
    const {blog, loading} = useBlog({id: blogid || ""})
    
    return(
       <div>
        <Appbar ></Appbar>
        { loading ? (
          <div className="flex p-8 items-left h-64 ">
            <LoadingBlog/>
          </div>
        ) : (
          blog && blog.title ? (
            <div className="grid grid-rows-9 md:grid-cols-4 p-8">
              <div className="row-span-8 md:col-span-3 flex flex-col gap-4 p-4 md:border-r-1 border-slate-400">
                <div>
                  <span className="text-4xl font-bold">{blog.title}</span>
                </div>
                <div className="text-lg whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>
              <div className="md:col-span-1 m-2 p-2 bg-slate-100 rounded-lg gap-2">
                <div className="flex gap-2 items-center p-4">
                  {blog.author && (
                    <>
                      <Avatar name={blog.author.name} size={8} />
                      <div>{blog.author.name}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Blog not found</div>
            </div>
          )
        )}
       </div> 
    )


}