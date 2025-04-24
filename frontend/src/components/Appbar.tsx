

 export const Appbar= ( {username}:{username:string} ) => {

    return (
        <div className="flex w-screen justify-between px-5 py-3 border-2 border-s-2">
            <div className="text-2xl font-bold">
                Mid-Yum
            </div>
            
            <div className="flex gap-2 ">
                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-slate-300 rounded-full ">
                    <span className="font-medium text-slate-600 ">{username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="text-lg content-center font-semibold ">
                    {username}
                </div>
            </div>

        </div>
    )
}