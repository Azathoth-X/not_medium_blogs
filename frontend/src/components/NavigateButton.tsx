import { useNavigate } from "react-router-dom"

export default function NavigateButton(
    {
        text,
        navigateRoute
    }:{
        text: string,
        navigateRoute:string,
    }
){
    const router = useNavigate()
    return(
            <button className="border-1 rounded-xl bg-sky-100 hover:bg-sky-50 p-1 px-3 font-semibold cursor-pointer"
                    onClick={()=>{router(navigateRoute)}}>
            {text}
            </button>
    )
}
