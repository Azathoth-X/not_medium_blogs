import { useState } from "react";

export function Avatar(
    {
        name,
        size,
        isDropDown = false 
    }:{
        name: string,
        size: number,
        isDropDown?: boolean
    }
){
    const pixelSize = size * 4; // Assuming size is a multiple of 4, like Tailwind's spacing scale
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const clickFunc = ()=>{setIsOpen(!isOpen)}

    if(!isDropDown){
        return(
            <div>
                <div className="border-1 relative inline-flex items-center justify-center overflow-hidden bg-slate-300 rounded-full" style={{width: `${pixelSize}px`, height: `${pixelSize}px`}}>
                    <span className="font-medium text-slate-600 ">{name.charAt(0).toUpperCase()}</span>
                </div>
            </div>
        )

    }
    else{
        const logoutFunc = ()=>{
            localStorage.removeItem("token")
            location.reload()
        }
        return(
            <div className="relative cursor-pointer" onClick={clickFunc}>
                <div className="border-1 inline-flex items-center justify-center overflow-hidden bg-slate-300 rounded-full" style={{width: `${pixelSize}px`, height: `${pixelSize}px`}}>
                    <span className="font-medium text-slate-600 ">{name.charAt(0).toUpperCase()}</span>
                </div>
                <div className={`absolute transform -translate-x-1/2 left-1/2 mt-2 z-10 ${isOpen ? "block" : "hidden"}`}>
                    <div className="p-2 flex flex-col gap-1 border-2 rounded-md bg-slate-100 shadow-md " onClick={logoutFunc}>
                        <div className="m-1 p-1 text-sm font-semibold hover:bg-slate-200 rounded whitespace-nowrap">Log Out</div>
                    </div>
                </div>
            </div>
        )
    }
}