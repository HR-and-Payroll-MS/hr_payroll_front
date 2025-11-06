import React from 'react'
import Icon from './Icon'









function InputField({placeholder}) {
  return (
                    <div className="flex text-slate-700 dark:text-slate-200   flex-1 border rounded items-center justify-between px-2.5  py-1.5 dark:border-slate-500 border-slate-300">
                    <input className=" text-slate-700 dark:text-slate-200  h-full outline-none rounded w-full" type="email" name="email" id="email" placeholder={`${placeholder?placeholder:'search what you need'}`} />
                    <Icon name={"Search"} className={"text-slate-400 w-4 h-4"}/>
                </div>
  )
}

export default InputField