const StepGeneral = ({ data , onChange }) => {
    const Personal_info=<div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">personal Info</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap  ">
                            <div className="w-96 flex gap-2   text-nowrap">
                                <p className="min-w-40 text-gray-400 ">First Name</p>
                                <input type="text" value={data.firstname} onChange={(e) => onChange({ firstname: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2   text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Last Name</p>
                                <input type="text" value={data.lastname} onChange={(e) => onChange({ lastname: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Gender</p>
                                <input type="text" value={data.gender} onChange={(e) => onChange({ gender: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Date of Birth</p>
                                <input type="date" value={data.dateofbirth} onChange={(e) => onChange({ dateofbirth: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Marital Status</p>
                                <input type="text" value={data.maritalstatus} onChange={(e) => onChange({ maritalstatus: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Nationality</p>
                                <input type="text" value={data.nationality} onChange={(e) => onChange({ nationality: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />  
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Personal TaxID</p>
                                <input type="text" value={data.personaltaxid} onChange={(e) => onChange({ personaltaxid: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Email Adress</p>
                                <input type="email" value={data.emailaddress} onChange={(e) => onChange({ emailaddress: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />  
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Social Insurance</p>
                                <input type="text" value={data.socialinsurance} onChange={(e) => onChange({ socialinsurance: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />  
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Health Insurance</p>
                                <input type="text" value={data.healthinsurance} onChange={(e) => onChange({ healthinsurance: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />  
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Phone Number</p>
                                <input type="number" value={data.phonenumber} onChange={(e) => onChange({ phonenumber: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />  
                            </div>
                            
                        
                         
                        
                </div></div>
    const Address=<div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">Address</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex flex-col gap-5 p-4 justify-start items-start   ">
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Primary address</p>
                                <input type="text" value={data.primaryaddress} onChange={(e) => onChange({ primaryaddress: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Country</p>
                                <input type="text" value={data.country} onChange={(e) => onChange({ country: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " /> 
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">State/Province</p>
                                <input type="text" value={data.state} onChange={(e) => onChange({ state: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " /> 
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">City</p>
                                <input type="text" value={data.city} onChange={(e) => onChange({ city: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " /> 
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Post Code</p>
                                <input type="text" value={data.postcode} onChange={(e) => onChange({ postcode: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " /> 
                            </div>
                           
                        
                         
                        
                </div></div> 
    const Emergency_Contact=<div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">Emergency Contact</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex flex-col gap-5 p-4 justify-start items-start   ">
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Full Name</p>
                                <input type="text" value={data.emefullname} onChange={(e) => onChange({ emefullname: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " /> 
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Phone Number</p>
                                <input type="number" value={data.emephonenumber} onChange={(e) => onChange({ emephonenumber: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />  
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">State/Province</p>
                                <input type="text" value={data.emestate} onChange={(e) => onChange({ emestate: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />  
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">City</p>
                                <input type="text" value={data.emecity} onChange={(e) => onChange({ emecity: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " /> 
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Post Code</p>
                                <input type="text" value={data.emepostcode} onChange={(e) => onChange({ emepostcode: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " /> 
                            </div>
                           
                        
                         
                        
                </div></div> 
        const General=<div className="flex flex-col gap-8 scrollbar-hidden overflow-y-scroll">
        {Personal_info}
        {Address}
        {Emergency_Contact}
    </div>
  return (
    <>{General}</>
  )
}

export default StepGeneral