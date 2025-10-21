export default function CompanyInfo(){
        const note="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus libero velit ratione consectetur, minus tempora qui. Expedita quis omnis aspernatur deleniti inventore cupiditate ipsa perferendis dignissimos beatae vero! Nemo.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus libero velit ratione consectetur, minus tempora qui. Expedita quis omnis aspernatur deleniti inventore cupiditate ipsa perferendis dignissimos beatae vero! Nemo.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus libero velit ratione consectetur, minus tempora qui. Expedita quis omnis aspernatur deleniti inventore cupiditate ipsa perferendis dignissimos beatae vero! Nemo."
    return (
        <div className="flex flex-col w-full p-8 gap-2.5 ">
                
                <p className="text-xl font-semibold">Company Info</p>
                <hr className="opacity-5"/>
                <div id="left" className="flex  flex-1 gap-5  justify-between items-center  ">
                
                
                        <div className="flex-1 flex flex-col gap-2">
                                <p>Company Name <span className="text-red-500">*</span></p>
                                <input className="py-1.5 px-3.5 placeholder:text-sm placeholder:font-semibold border rounded-md border-gray-100" type="text" name="CompanyName" id="CMN" placeholder="My company" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                                <p>Company Website <span className="text-red-500">*</span></p>
                                <div className="flex  text-gray-700 px-3.5 border border-gray-100 items-center  justify-between gap-1.5  rounded-md">
                                        <input className="py-1.5 flex-1  placeholder:text-sm placeholder:font-semibold  border-gray-100" type="text" name="CompanyName" id="CMN" placeholder="www.website.com" />
                                        <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                                </div>
                        </div>  
                        
                </div>
                <div id="left" className="flex  flex-1 gap-4  justify-between items-center  ">
                        <div className="w-1/2 flex flex-col gap-2">
                                <p>Contact Number <span className="text-red-500">*</span></p>
                                <div className="flex gap-2 ">
                                        <div className="flex text-gray-700 w-2/7 px-2 border border-gray-100 items-center justify-between   rounded-md">
                                                <input className="py-1.5 w-8  placeholder:text-sm placeholder:font-semibold  border-gray-100" type="text" name="CompanyName" id="CMN" placeholder="+251" />
                                                <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                                        </div>
                                        <input className="py-1.5 px-3.5 w-4/5 placeholder:text-sm placeholder:font-semibold border rounded-md border-gray-100" type="number" name="CompanyName" id="CMN" placeholder="972334145" />
                                </div>
                        </div>
                        <div className="w-1/2 flex flex-col gap-2">
                                <p>Contact Email <span className="text-red-500">*</span></p>
                                <div className="flex  text-gray-700 px-3.5 border border-gray-100 items-center  justify-between gap-1.5  rounded-md">
                                        <input className="py-1.5 flex-1  placeholder:text-sm placeholder:font-semibold  border-gray-100" type="text" name="CompanyName" id="CMN" placeholder="et8302tn@gmail.com" />
                                        <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                                </div>
                        </div>  
                        
                </div>
                <div className="flex-1 flex flex-col gap-2">
                        <p>Company Name <span className="text-red-500">*</span></p>
                        <textarea className="py-1.5 px-3.5 h-34 placeholder:text-sm placeholder:font-semibold border rounded-md border-gray-100" type="text" name="CompanyName" id="CMN" placeholder={note} />
                </div>
                <div className="flex flex-1 bg-slate-800 text-white items-center w-fit  justify-start gap-1.5 px-5 py-3 rounded-md">
                       <p className="text-xs font-semibold">Save</p>
                </div>


        </div>
    )
}