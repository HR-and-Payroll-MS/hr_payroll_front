import React, { useState } from 'react'

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue]= useState(()=>{ const item = localStorage.getItem(key); return item? JSON.parse(item): initialValue ; })
    const setValue = (value)=>{
        const valueToStore = value instanceof Function ? value(storedValue):value;
        setStoredValue(valueToStore);
        localStorage.setItem(key,JSON.stringify(valueToStore))
    }
  return [storedValue, setValue];
};

export default useLocalStorage



// how to use it 
/*
    const [darkMode, setDarkMode] = useLocalStorage("darkMode",false);
    onClick={()=>setDarkMode(!darkMode)}
 */