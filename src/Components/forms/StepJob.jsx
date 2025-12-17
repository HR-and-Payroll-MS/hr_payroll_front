import Dropdown from '../Dropdown'

const LineManager = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis"]
const PositionTypes = ["Full-Time", "Part-Time", "Contracht"]
const JobTitles = ["HR Manager", "Department Manager", "Payroll Officer", "Employee"]
const EmploymentTypes = ["Permanent", "Temporary", "Casual"]
// Job Title represents the specific role of an employee,
//  such as HR Manager, Department Manager, Payroll Officer,
//   or Employee. Position Type describes the nature of the job,
//    like full-time, part-time, or contract. 
//    Employment Type indicates the employment arrangement,
//     such as permanent, temporary, or casual. Line Manager 
//     refers to the person who directly supervises the employee.


const StepJob = ({ data , onChange }) => {
    const employmentInfo= <div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">Employment Information</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap  ">
                            <div className="w-96 flex gap-2   text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Employee ID</p>
                                <input type="text" value={data.employeeid} onChange={(e) => onChange({ employeeid: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Service Year</p>
                                <input type="text" value={data.serviceyear} onChange={(e) => onChange({ serviceyear: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Join Date</p>
                                <input type="date" value={data.joindate} onChange={(e) => onChange({ joindate: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>                            
                        </div>
                    </div>
    const jobTimeLine= <div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">Job TimeLine</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap  ">
                            <div className="w-96 flex gap-2   text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Job Title</p>
                                <Dropdown padding='p-0.5' options={JobTitles} onChange={(e) => onChange({ jobtitle: e })}/>{/* <input type="text" value={data.jobtitle} onChange={(e) => onChange({ jobtitle: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />    */}
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Position Type</p>
                                <Dropdown padding='p-0.5' options={PositionTypes} onChange={(e) => onChange({ positiontype: e })}/>
                                {/* <input type="text" value={data.positiontype} onChange={(e) => onChange({ positiontype: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />    */}
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Employment Type</p>
                                <Dropdown padding='p-0.5' options={EmploymentTypes} onChange={(e) => onChange({ EmploymentTypes: e })}/>
                                {/* <input type="text" value={data.employmenttype} onChange={(e) => onChange({ employmenttype: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " /> */}
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Line Manager</p>
                                <Dropdown padding='p-0.5' options={LineManager} onChange={(e) => onChange({ linemanager: e })}/>
                                {/* <input type="text" value={data.linemanager} onChange={(e) => onChange({ linemanager: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   */}
                            </div>
                        </div>
                    </div>
    const contractTimeLine= <div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">Contract Timeline</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap  ">
                            <div className="w-96 flex gap-2   text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Contract Number</p>
                                <input  type="text" value={data.contractnumber} onChange={(e) => onChange({ contractnumber: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Contract Name</p>
                                <input type="text" value={data.contractname} onChange={(e) => onChange({ contractname: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Contract Type</p>
                                <input type="text" value={data.contracttype} onChange={(e) => onChange({ contracttype: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Start Date</p>
                                <input type="date" value={data.startdate} onChange={(e) => onChange({ startdate: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">End Date</p>
                                <input type="date" value={data.enddate} onChange={(e) => onChange({ enddate: e.target.value })} className="w-full border outline-none border-slate-300 rounded px-3 " />  
                            </div>
                        </div>
                    </div>
    const workSchedule= <div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">Work Schedule</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   </div>
    const General=<div className="flex flex-col gap-8 scrollbar-hidden overflow-y-scroll">
        {employmentInfo}
        {jobTimeLine}
        {contractTimeLine}
        {workSchedule}
    </div>

       return General

    }
    export default StepJob

                        