import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup=()=>{
    return(
        <div className="md:grid md:grid-cols-2">
            <Auth/>
            <div className="invisible md:visible">
                <Quote/>
            </div>
        </div>
    )
}