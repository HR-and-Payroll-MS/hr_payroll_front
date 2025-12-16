

import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import SuggestionBox from './SuggestionBox'
import useAuth from '../Context/AuthContext'

function InputField({placeholder = "Search...",apiEndpoint ,
  displayKey = "name",
  onSelect,
  maxWidth="max-w-3/5",
  suggestion=true,
  icon=true,
  border="border",
  value=""//the input text that is inserted inside the inputfield
}) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  // const {axiosPrivate} = useAuth();
  const {searchEmployees}=useAuth();
  useEffect(() => {
        const delay = setTimeout(() => {
          if(apiEndpoint){
                if (query.trim().length > 1) {

                if (Array.isArray(searchEmployees) && searchEmployees.length > 0) {
                  const filtered = searchEmployees.filter(emp => {
                    const searchStr = `${emp.employeeid || ''} ${emp.emailaddress || ''} ${emp.department || ''} ${emp.fullname || ''}`.toLowerCase()
                    return searchStr.includes(query.toLowerCase().trim())
                  })
                        
                  console.log("Showing suggestions for:", query, filtered)
                  setSuggestions(filtered)
                  // fetchSuggestions(query)
                } else {
                  setSuggestions([])
                }
              }
        } else{
            onSelect(query)
        if (onSelect) onSelect(query)
          }
        }, 400)
        return () => clearTimeout(delay)
  }, [query])

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

  const handleSelect = (item) => { 
    value=item
    setQuery(item[displayKey] || "")
    setSuggestions([])
    if (onSelect) onSelect(item)
  }
// check here there is some thing wrong

  return (
    <div className={`relative flex-1 min-w-3/12 ${maxWidth}`}> 
      <div className={ `flex text-slate-700 dark:text-slate-200 flex-1 ${border} rounded items-center justify-between px-2.5 py-1.5 dark:border-slate-500 border-slate-300`}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="text-slate-700 dark:text-slate-200 h-full outline-none rounded w-full bg-transparent"
          type="text"
          placeholder={placeholder}
        />
        {icon && <Icon name="Search" className="text-slate-400 w-4 h-4" />}
      </div>
      {loading && (
        <div className="absolute right-3 top-2 text-gray-400 text-sm">...</div>
      )}
      {/* <SuggestionBox suggestions={suggestions} onSelect={handleSelect} /> */}
      <SuggestionBox suggestion={suggestion} suggestions={suggestions} onSelect={handleSelect} query={query} />
    </div>
  )
}

export default InputField






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


