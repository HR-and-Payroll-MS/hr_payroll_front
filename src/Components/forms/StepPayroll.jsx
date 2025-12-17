import Dropdown from '../Dropdown'
const status =["Active", "Inactive", "Terminated", "On Leave"]
const StepPayroll = ({ data , onChange }) => {

    const employmentInfo= <div className="border p-2  rounded-lg border-gray-200">
                    
                   <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap  ">
                            <div className="w-96 flex gap-2   text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Employee Status</p>
                                <Dropdown padding='p-0.5' options={status} onChange={(e) => onChange({ employeestatus: e })}/>
                                {/* <input type="text" value={data.employeestatus} onChange={(e) => onChange({ employeestatus: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />    */}
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Employment Type</p>
                                <input type="text" value={data.employmenttype} onChange={(e) => onChange({ employmenttype: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Job Title</p>
                                <input type="text" value={data.jobtitle} onChange={(e) => onChange({ jobtitle: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>                            
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Job Date</p>
                                <input type="date" value={data.jobdate} onChange={(e) => onChange({ jobdate: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>                            
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Last Working Date</p>
                                <input type="date" value={data.lastworkingdate} onChange={(e) => onChange({ lastworkingdate: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>                            
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">salary</p>
                                <input type="number" value={data.salary} onChange={(e) => onChange({ salary: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>                            
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">offset</p>
                                <input type="number" value={data.offset} onChange={(e) => onChange({ offset: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>                            
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Onset</p>
                                <input type="number" value={data.oneoff} onChange={(e) => onChange({ oneoff: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>                            
                        </div>
                    </div>

       return employmentInfo

    }
    export default StepPayroll

                        