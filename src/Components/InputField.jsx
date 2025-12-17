import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import SuggestionBox from "./SuggestionBox";
import useAuth from "../Context/AuthContext";

function InputField({
  placeholder = "Search...",
  apiEndpoint,
  displayKey = "name",

  onSelect,
  onChangeValue,

  maxWidth = "max-w-3/5",
  suggestion = true,
  icon = true,
  border = "border",

  searchMode = "api", // "api" | "global" | "input"
  globalData = [],
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const containerRef = useRef(null);
  const { searchEmployees } = useAuth();

  /* ================= INPUT CHANGE ================= */
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    // ✅ SIMPLE INPUT MODE (FIXED)
    if (searchMode === "input") {
      if (onChangeValue) onChangeValue(val);
      else if (onSelect) onSelect(val); // 👈 fallback (THIS FIXES YOUR BUG)
      return;
    }

    setShowSuggestions(true);
  };

  /* ================= SEARCH LOGIC ================= */
  useEffect(() => {
    if (searchMode === "input") return;

    const delay = setTimeout(() => {
      // 🌍 GLOBAL SEARCH
      if (searchMode === "global") {
        if (!query.trim()) {
          setSuggestions([]);
          return;
        }

        const filtered = globalData.filter(item =>
          (item[displayKey] || "")
            .toLowerCase()
            .includes(query.toLowerCase())
        );
        setSuggestions(filtered);
        return;
      }

      // 🌐 API SEARCH
      if (apiEndpoint && query.trim().length > 1) {
        const filtered = (searchEmployees || []).filter(emp => {
          const text = `${emp.employeeid || ""} ${emp.emailaddress || ""} ${emp.department || ""} ${emp.fullname || ""}`.toLowerCase();
          return text.includes(query.toLowerCase());
        });
        setSuggestions(filtered);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query, searchMode, globalData, apiEndpoint, searchEmployees, displayKey]);

  /* ================= SELECT ================= */
  const handleSelect = (item) => {
    setQuery(item[displayKey] || "");
    setSuggestions([]);
    setShowSuggestions(false);
    onSelect?.(item);
  };

  /* ================= AUTO HIDE ================= */
  useEffect(() => {
    if (!showSuggestions) return;
    const t = setTimeout(() => setShowSuggestions(false), 8000);
    return () => clearTimeout(t);
  }, [showSuggestions]);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const close = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={containerRef} className={`relative flex-1 min-w-3/12 ${maxWidth}`}>
      <div
        className={`flex items-center px-2.5 py-1.5 rounded
        text-slate-700 dark:text-slate-200
        ${border} dark:border-slate-500 border-slate-300`}
      >
        <input
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          type="text"
        />
        {icon && <Icon name="Search" className="w-4 h-4 text-slate-400" />}
      </div>

      {showSuggestions && searchMode !== "input" && (
        <SuggestionBox
          suggestions={suggestions}
          onSelect={handleSelect}
          query={query}
          displayKey={displayKey}
          suggestion={suggestion}
        />
      )}
    </div>
  );
}

export default InputField;














































// import React, { useEffect, useState, useRef } from "react";
// import Icon from "./Icon";
// import SuggestionBox from "./SuggestionBox";
// import useAuth from "../Context/AuthContext";

// function InputField({
//   placeholder = "Search...",
//   apiEndpoint,
//   displayKey = "name",
//   onSelect,
//   maxWidth = "max-w-3/5",
//   suggestion = true,
//   icon = true,
//   border = "border",
//   value = "",
//   searchMode = "api",
//   globalData = [],
// }) {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const containerRef = useRef(null);

//   const { searchEmployees } = useAuth();
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (searchMode === "global") {
//         if (query.trim().length > 0) {
//           const filtered = globalData.filter(item =>
//             (item[displayKey] || "")
//               .toLowerCase()
//               .includes(query.toLowerCase().trim())
//           );
//           setSuggestions(filtered);
//         } else {
//           setSuggestions([]);
//         }
//         return;
//       }

//       if (apiEndpoint) {
//         if (query.trim().length > 1) {
//           if (Array.isArray(searchEmployees) && searchEmployees.length > 0) {
//             const filtered = searchEmployees.filter(emp => {
//               const searchStr = `${emp.employeeid || ""} ${emp.emailaddress || ""} ${emp.department || ""} ${emp.fullname || ""}`.toLowerCase();
//               return searchStr.includes(query.toLowerCase().trim());
//             });
//             setSuggestions(filtered);
//           } else {
//             setSuggestions([]);
//           }
//         }
//       } else {
//         if (onSelect) onSelect(query);
//       }
//     }, 400);

//     return () => clearTimeout(delay);
//   }, [query, searchMode, globalData]);
//   const handleSelect = (item) => {
//     if (onSelect) onSelect(item);
//     setQuery(item[displayKey] || "")
//     setSuggestions([]);
//     setShowSuggestions(false);
//   };

//   useEffect(() => {
//     if (!showSuggestions) return;

//     const timeout = setTimeout(() => {
//       setShowSuggestions(false);
//     }, 10000);

//     return () => clearTimeout(timeout);
//   }, [showSuggestions]);
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div ref={containerRef} className={`relative flex-1 min-w-3/12 ${maxWidth}`}>
//       <div className={`flex text-slate-700 dark:text-slate-200 flex-1 ${border} rounded items-center justify-between px-2.5 py-1.5 dark:border-slate-500 border-slate-300`}>
//         <input
//           onChange={(e) => {
//             setQuery(e.target.value);
//             setShowSuggestions(true);
//           }}
//           value={query}
//           className="text-slate-700 dark:text-slate-200 h-full outline-none rounded w-full bg-transparent"
//           type="text"
//           placeholder={placeholder}
//         />
//         {icon && <Icon name="Search" className="text-slate-400 w-4 h-4" />}
//       </div>

//       {loading && (
//         <div className="absolute right-3 top-2 text-gray-400 text-sm">...</div>
//       )}

//       {showSuggestions && (
//         <SuggestionBox
//           suggestion={suggestion}
//           suggestions={suggestions}
//           onSelect={handleSelect}
//           query={query}
//           displayKey={displayKey}
//         />
//       )}
//     </div>
//   );
// }

// export default InputField;


































































// const fetchSuggestions = async (text) => {
  //   try {setLoading(true)
  //     const res = await axiosPrivate.get("/employees/")
  //     console.log("apiEndpoint:", apiEndpoint)
      
  //     setSuggestions(res.data.results)
  //   } catch (err) {
  //     console.error("Error fetching suggestions: ", err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }



// import React, { useEffect, useState } from 'react'
// import Icon from './Icon'
// import SuggestionBox from './SuggestionBox'
// import useAuth from '../Context/AuthContext'

// function InputField({placeholder = "Search...",apiEndpoint ,
//   displayKey = "name",
//   onSelect,
//   icon=true,
//   border="border",
//   value=""//the input text that is inserted inside the inputfield
// }) {
//   const [query, setQuery] = useState("")
//   const [suggestions, setSuggestions] = useState([])
//   const [loading, setLoading] = useState(false)
//   const {axiosPrivate} = useAuth();
//   const {searchEmployees}=useAuth();
// useEffect(() => {
//   const delay = setTimeout(() => {
//     if(apiEndpoint){
//   // NEW IMPROVED LOGIC — only this part changes
//   if (query.trim().length >= 2) {
//     // User has typed 2 or more characters → show suggestions (filtered from existing data)
//     if (Array.isArray(searchEmployees) && searchEmployees.length > 0) {
//       const filtered = searchEmployees.filter(emp => {
//         const searchStr = `${emp.employeeid || ''} ${emp.emailaddress || ''} ${emp.department || ''} ${emp.fullname || ''}`.toLowerCase()
//         return searchStr.includes(query.toLowerCase().trim())
//       })
      
//       console.log("Showing suggestions for:", query, filtered)
//       setSuggestions(filtered)
//     } else {
//       setSuggestions([])
//     }
//   } else {
//     // User typed 0 or 1 character → hide suggestions immediately
//     setSuggestions([])
//   }
// } else {
//       if (onSelect) onSelect(query)
//     }
//   }, 400)
//   return () => clearTimeout(delay)
// }, [query, apiEndpoint, searchEmployees, onSelect])

//   const fetchSuggestions = async (text) => {
//     try {setLoading(true)
//       const res = await axiosPrivate.get("/employees/")
//       console.log("apiEndpoint:", apiEndpoint)
      
//       setSuggestions(res.data.results)
//     } catch (err) {
//       console.error("Error fetching suggestions: ", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSelect = (item) => { 
//     value=item
//     setQuery(item[displayKey] || "")
//     setSuggestions([])
//     if (onSelect) onSelect(item)
//   }
// // check here there is some thing wrong

//   return (
//     <div className="relative flex-1 min-w-1/5 max-w-3/5"> 
//       <div className={ `flex text-slate-700 dark:text-slate-200 flex-1 ${border} rounded items-center justify-between px-2.5 py-1.5 dark:border-slate-500 border-slate-300`}>
//         <input
//           onChange={(e) => setQuery(e.target.value)}
//           value={query}
//           className="text-slate-700 dark:text-slate-200 h-full outline-none rounded w-full bg-transparent"
//           type="text"
//           placeholder={placeholder}
//         />
//         {icon && <Icon name="Search" className="text-slate-400 w-4 h-4" />}
//       </div>
//       {loading && (
//         <div className="absolute right-3 top-2 text-gray-400 text-sm">...</div>
//       )}
//       {/* <SuggestionBox suggestions={suggestions} onSelect={handleSelect} /> */}
//       <SuggestionBox suggestions={suggestions} onSelect={handleSelect} query={query} />

//     </div>
//   )
// }

// export default InputField


