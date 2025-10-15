import { useContext } from "react"
import { UserContext } from "../../App"

export default function Login(){
    const {darklight , setdarklight}=useContext(UserContext)
    console.log(darklight)
    return (
        <div className={`${darklight.Magic_Word}  flex-1 py-5 px-48 h-screen dark:bg-slate-800 bg-slate-100 w-full flex justify-center`}>
            <div className="flex h-full w-full bg-amber-700   bgx sm:flex-col lg:flex-row rounded shadow-sm"> 
                    <div id="image_div" className=" sm:hidden md:hidden lg:flex flex-col flex-1  ">
                        <img src="/pic/image.png" alt="hr" className="flex-3 overflow-hidden"/>
                        <div className="p-5 flex-1 border-t-4 border-green-600">
                            <p className="text-xs font-semibold">HR Dashboard</p>
                            <p className="text-4xl font-semibold py-2">Let's empower your employees today.</p>
                            <p className="text-xs text-gray-400">we help to complete all your conveyencing needs easily</p>
                        </div>
                    </div>
                    <div id="form_container" className="justify-center flex-1   flex flex-col p-8  bg-white text-black">
                        <form className="  flex-1 flex flex-col items-center p-7 " action="">
                            <div className=" flex flex-col justify-center  flex-1 w-full " >
                                    <p className="py-2 flex justify-center font-semibold">Login first to your account</p>
                                    <div className="py-2">
                                        <label className="w-full text-xs font-semibold " htmlFor="email">Email Address <span className="text-red-700">*</span></label>
                                        <input className="my-1 border border-gray-300 p-2 rounded w-full" type="email" name="email" id="email" placeholder="enter your name" />
                                    </div>
                                    <div className="py-2">
                                        <label className="w-full text-xs font-semibold" htmlFor="password">Password <span className="text-red-700">*</span></label>
                                        <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="password" name="password" id="password" placeholder="enter your password" />
                                        <p className="text-red-500 text-xs ">② The email you entered is not registered. pleasecheck again</p>

                                    </div>
                                    <div className="py-2 flex justify-between  w-full">
                                        <div className="flex items-center justify-center">
                                            <input className="" type="checkbox" name="remember me" id="rememberme" />
                                            <p className="px-2 text-xs text-gray-500 font-semibold" >Remember Me</p>
                                        </div>
                                        <p className="inline-flex text-xs text-gray-500 font-semibold">Forgot Password</p>
                                    </div>
                                    <div className="items-center justify-center bg-gray-100 inline-flex px-32 py-2.5 rounded-md text-sm font-semibold text-gray-500">Login</div>
                                    <div className="flex items-center gap-1.5 py-2">
                                        <hr className="flex-1 opacity-8" />
                                        <p className="py-2  flex justify-center text-gray-500 text-xs font-semibold">Or login with</p>
                                        <hr className="flex-1 opacity-8" />
                                    </div>
                                    <div id="Google_Apple" className="py-2 flex justify-evenly w-full">
                                            <div className="border inline-flex px-16 py-2  border-gray-300   rounded-md justify-center items-center">
                                                <img className="h-4" src="/svg/google-color-svgrepo-com.svg" alt="" />
                                                <p className="ml-2.5 text-sm font-semibold">Google</p>
                                            </div>
                                            <div className="border  border-gray-300  inline-flex px-16 py-2 rounded-md justify-center items-center"> 
                                                <img className="h-4" src="public\svg\apple-173-svgrepo-com.svg" alt="" />
                                                <p className="ml-2.5 text-sm font-semibold">Apple</p>
                                            </div>
                                    </div>
                                    <p className=" py-2 flex justify-center text-gray-500 text-xs">You're new in here?<span className="text-green-900 font-semibold">Create Account</span></p>
                            </div>
                            
                        </form>
                        <p className=" flex justify-center text-xs font-light text-gray-500">©20l5 HR Dashboard Alright required. <span className="font-semibold">Terms & Conditione Privacy Policy</span></p>
                    </div>
            </div>
        </div>
    )
}