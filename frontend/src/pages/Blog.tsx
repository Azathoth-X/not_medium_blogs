import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blog=()=>{

    const {blogs,loading}=useBlogs()

    if (loading){
        return(
            <div>
            <Appbar username="Aasfoiu"/>
            <div className="justify-items-center">

                <div role="status" className="max-w-lg animate-pulse pt-8">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>

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