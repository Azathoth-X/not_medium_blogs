import {Link, useNavigate} from "react-router-dom"
import {signInInput} from "@azath0th_28/not_medium_types/dist"
import { useState } from "react"
import axios from "axios"
import { Backend_url } from "../config"

export const Login = () => {

    const navigate = useNavigate();

    const [postInputs,setPostInputs]=useState<signInInput>({
        email:"",
        password:"",
    })
    const [isLoginError,setIsLoginError] = useState(false)
    const [loginError,setLoginError] = useState("")

    
    async function submitInputs(){
        try{
            if(!postInputs.email || !postInputs.password) {
                setIsLoginError(true);
                setLoginError("Email or Password is empty")
                return;
            }
            if(!postInputs.email.includes("@")||postInputs.password.length<6) {
                setIsLoginError(true);
                setLoginError("Email format is invalid")
                return;
            }
            
            const response = await axios.post(`${Backend_url}/user/signin`,postInputs)

            if(response.status===411) {
                setIsLoginError(true);
                setLoginError("Email or password is invalid")
                return;
            }

            const jwt = response.data.jwt
            localStorage.setItem("token",jwt)
            setIsLoginError(false)
            navigate("/blogs")
        }catch{
            setIsLoginError(true)
        }
    }

    return (
        <div className=" content-center h-screen">
            <div className="justify-self-center p-8">
                <div className="max-w-lg">
                    <div className="text-3xl text-center font-serif font-bold mb-6">
                        Login
                    </div>
                    {isLoginError && (
                        <div className="bg-red-600  text-slate-200  text-sm font-serif font-semibold rounded-md w-full text-center p-2">
                            {loginError}
                        </div>
                    )}
                    
                    <div className="mt-4">
                        <label className="text-sm font-semibold text-slate-600">Email</label>
                        <input 
                            className="w-full p-2 rounded-md mt-1 shadow-lg"
                            type="email"
                            placeholder="example@email.com"
                            value={postInputs.email}
                            onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    email:e.target.value
                                })
                            }}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="text-sm font-semibold text-slate-600 ">Password</label>
                        <input 
                            className="w-full p-2 rounded-md mt-1 shadow-lg"
                            type="password"
                            placeholder="Enter your password"
                            value={postInputs.password}
                            onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    password:e.target.value
                                })
                            }}
                        />
                    </div>

                    <button 
                        className="w-full mt-6 bg-slate-800 text-white p-2 rounded-md hover:bg-slate-700"
                        onClick={submitInputs}
                    >
                        Sign In
                    </button>

                    <div className="mt-4 text-sm text-slate-600 text-center">
                        Don't have an account? <Link className="text-slate-800 hover:underline" to={'/signup'}>SignUp</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}