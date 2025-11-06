import React from 'react'

function Header({Title , Breadcrumb,children,className}) {
  return (<div id="left" className={ `flex py-2.5 gap-3 ${className}  justify-between items-center  `}>
            
            
            <div className="flex flex-1 flex-col text-gray-700 items-start  justify-start  rounded-md">
                    <p className="text-xl font-bold">{Title}</p>
                    <p className="text-xs text-gray-500 font-semibold">{Breadcrumb}</p>
            </div>
            {children?
                           <div className="flex items-center w-1/3  px-1.5 border border-gray-200 rounded-md">
                {children}
            
            </div>:""}
        </div>
  )
}

export default Header