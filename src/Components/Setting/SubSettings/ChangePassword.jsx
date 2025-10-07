export default function ChangePassword(){
        const note="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus libero velit ratione consectetur, minus tempora qui. Expedita quis omnis aspernatur deleniti inventore cupiditate ipsa perferendis dignissimos beatae vero! Nemo.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus libero velit ratione consectetur, minus tempora qui. Expedita quis omnis aspernatur deleniti inventore cupiditate ipsa perferendis dignissimos beatae vero! Nemo.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus libero velit ratione consectetur, minus tempora qui. Expedita quis omnis aspernatur deleniti inventore cupiditate ipsa perferendis dignissimos beatae vero! Nemo."
    return (
        <div className="flex flex-col w-full p-8 gap-5 ">
                
                <p className="text-xl font-semibold">Change Password</p>
                <hr className="opacity-5"/>
                <div id="left" className="flex flex-col  flex-1 gap-5  w-full items-center  ">
                
                
                        <div className="flex-1 w-full flex flex-col gap-2">
                                <p>Company Name <span className="text-red-500">*</span></p>
                                <input className="py-1.5 px-3.5 placeholder:text-sm placeholder:font-semibold border rounded-md border-gray-100" type="text" name="CompanyName" id="CMN" placeholder="*****************" />
                        </div>
                        <div className="flex-1 w-full flex flex-col gap-2">
                                <p>Company Name <span className="text-red-500">*</span></p>
                                <input className="py-1.5 px-3.5 placeholder:text-sm placeholder:font-semibold border rounded-md border-gray-100" type="text" name="CompanyName" id="CMN" placeholder="*****************" />
                        </div>
                        <div className="flex-1 w-full flex flex-col gap-2">
                                <p>Company Name <span className="text-red-500">*</span></p>
                                <input className="py-1.5 px-3.5 placeholder:text-sm placeholder:font-semibold border rounded-md border-gray-100" type="text" name="CompanyName" id="CMN" placeholder="*****************" />
                        </div>
                        
                        
                        
                </div>
              
                <div className="flex flex-1 bg-slate-800 text-white items-center w-fit  justify-start gap-1.5 px-5 py-3 rounded-md">
                       <p className="text-xs font-semibold">Save</p>
                </div>


        </div>
    )
}