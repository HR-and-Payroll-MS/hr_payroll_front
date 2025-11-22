import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import SuggestionBox from './SuggestionBox'
import useAuth from '../Context/AuthContext'

function InputField({
  placeholder = "Search...",
  apiEndpoint = "/api/search",
  displayKey = "name",
  onSelect,
  value=""//the input text that is inserted inside the inputfield
}) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const {axiosPrivate} = useAuth();
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
    try {setLoading(true)
      const res = await axiosPrivate.get("/employees/")
      console.log("apiEndpoint:", apiEndpoint)
      
      setSuggestions(res.data.results)
    } catch (err) {
      console.error("Error fetching suggestions: ", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (item) => { 
    value=item
    setQuery(item[displayKey] || "")
    setSuggestions([])
    if (onSelect) onSelect(item)
  }
// check here there is some thing wrong

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





