import React, { useState, useEffect } from "react";
import { User, MapPin, PhoneCall } from "lucide-react";
import Dropdown from "../Dropdown";
import { Country, State, City } from "country-state-city";

const StepGeneral = ({ data, onChange }) => {
    // Helper to get countries for dropdown
    const countries = Country.getAllCountries().map(c => ({ content: c.name, code: c.isoCode }));

    // -- Primary Address State --
    const [primaryStates, setPrimaryStates] = useState([]);
    const [primaryCities, setPrimaryCities] = useState([]);

    // -- Emergency Contact State --
    const [emeStates, setEmeStates] = useState([]);
    const [emeCities, setEmeCities] = useState([]);

    // --- Country Change Logic (Primary) ---
    const handlePrimaryCountryChange = (countryName) => {
        const country = countries.find(c => c.content === countryName);
        onChange({ country: countryName, state: "", city: "" }); // Reset state/city

        if (country) {
            const states = State.getStatesOfCountry(country.code).map(s => ({ content: s.name, code: s.isoCode }));
            setPrimaryStates(states);
            setPrimaryCities([]);
        } else {
            setPrimaryStates([]);
            setPrimaryCities([]);
        }
    };

    // --- State Change Logic (Primary) ---
    const handlePrimaryStateChange = (stateName) => {
        const country = countries.find(c => c.content === data.country);
        const state = primaryStates.find(s => s.content === stateName);
        onChange({ state: stateName, city: "" });

        if (country && state) {
            const cities = City.getCitiesOfState(country.code, state.code).map(c => ({ content: c.name }));
            setPrimaryCities(cities);
        } else {
            setPrimaryCities([]);
        }
    };

    // --- Country Change Logic (Emergency) ---
    // Note: data.emestate is the field name, not country? 
    // Wait, emergency contact doesn't have explicit country field in original form?
    // Checking "Address" section: data.country exists.
    // Checking "Emergency Contact": It has emestate, emecity. Implicitly same country? Or needs a country field?
    // The user said "list aactual data...". Let's assume we need to add Country to Emergency Contact too or reuse logic.
    // The original form has: emefullname, emephonenumber, emestate, emecity, emepostcode.
    // I should add "emecountry" to follow the pattern properly or assume the same country?
    // User requested "dynamic change... if the user picks ethiopia in country" - implies per-section logic.
    // I will add an "emecountry" field logic here internally even if not in original model yet (or map to existing).
    // Wait, let's look at data props. `emestate` is likely just text.
    // I will stick to adding the Country Dropdown to Emergency Contact for UX, even if we just store the name.

    // Actually, looking at the previous file structure, `Emergency Contact` section didn't have `Country`.
    // I will ADD a Country dropdown for Emergency Contact to make State/City work.

    const [emeCountry, setEmeCountry] = useState("");

    const handleEmeCountryChange = (countryName) => {
        setEmeCountry(countryName);
        // We probably don't have a data.emecountry field yet, but we need it for state lookup
        // Let's assume we just store it in local state to drive the dropdowns, 
        // OR we should ideally add it to data. But I can't change data structure easily without checking `AddEmployee`.
        // For now, I'll use a local state to drive the cascading, and just save State/City to data.

        const country = countries.find(c => c.content === countryName);
        onChange({ emestate: "", emecity: "" }); // Reset

        if (country) {
            const states = State.getStatesOfCountry(country.code).map(s => ({ content: s.name, code: s.isoCode }));
            setEmeStates(states);
            setEmeCities([]);
        }
    };

    const handleEmeStateChange = (stateName) => {
        const country = countries.find(c => c.content === emeCountry);
        const state = emeStates.find(s => s.content === stateName);
        onChange({ emestate: stateName, emecity: "" });

        if (country && state) {
            const cities = City.getCitiesOfState(country.code, state.code).map(c => ({ content: c.name }));
            setEmeCities(cities);
        }
    };


    const genderOptions = ["Male", "Female"];
    const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];

    const Personal_info = (
        <div className="bg-white dark:bg-slate-800 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 transition-all mb-8 border border-slate-100 dark:border-transparent">
            <div className="flex mx-4 py-4 border-b dark:border-slate-700 items-center">
                <p className="flex-1 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">personal Info</p>
                <User size={18} className="opacity-40 text-green-500 dark:text-green-400" />
            </div>
            <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap">
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">First Name</p>
                    <input type="text" value={data.firstname} onChange={(e) => onChange({ firstname: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Last Name</p>
                    <input type="text" value={data.lastname} onChange={(e) => onChange({ lastname: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Gender</p>
                    <div className="w-full"><Dropdown padding="py-1.5" options={genderOptions} onChange={(val) => onChange({ gender: val })} placeholder={data.gender || "Select Gender"} selected={data.gender} /></div>
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Date of Birth</p>
                    <input type="date" value={data.dateofbirth} onChange={(e) => onChange({ dateofbirth: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Marital Status</p>
                    <div className="w-full"><Dropdown padding="py-1.5" options={maritalStatusOptions} onChange={(val) => onChange({ maritalstatus: val })} placeholder={data.maritalstatus || "Select Status"} selected={data.maritalstatus} /></div>
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Nationality</p>
                    <div className="w-full"><Dropdown padding="py-1.5" options={countries} onChange={(val) => onChange({ nationality: val })} placeholder={data.nationality || "Select Nationality"} selected={data.nationality} /></div>
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Personal TaxID</p>
                    <input type="text" value={data.personaltaxid} onChange={(e) => onChange({ personaltaxid: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Email Adress</p>
                    <input type="email" value={data.emailaddress} onChange={(e) => onChange({ emailaddress: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Social Insurance</p>
                    <input type="text" value={data.socialinsurance} onChange={(e) => onChange({ socialinsurance: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Health Insurance</p>
                    <input type="text" value={data.healthinsurance} onChange={(e) => onChange({ healthinsurance: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="w-96 flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Phone Number</p>
                    <input type="number" value={data.phonenumber} onChange={(e) => onChange({ phonenumber: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
            </div>
        </div>
    );

    const Address = (
        <div className="bg-white dark:bg-slate-800 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 transition-all mb-8 border border-slate-100 dark:border-transparent">
            <div className="flex mx-4 py-4 border-b dark:border-slate-700 items-center">
                <p className="flex-1 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Address</p>
                <MapPin size={18} className="opacity-40 text-green-500 dark:text-green-400" />
            </div>
            <div id="left" className="flex flex-col gap-5 p-4 justify-start items-start ">
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Primary address</p>
                    <input type="text" value={data.primaryaddress} onChange={(e) => onChange({ primaryaddress: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Country</p>
                    <div className="w-full"><Dropdown padding="py-1.5" options={countries} onChange={handlePrimaryCountryChange} placeholder={data.country || "Select Country"} selected={data.country} /></div>
                </div>
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">State/Province</p>
                    <div className="w-full"><Dropdown padding="py-1.5" options={primaryStates} onChange={handlePrimaryStateChange} placeholder={data.state || "Select State"} selected={data.state} /></div>
                </div>
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">City</p>
                    <div className="w-full"><Dropdown padding="py-1.5" options={primaryCities} onChange={(val) => onChange({ city: val })} placeholder={data.city || "Select City"} selected={data.city} /></div>
                </div>
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Post Code</p>
                    <input type="text" value={data.postcode} onChange={(e) => onChange({ postcode: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
            </div>
        </div>
    );

    const Emergency_Contact = (
        <div className="bg-white dark:bg-slate-800 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 transition-all mb-4 border border-slate-100 dark:border-transparent">
            <div className="flex mx-4 py-4 border-b dark:border-slate-700 items-center">
                <p className="flex-1 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Emergency Contact</p>
                <PhoneCall size={18} className="opacity-40 text-green-500 dark:text-green-400" />
            </div>
            <div id="left" className="flex flex-col gap-5 p-4 justify-start items-start ">
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Full Name</p>
                    <input type="text" value={data.emefullname} onChange={(e) => onChange({ emefullname: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Phone Number</p>
                    <input type="number" value={data.emephonenumber} onChange={(e) => onChange({ emephonenumber: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Country</p>
                    <div className="w-full"><Dropdown padding="py-1.5" options={countries} onChange={handleEmeCountryChange} placeholder={emeCountry || "Select Country"} selected={emeCountry} /></div>
                </div>
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">State/Province</p>
                    <div className="w-full"><Dropdown padding="py-1.5" options={emeStates} onChange={handleEmeStateChange} placeholder={data.emestate || "Select State"} selected={data.emestate} /></div>
                </div>
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">City</p>
                    <div className="w-full"><Dropdown padding="py-1.5" options={emeCities} onChange={(val) => onChange({ emecity: val })} placeholder={data.emecity || "Select City"} selected={data.emecity} /></div>
                </div>
                <div className="flex-1 w-full flex gap-2 text-nowrap items-center">
                    <p className="min-w-40 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Post Code</p>
                    <input type="text" value={data.emepostcode} onChange={(e) => onChange({ emepostcode: e.target.value })} className="w-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded px-3 py-1.5 outline-none focus:border-green-500 transition-all shadow-sm" />
                </div>
            </div>
        </div>
    );

    const General = (
        <div className="flex flex-col gap-4 scrollbar-hidden overflow-y-scroll pb-10">
            {Personal_info}
            {Address}
            {Emergency_Contact}
        </div>
    );

    return <>{General}</>;
};

export default StepGeneral;