import React, { useState } from 'react'
import Drawer from './Drawer'
import Modal from './Modal'

function FileDrawer({ isModalOpen, closeModal ,children }) {
      const [isDrawerOpen , setDrawerOpen]=useState(true)
      const close = () => {
        setDrawerOpen(false)
        setTimeout(() => {
          closeModal(false)
          
        }, 400);
      }
  return (
    <Modal isOpen={isModalOpen} >
      <Drawer isOpen={isDrawerOpen} onClose={() => close()}>
        {children}
      </Drawer>
    </Modal>
  )
}

export default FileDrawer