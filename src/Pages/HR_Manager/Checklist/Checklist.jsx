import React, { useState } from 'react'
import Example from '../../../Example/Example'
import CheckModal from '../../../Example/CheckModal'
import Modal from '../../../Components/Modal'
import Drawer from '../../../Example/Drawer'

function Checklist() {
      const [isModalOpen , closeModal]=useState(true)
      const [isDrawerOpen , setDrawerOpen]=useState(true)
      const close = () => {
        setDrawerOpen(false)
        setTimeout(() => {
          closeModal(false)
          
        }, 400);
      }
  return (
    // <div><CheckModal/></div>
    <Modal isOpen={isModalOpen} >
      <Drawer isOpen={isDrawerOpen} onClose={() => close()}>
        <div>
          
        </div>
      </Drawer>
  </Modal>

  )
}

export default Checklist