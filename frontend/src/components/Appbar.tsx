import { jwtDecode } from "jwt-decode"
import { Avatar } from "./Avatar"
import NavigateButton from "./NavigateButton"
import { Link, useLocation } from "react-router-dom"

interface CustomJWTPayload{
    id : string,
    username : string
}

 export const Appbar= () => {

    const jwt = localStorage.getItem("token")
    const location = useLocation()
    const isCreateBlog = location.pathname ==="/create"?true:false

    if(jwt){

        const decodedToken = jwtDecode<CustomJWTPayload>(jwt)
        const username = decodedToken.username 
        return (
            <div className="flex  justify-between px-5 py-3 border-2 border-s-2">
                <Link className="text-2xl font-bold" to="/blogs">
                    Mid-Yum
                </Link>
                
               <div className="flex gap-4 justify-between">
                {!isCreateBlog&&
                <NavigateButton text="Create Blog" navigateRoute="/create"/>
                }
                <div className="flex gap-2 ">
                    <Avatar name={username} size={8} isDropDown={true}>
                    </Avatar>
                    <div className="text-lg content-center font-semibold ">
                        {username}
                    </div>
                </div>
                </div> 

            </div>
        )
    }
    else{
        return(
            <div className="flex  justify-between px-5 py-3 border-2 border-s-2">
                <div className="text-2xl font-bold">
                    Mid-Yum
                </div>
                
                <NavigateButton text="Sign In" navigateRoute="/signin"/>
            </div>
        )
    }

        
}