import {Link} from "react-router-dom"
import {signUpInput} from "@azath0th_28/not_medium_types/dist"
import { useState } from "react"
import axios from "axios"


export const Auth = () => {

    const [postInputs,setPostInputs]=useState<signUpInput>({
        email:"",
        name:"",
        password:"",
    })
    
    // async function submitInputs(inputs:signUpInput){
        
    //     axios.post()
    // }

    return (
        <div className=" content-center h-screen">
            <div className="justify-self-center p-8">
                <div className="max-w-lg">
                    <div className="text-3xl font-serif font-bold mb-6">
                        Create an account
                    </div>
                    
                    <div className="mt-4">
                        <label className="text-sm font-semibold text-slate-600">Name</label>
                        <input 
                            className="w-full p-2 rounded-md mt-1 shadow-lg"
                            type="text"
                            placeholder="Enter your username"
                            value={postInputs.name}
                            onChange={(e)=>{
                                setPostInputs({
                                    ...postInputs,
                                    name:e.target.value
                                })
                            }}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="text-sm font-semibold text-slate-600">Email</label>
                        <input 
                            className="w-full p-2 rounded-md mt-1 shadow-lg"
                            type="email"
                            placeholder="m@example.com"
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
                        // onClick={}
                    >
                        Sign Up
                    </button>

                    <div className="mt-4 text-sm text-slate-600 text-center">
                        Already have an account? <Link className="text-slate-800 hover:underline" to={'/login'}>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}