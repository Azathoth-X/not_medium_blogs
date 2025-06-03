import { useNavigate, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/Avatar";
// import { useBlog } from "../hooks/useBlogs";

export function Blog(){
    const navigate = useNavigate()
    const { blogid } = useParams()
    console.log(blogid)
    if(!blogid) navigate("/notfound")
    // const {blog,loading}= useBlog()
    const username= "eppe"

    return(
       <div>
        <Appbar username="keye"></Appbar>
        <div className="grid grid-rows-9 md:grid-cols-4 p-8 ">
            <div className="row-span-8 md:col-span-3 flex flex-col gap-4 p-4 md:border-r-1 border-slate-400">
                <div>
                    <span className="text-4xl font-bold">This is my blog</span>
                </div>
                <div className="text-lg whitespace-pre-wrap">
                    Lorem ipsum dolor sit amet, consectetur\n adipiscing elit. Nunc aliquet ante mattis, hendrerit ipsum sit amet, sagittis arcu. Nullam fermentum nunc sit amet ipsum bibendum, aliquam congue ligula ultricies. Aliquam erat volutpat. Ut ultricies mauris ut ligula pulvinar aliquet. Etiam vel ultricies elit. Fusce ut bibendum eros. Sed viverra tellus quis nunc iaculis, sodales semper velit facilisis. Quisque laoreet turpis ac neque fringilla condimentum. Suspendisse magna odio, blandit ut ex at, scelerisque egestas lorem.

Integer quis mauris erat. Etiam id sagittis sem, eu molestie purus. Proin id lorem maximus, luctus est id, consectetur velit. Cras ut elit sit amet libero consectetur feugiat quis a turpis. Quisque suscipit consectetur urna in eleifend. Proin malesuada, nisl sed dapibus vulputate, neque mi condimentum libero, nec mollis erat justo vel nulla. Donec sit amet consequat augue, sit amet mollis nisi. Quisque a ipsum efficitur, aliquam orci eget, sagittis tellus. Quisque rutrum interdum libero, sed eleifend lacus elementum ut. Sed sed viverra massa. Proin ut lacinia justo. Mauris fermentum ac sapien condimentum malesuada.

Quisque semper tortor non dui scelerisque egestas. Donec eu libero euismod, dapibus lacus eget, sollicitudin tellus. Quisque a lorem sodales, malesuada nisl eu, porttitor turpis. In ultricies enim ac ipsum vestibulum volutpat. Proin interdum eleifend egestas. Duis accumsan lectus ut nibh mollis, nec venenatis enim facilisis. Nullam et nisl sed libero dignissim eleifend at a ex. Nulla nec consectetur dui, sit amet facilisis metus. Suspendisse euismod aliquam orci euismod sagittis. Aenean tortor turpis, sodales a eros eget, accumsan porta lorem.

Pellentesque tincidunt felis quis gravida pellentesque. Ut venenatis aliquam diam eu vestibulum. Morbi convallis erat at elit commodo volutpat. Ut sed quam libero. Fusce molestie, massa eget dapibus bibendum, purus ex pulvinar tellus, non lobortis sem lacus quis diam. Nunc at felis pellentesque, rutrum leo at, congue erat. Ut faucibus sem sagittis, facilisis elit et, placerat justo. Sed consectetur imperdiet tellus sit amet accumsan. Etiam interdum finibus ligula, eu scelerisque risus commodo eget. Aenean libero metus, consequat tempor massa vel, ultrices posuere lorem. Sed vitae diam vel tortor feugiat dignissim nec id diam. Proin at sapien sit amet elit accumsan facilisis et ac risus. Cras tincidunt augue id ullamcorper ultrices. Donec rhoncus auctor elit, vel ultrices nibh molestie id.

Quisque maximus malesuada nisl, id viverra ex dictum non. Nulla eget mauris at ipsum iaculis elementum ac a metus. Morbi eget tortor libero. Donec facilisis massa a magna sodales aliquam. Nullam eu lacus in ipsum varius euismod mollis eu erat. Maecenas mollis ex nec tellus ullamcorper iaculis. Ut viverra magna bibendum purus laoreet, sed consectetur ipsum vulputate. 
                </div>
            </div>
            <div className="md:col-span-1 m-2 p-2 bg-slate-100 rounded-lg  gap-2">
                <div className="flex gap-2 items-center p-4">
                    <Avatar name={username} size={8}>
                    </Avatar>
                    <div>{username}</div>
                </div>
            </div>
        </div>
       </div> 
    )


}