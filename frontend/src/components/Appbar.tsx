import { Avatar } from "./Avatar"


 export const Appbar= ( {username}:{username:string} ) => {

    return (
        <div className="flex  justify-between px-5 py-3 border-2 border-s-2">
            <div className="text-2xl font-bold">
                Mid-Yum
            </div>
            
            <div className="flex gap-2 ">
                <Avatar name={username} size={8}>
                </Avatar>
                <div className="text-lg content-center font-semibold ">
                    {username}
                </div>
            </div>

        </div>
    )
}