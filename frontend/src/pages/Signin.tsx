import { Login } from "../components/Login"
import { Quote } from "../components/Quote"

export const Signin =()=>{
    return(
        <div className="md:grid md:grid-cols-2">
            <Login/>
            <div className="invisible md:visible">
                <Quote/>
            </div>
        </div>
    )
}