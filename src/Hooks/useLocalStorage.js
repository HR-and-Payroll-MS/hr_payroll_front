const setLocalData = (key, value) => {
  if( value === undefined || value === null) return;
  try{localStorage.setItem(key,value); } catch (e) {console.error('error from setLocalData .5 :',e)}
}

const getLocalData = (key) => { try { return localStorage.getItem(key)} catch (e){console.error('error from getlocaldata .5 :',e); return null}}
export {getLocalData,setLocalData}







// import React, { useState } from 'react'

// function useLocalStorage(key, initialValue) {
//     const [storedValue, setStoredValue]= useState(()=>{ const item = localStorage.getItem(key); return item? JSON.parse(item): initialValue ; })
//     const setValue = (value)=>{
//         const valueToStore = value instanceof Function ? value(storedValue):value;
//         setStoredValue(valueToStore);
//         localStorage.setItem(key,JSON.stringify(valueToStore))
//     }
//   return [storedValue, setValue];
// };

// const getLocalData = (key)=>{
//   const data=localStorage.getItem(key);
//   return data;
// }
// const setLocalData = (key,value)=>{
//   const data=localStorage.setItem(key,value);
//   return data;
// }
// export  {useLocalStorage,getLocalData,setLocalData}



// how to use it 
/*
    const [darkMode, setDarkMode] = useLocalStorage("darkMode",false);
    onClick={()=>setDarkMode(!darkMode)}
 */