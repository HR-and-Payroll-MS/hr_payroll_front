import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import SuggestionBox from './SuggestionBox'

function InputField({
  placeholder = "Search...",
  apiEndpoint = "/api/search",
  displayKey = "name",
  onSelect,
}) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 1) {
        fetchSuggestions(query)
      } else {
        setSuggestions([])
      }
    }, 400)
    return () => clearTimeout(delay)
  }, [query])

  const fetchSuggestions = async (text) => {
    try {
      setLoading(true)
      setSuggestions([{ name: "name" }, { name: "nome" }, { name: "nami" }])
    } catch (err) {
      console.error("Error fetching suggestions: ", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (item) => {
    setQuery(item[displayKey] || "")
    setSuggestions([])
    if (onSelect) onSelect(item)
  }

  return (
    <div className="relative flex-1"> 
      <div className="flex text-slate-700 dark:text-slate-200 flex-1 border rounded items-center justify-between px-2.5 py-1.5 dark:border-slate-500 border-slate-300">
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="text-slate-700 dark:text-slate-200 h-full outline-none rounded w-full bg-transparent"
          type="text"
          placeholder={placeholder}
        />
        <Icon name="Search" className="text-slate-400 w-4 h-4" />
      </div>
      {loading && (
        <div className="absolute right-3 top-2 text-gray-400 text-sm">...</div>
      )}
      <SuggestionBox suggestions={suggestions} onSelect={handleSelect} />
    </div>
  )
}

export default InputField









// import React, { useEffect, useState } from 'react'
// import Icon from './Icon'
// import SuggestionBox from './SuggestionBox';
// function InputField({placeholder = "Search...",apiEndpoint = "/api/search",displayKey="name",onSelect}) {
//   const [query,setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([])
//   const [loading, setLoading] = useState(false);

//   useEffect(()=>{
//     const delay = setTimeout(()=>{
//       if (query.trim().length > 1){
//         fetchSuggestions(query)
//       } else {
//         setSuggestions([]);
//       }
//     },400)
//     return () => clearTimeout(delay)
//   },[query])


//   const fetchSuggestions = async (text) => {
//     try{
//       setLoading(true);
//       // const res = await axios.get(apiEndpoint,{params:{ q:text }});
//       // setSuggestions(res.data.results || "");

//       setSuggestions([{name:"name"},{name:"nome"},{name:"nami"}])

//     } catch (err){
//       console.error("Error fetching suggestions: ",err);
//     } finally {
//       setLoading (false);
//     }
//   };

//   const handleSelect = (item) => {
//     setQuery(item[displayKey] || "");
//     setSuggestions([]);
//     if (onSelect) onSelect(item);
//   }
//   return (
//           <div className="flex text-slate-700 dark:text-slate-200   flex-1 border rounded items-center justify-between px-2.5  py-1.5 dark:border-slate-500 border-slate-300">
//             <input onChange={(e) => setQuery(e.target.value)}  value={query} className=" text-slate-700 dark:text-slate-200  h-full outline-none rounded w-full" type="text"  placeholder={`${placeholder}`} />
//             <Icon name={"Search"} className={"text-slate-400 w-4 h-4"}/>
//             {loading && (
//               <div className='absolute right-2 top-2 textp-gray-400 text-sm'>...</div>
//             )}
//             <div className=''>
//             <SuggestionBox suggestions={suggestions} onSelect={handleSelect}/></div>
//           </div>
//   )
// }

// export default InputField

/*
  const handleEmployeeSelect = (employee) => {
    console.log("selected employee:",employee)}

    <InputField  
                  placeholder = 'search employee...'
                  apiEndpoint = '/api/employees/search'
                  displayKey = 'name'
                  onSelect = {handleEmployeeSelect}
                  />
*/