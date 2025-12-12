import React, { useState } from 'react'
import SearchDate from '../../../Components/SearchDate'
import { Generatepayroll } from '../../../Components/Level2Hearder'
import Header from '../../../Components/Header'
import Table from '../../../Components/Table'
import { useNavigate } from 'react-router-dom'
import FileDrawer from '../../../Components/FileDrawer'
import OnPayrollGenerate from './OnPayrollGenerate'
import ExportTable from '../../../Components/ExportTable'

function GeneratePayroll() {
  const [progress, setProgress] = useState("");
  const [selectedPayslipKey, setSelectedPayslipKey] = useState(null);
  const [summary, setSummary] = useState(null);
  const handledate=(e)=>console.log(e)
  const [isModalOpen,setModalOpen]=useState(false);
  const navigate = useNavigate();
  return (
    <div className='p-4 gap-3 flex flex-col  overflow-hidden h-full'>
      <OnPayrollGenerate
                progress={progress}
                setProgress={setProgress}
                selectedPayslipkey={selectedPayslipKey}
                setSelectedPayslipkey={setSelectedPayslipKey}
                summary={summary}
                setSummary={setSummary}
          />
    </div>
  )
}

export default GeneratePayroll