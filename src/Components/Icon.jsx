import * as Icons from "lucide-react"

export default function Icon({name,...props}){
    const Ic=Icons[name];
    console.log(Icons,{...props})
    if(!Ic) return <span>?</span>
    return <Ic {...props} />
}