import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { LoadingBlogCard } from "../components/LoadingBlogCard"
import { useBlogs } from "../hooks/useBlogs"

export const Blogs=()=>{

    const {blogs,loading}=useBlogs()

    if (loading){
        return(
            <div>
            <Appbar username="Aasfoiu"/>
                <div className="justify-items-center pt-8">
                    <LoadingBlogCard/>
                    <LoadingBlogCard/>
                    <LoadingBlogCard/>
                    <LoadingBlogCard/>
                </div>
            </div>
        )
    }

    else{
    return(
        <div>
            <Appbar username="Aasfoiu"/>
        <div className="justify-items-center pt-8">
            {blogs.map((b)=>(
                <BlogCard 
                authorName={b.author.name||"AAi"} 
                title= {b.title}
                content={b.content}
                publishedDate="25 Dec 2025"
                />
            ))}
            
        </div>
       </div>
    )
}
}