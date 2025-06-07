import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { Backend_url as Backend_url } from "../config";

export function NewBlog(){
    const [title,setTitle] = useState<string>("")
    const [content,setContent] = useState<string>("")
      async function submitBlog(){
        const newBlogData = {
            title : title,
            content : content,
        }
        console.log(newBlogData);
        try {
            const response = await axios.post(`${Backend_url}/blog`, newBlogData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            console.log("Response:", response);
            
            // Check if response has blog ID
            if (response.data && response.data.id) {
                window.location.href = `/blog/${response.data.id}`;
            }
        } catch (error) {
            console.error("Error submitting blog:", error);
        }
    }
    
    return(
        <div>
            <Appbar />
            <div className="flex flex-col gap-2 p-8 justify-center items-center">
                <span className="text-xl font-bold md:w-xl min-w-sm text-left">Title</span>
                <input 
                    type="text" 
                    className="md:w-xl min-w-sm rounded-md shadow-sm focus:shadow-md border-1 px-2 py-1 font-semibold"
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                    ></input>
                <span className="text-xl font-bold md:w-xl min-w-sm text-left">Content</span>                
                <textarea 
                    className="md:w-xl min-w-sm rounded-md shadow-sm focus:shadow-md border-1 p-2 py-1 font-semibold min-h-[400px] resize-y"
                    value={content}
                    onChange={(e)=>{console.log(content);setContent(e.target.value)}}
                    ></textarea>   
                <button 
                    className="mt-2 rounded-md cursor-pointer px-4 py-2 bg-slate-300 hover:bg-slate-200 text-black w-30 font-bold border-1 hover:shadow-md"
                    onClick={submitBlog}>Submit</button>
            </div>
        </div>
    )
}