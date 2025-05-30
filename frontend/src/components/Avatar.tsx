export function Avatar(
    {
        name,
        size
    }:{
        name: string,
        size: number,
    }
){
    const pixelSize = size * 4; // Assuming size is a multiple of 4, like Tailwind's spacing scale

    return(
        <div>
            <div className="relative inline-flex items-center justify-center overflow-hidden bg-slate-300 rounded-full" style={{width: `${pixelSize}px`, height: `${pixelSize}px`}}>
                <span className="font-medium text-slate-600 ">{name.charAt(0).toUpperCase()}</span>
            </div>
        </div>
    )
}