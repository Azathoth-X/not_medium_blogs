import axios from "axios"
import { useEffect, useState } from "react"
import { Backend_url as Backend_url } from "../config"

interface Blog {
    id: string,
    content: string,
    title: string,
    authorId: string,
    author: {
        name: string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${Backend_url}/blog`, {
            headers: {
                Authorization: "a " + localStorage.getItem("token")
            }
        })
        .then((res) => {
            setBlogs(res.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching blogs:", error)
            setLoading(false)
        })
    }, []) // Empty dependency array means this effect runs once on mount

    return { blogs, loading }
}


export const useBlog = ({id}:{id:string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlogs] = useState<Blog>({} as Blog)

    useEffect(() => {
        axios.get(`${Backend_url}/blog/${id}`, {
            headers: {
                Authorization: "a " + localStorage.getItem("token")
            }
        })
        .then((res) => {
            setBlogs(res.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching blogs:", error)
            setLoading(false)
        })
    }, [id]) // Added id as a dependency so it only reruns if id changes

    return { blog, loading }
}