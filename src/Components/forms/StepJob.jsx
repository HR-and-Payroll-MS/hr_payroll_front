import React from "react";
import Dropdown from '../Dropdown';
import { Briefcase, Clock, FileText, Calendar } from "lucide-react";

const LineManager = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis"];
const PositionTypes = ["Full-Time", "Part-Time", "Contracht"];
const JobTitles = ["HR Manager", "Department Manager", "Payroll Officer", "Employee"];
const EmploymentTypes = ["Permanent", "Temporary", "Casual"];

const StepJob = ({ data , onChange }) => {
    const employmentInfo = (
        <div className="bg-white dark:bg-slate-800 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 transition-all mb-8 border border-slate-100 dark:border-transparent">
            <div className="flex mx-4 py-4 border-b dark:border-slate-700 items-center">
                <p className="flex-1 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Employment Information</p>
                <Briefcase size={18} className="opacity-40 text-blue-500 dark:text-blue-400" />
            </div>
            <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap">
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Employee ID</p>
                    <input type="text" value={data.employeeid} onChange={(e) => onChange({ employeeid: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-blue-500 transition-all shadow-sm" />   
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Service Year</p>
                    <input type="text" value={data.serviceyear} onChange={(e) => onChange({ serviceyear: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-blue-500 transition-all shadow-sm" />   
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Join Date</p>
                    <input type="date" value={data.joindate} onChange={(e) => onChange({ joindate: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-blue-500 transition-all shadow-sm" />   
                </div>
            </div>
        </div>
    );

    const jobTimeLine = (
        <div className="bg-white dark:bg-slate-800 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 transition-all mb-8 border border-slate-100 dark:border-transparent">
            <div className="flex mx-4 py-4 border-b dark:border-slate-700 items-center">
                <p className="flex-1 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Job TimeLine</p>
                <Clock size={18} className="opacity-40 text-blue-500 dark:text-blue-400" />
            </div>
            <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap">
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Job Title</p>
                    <div className="w-full"><Dropdown padding='p-1.5' options={JobTitles} onChange={(e) => onChange({ jobtitle: e })}/></div>
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Position Type</p>
                    <div className="w-full"><Dropdown padding='p-1.5' options={PositionTypes} onChange={(e) => onChange({ positiontype: e })}/></div>
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Employment Type</p>
                    <div className="w-full"><Dropdown padding='p-1.5' options={EmploymentTypes} onChange={(e) => onChange({ EmploymentTypes: e })}/></div>
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Line Manager</p>
                    <div className="w-full"><Dropdown padding='p-1.5' options={LineManager} onChange={(e) => onChange({ linemanager: e })}/></div>
                </div>
            </div>
        </div>
    );

    const contractTimeLine = (
        <div className="bg-white dark:bg-slate-800 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 transition-all mb-8 border border-slate-100 dark:border-transparent">
            <div className="flex mx-4 py-4 border-b dark:border-slate-700 items-center">
                <p className="flex-1 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Contract Timeline</p>
                <FileText size={18} className="opacity-40 text-blue-500 dark:text-blue-400" />
            </div>
            <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap">
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Contract Number</p>
                    <input type="text" value={data.contractnumber} onChange={(e) => onChange({ contractnumber: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-blue-500 transition-all shadow-sm" />   
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Contract Name</p>
                    <input type="text" value={data.contractname} onChange={(e) => onChange({ contractname: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-blue-500 transition-all shadow-sm" />   
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Contract Type</p>
                    <input type="text" value={data.contracttype} onChange={(e) => onChange({ contracttype: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-blue-500 transition-all shadow-sm" />   
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Start Date</p>
                    <input type="date" value={data.startdate} onChange={(e) => onChange({ startdate: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-blue-500 transition-all shadow-sm" />
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">End Date</p>
                    <input type="date" value={data.enddate} onChange={(e) => onChange({ enddate: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-blue-500 transition-all shadow-sm" />   
                </div>
            </div>
        </div>
    );

    const workSchedule = (
        <div className="bg-white dark:bg-slate-800 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 transition-all border border-slate-100 dark:border-transparent">
            <div className="flex mx-4 py-4 border-b dark:border-slate-700 items-center">
                <p className="flex-1 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Work Schedule</p>
                <Calendar size={18} className="opacity-40 text-blue-500 dark:text-blue-400" />
            </div>
            <div className="p-8 text-center text-xs text-slate-400 italic">
                Schedule configuration content goes here...
            </div>
        </div>
    );

    const General = (
        <div className="flex flex-col gap-4 scrollbar-hidden overflow-y-scroll pb-10">
            {employmentInfo}
            {jobTimeLine}
            {contractTimeLine}
            {workSchedule}
        </div>
    );

    return General;
};

export default StepJob;