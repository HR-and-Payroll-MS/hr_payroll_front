import React from 'react'
import { createPortal } from 'react-dom'
function Modal({children ,isOpen}) 
{
   if(!isOpen) return null; 
    return createPortal (
        <div className='bg-gray-900/40 flex z-50 w-full h-full justify-end items-center absolute top-0 '>
            {children}
        </div>,document.body
    )
}

export default Modal