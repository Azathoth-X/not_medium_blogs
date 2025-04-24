

interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
}

export const BlogCard = (Blog:BlogCardProps)=>{

    return (
        <div className="border-b m-2 min-w-xl">
            <div className="flex">

                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-slate-300 rounded-full ">
                    <span className="font-medium text-slate-600 ">{Blog.authorName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="content-center px-2">
                    {Blog.authorName}.       {Blog.publishedDate}
                </div>

            </div>

            <div className="text-xl font-bold font-serif ">
                {Blog.title}
            </div>

            <div className="text-md mt-2 font-thin">
                {Blog.content.slice(0,100)}...
            </div>

            <div className="text-sm my-2 font-thin">
                {`${Math.ceil(Blog.content.length/100)} minutes`}
            </div>
        </div>
    )
}