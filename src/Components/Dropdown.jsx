import useDropdown from "../Hooks/useDropdown";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ options=[], placeholder = "Select...", onChange }){
    const {selected,isOpen,dropdownRef,toggleDropdown,selectItem}=useDropdown();

    const handleSelect =(item) => {
        selectItem(item);
        if (onChange) onChange(item)
    };

    return(
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="w-full flex items-center justify-between big white border border-gray-300 rounded-lg px-4 py-2  hover:border-slate-400  transition"
            >
                <span className={selected ? "text-gray-900" : "text-gray-400"}>
                    {selected || placeholder}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-100":""}`}/>
            </button>
            { isOpen && (
                <ul className="absolute z-10 mt-2 w-full bg-white  dark:bg-slate-700  rounded-lg shadow-lg max-h-56 overflow-y-auto">
                {options.length > 0?(
                    options.map((item, index)=>(
                        <li key={index} onClick={()=>handleSelect(item)} className={`px-4 py-2 cursor-pointer dark:hover:border-slate-800 hover:bg-slate-100 ${selected === item ? "bg-blue-100 text-blue-600":""}`}>
                            {item}
                        </li>))):(<li className="px-4 py-2 text-gray-400">No options</li>)}
                </ul>
            )

            }
        </div>
    )
}


/*       how to use
    const options=["profile","settings","logout"]

    const handleselect = (value)=>{
        console.log("selected: ",value)}

        return(
        <div classname="flex justify-center items-center h-screen bg-gray-50">
            <Dropdown options={options} placeholder = "choose an option" onChange={handleselect}/>
        </div>
        )
 */