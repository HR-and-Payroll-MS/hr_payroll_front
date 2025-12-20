import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CompanyInfo() {
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Fetching data from Backend (Mocked)
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // In a real scenario, replace with: 
                // const response = await axios.get('https://api.yourbackend.com/company');
                
                // Simulating a delay and mock data
                setTimeout(() => {
                    const mockData = {
                        name: "TechInnovate Solutions",
                        website: "www.techinnovate.com",
                        countryCode: "+251",
                        phone: "972334145",
                        email: "contact@techinnovate.com",
                        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus libero velit ratione consectetur, minus tempora qui. Expedita quis omnis aspernatur deleniti inventore cupiditate ipsa perferendis dignissimos beatae vero!"
                    };
                    setCompanyData(mockData);
                    setLoading(false);
                }, 800); 

            } catch (error) {
                console.error("Error fetching company data", error);
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, []);

    const inputLook = "py-1.5 px-3.5 text-sm font-semibold border rounded-md border-gray-100 dark:border-slate-600 dark:text-slate-100 bg-white dark:bg-transparent min-h-[38px] flex items-center";
    const containerLook = "flex text-gray-700 dark:text-slate-100 px-3.5 border border-gray-100 dark:border-slate-600 items-center justify-between gap-1.5 rounded-md bg-white dark:bg-transparent min-h-[38px]";

    if (loading) {
        return <div className="p-8 dark:text-slate-100">Loading Company Profile...</div>;
    }

    return (
        <div className="flex flex-col w-full p-8 gap-5 dark:bg-slate-800">
            
            <p className="text-xl font-semibold dark:text-slate-100">Company Info</p>
            <hr className="opacity-5 dark:opacity-10" />

            {/* Row 1: Name and Website */}
            <div id="top-row" className="flex flex-1 gap-5 justify-between items-center">
                <div className="flex-1 flex flex-col gap-2">
                    <p className="dark:text-slate-300">Company Name <span className="text-red-500">*</span></p>
                    <div className={inputLook}>{companyData?.name}</div>
                </div>
                
                <div className="flex-1 flex flex-col gap-2">
                    <p className="dark:text-slate-300">Company Website <span className="text-red-500">*</span></p>
                    <div className={containerLook}>
                        <span className="text-sm font-semibold">{companyData?.website}</span>
                        <img className="h-4 dark:invert opacity-50" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                </div>
            </div>

            {/* Row 2: Contact Number and Email */}
            <div id="middle-row" className="flex flex-1 gap-4 justify-between items-center">
                <div className="w-1/2 flex flex-col gap-2">
                    <p className="dark:text-slate-300">Contact Number <span className="text-red-500">*</span></p>
                    <div className="flex gap-2">
                        <div className="flex text-gray-700 dark:text-slate-100 w-2/7 px-2 border border-gray-100 dark:border-slate-600 items-center justify-between rounded-md bg-white dark:bg-transparent">
                            <span className="py-1.5 text-sm font-semibold">{companyData?.countryCode}</span>
                            <img className="h-4 dark:invert opacity-50" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                        </div>
                        <div className={`${inputLook} w-4/5`}>{companyData?.phone}</div>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col gap-2">
                    <p className="dark:text-slate-300">Contact Email <span className="text-red-500">*</span></p>
                    <div className={containerLook}>
                        <span className="text-sm font-semibold">{companyData?.email}</span>
                        <img className="h-4 dark:invert opacity-50" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                </div>
            </div>

            {/* Row 3: Bio/Note (Textarea Look) */}
            <div className="flex-1 flex flex-col gap-2">
                <p className="dark:text-slate-300">About Company <span className="text-red-500">*</span></p>
                <div className="py-1.5 px-3.5 min-h-34 text-sm border rounded-md border-gray-100 dark:border-slate-600 dark:text-slate-100 bg-white dark:bg-transparent overflow-y-auto leading-relaxed">
                    {companyData?.bio}
                </div>
            </div>

            {/* Edit Button (Styled like your Save button) */}
            <div className="flex flex-1 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 items-center w-fit justify-start gap-1.5 px-8 py-3 rounded-md cursor-pointer hover:opacity-90 active:scale-95 transition-all">
                <p className="text-xs font-bold uppercase tracking-wider">Edit Profile</p>
            </div>

        </div>
    );
}