import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useAuth from '../../Context/AuthContext';
import Header from '../../Components/Header';
import StepHeader from '../../Components/forms/StepHeader';
import { RenderStepContent } from '../../utils/RenderStepContent';
import Icon from '../../Components/Icon';
import ThreeDots from '../../animations/ThreeDots';
import ProfileHeader from './ProfileHeader';
import MyPayrollPage from '../HR_Manager/payroll_management/MyPayrollPage';
import { getLocalData } from '../../Hooks/useLocalStorage';

function MyProfile({ currStep = 0 }) {
  const { state } = useLocation();
  const { position } = state || {};
  const activeStep = position ?? currStep;

  const { axiosPrivate } = useAuth(); // must supply axiosPrivate configured with baseURL + auth
  const steps = ['General', 'Job', 'Payroll', 'Documents'];
  const [currentStep, setCurrentStep] = useState(activeStep);
  const [employeeData, setEmployeeData] = useState(null);
  const [originalData, setOriginalData] = useState(null); // keep backend snapshot
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState({
    general: false,
    job: false,
    payroll: false,
    documents: false,
  });
  // const employeeId = 0;
    const employeeId = getLocalData("user_id");;
  useEffect(() => {
    if (position !== undefined) {
      setCurrentStep(position);
    } else {
      setCurrentStep(0);
    }
  }, [position]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
         const daattaa = await axiosPrivate.get(`/employees/${employeeId}`);
         console.log(daattaa.data);

        const response = [
          {
            id: 1,
            general: {
              fullname: 'be Beso',
              gender: 'e',
              dateofbirth: '7-04-15',
              maritalstatus: 'gle',
              nationality: 'iopian',
              personaltaxid: '9584732',
              emailaddress: 'b.taye@example.com',
              socialinsurance: '558932',
              healthinsurance: '229584',
              phonenumber: '+911223344',
              primaryaddress: ' Sunshine Avenue',
              country: 'Eopia',
              state: 'Ad Ababa',
              city: 'Ad Ababa',
              postcode: '0',
              emefullname: 'ta Taye',
              emephonenumber: '+254556677',
              emestate: 'Ad Ababa',
              emecity: 'Ad Ababa',
              emepostcode: '1',
            },
            job: {
              employeeid: '001',
              serviceyear: '3',
              joindate: '203-10',
              jobtitle: 'Frnd Developer',
              positiontype: 'Fuime',
              employmenttype: 'Pnent',
              linemanager: 'Sl Bekele',
              contractnumber: 'C42',
              contractname: 'Frod Developer Contract',
              contracttype: 'Indite',
              startdate: '2022-0',
              enddate: '',
            },
            payroll: {
              employeestatus: 'Ae',
              employmenttype: 'Pnent',
              jobdate: '202-10',
              lastworkingdate: '',
              salary: 25000,
              offset: 200,
              onset: 100,
            },
            documents: {
              files: [
                {
                  name: 'Empent Contract.pdf',
                  url: 'https://example.com/files/contract.pdf',
                },
                {
                  name: 'tailwind_cheat_sheet.pdf',
                  url: 'https://example.com/files/idcard.png',
                  type: 'application/pdf',
                  size: 3717,
                  webkitRelativePath: '',
                },
                {
                  name: 'tailwind_cheat_sheet.pdf',
                  url: 'https://example.com/files/idcard.png',
                  type: 'application/pdf',
                  size: 3717,
                  webkitRelativePath: '',
                },
                {
                  name: 'tailwind_cheat_sheet.pdf',
                  url: 'https://example.com/files/idcard.png',
                  type: 'application/pdf',
                  size: 3717,
                  webkitRelativePath: '',
                },
                {
                  name: 'tailwind_cheat_sheet.pdf',
                  url: 'https://example.com/files/idcard.png',
                  type: 'application/pdf',
                  size: 3717,
                  webkitRelativePath: '',
                },
                {
                  name: 'tailwind_cheat_sheet.pdf',
                  url: 'https://example.com/files/idcard.png',
                  type: 'application/pdf',
                  size: 3717,
                  webkitRelativePath: '',
                },
              ],
            },
          },
        ];
        setEmployeeData(daattaa.data);
        setOriginalData(daattaa.data);
        // setEmployeeData(response[0]);
        // setOriginalData(response[0]);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [axiosPrivate, employeeId]);

  const handleDocumentUpdate = (updatedFiles) => {
    setEmployeeData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        files: updatedFiles,
      },
    }));
  };

  const handleEditToggle = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (section, field, value) => {
    setEmployeeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };
  const handleSave = async (section) => {
    try {
      const payload = { [section]: employeeData[section] };
      console.log('Sending payload:', payload);
      const data = {
        ...employeeData,
        [section]: employeeData[section],
      };

      setEmployeeData(data);
      setOriginalData(data);
      setEditMode((prev) => ({ ...prev, [section]: false }));
      const res = await axiosPrivate.put(`/employees/${employeeId}/`, data);
      console.log(
        'Saved successfully (simulated):',
        data,
        ' Response:',
        res.data
      );



// const photos = formData.documents?.files;
// console.log(photos)
// if (photos) {
// const photosArray = photos instanceof File ? [photos] : Array.from(photos);
// photosArray.forEach(photo => {
// uploadData.append("photo", photo);
// });
// }







    } catch (err) {
      console.error('Save failed:', err);
      setError('Failed to save. Try again.');
    }
  };

  const handleCancel = (section) => {
    if (!originalData) return;
    setEmployeeData((prev) => ({
      ...prev,
      [section]: originalData[section],
    }));
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <ThreeDots />
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg">
        {error}
      </div>
    );

  if (!employeeData)
    return (
      <div className="p-4 text-center text-gray-500">
        No employee data available.
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full justify-start overflow-y-auto scrollbar-hidden bg-slate-50 dark:bg-slate-900">
      {/* <Header Title={"Employee Detail"} Breadcrumb={"Employee detail"} /> */}

      {/* <div className="flex flex-col flex-1  overflow-y-scroll rounded-md h-full"> */}
      <div className="h-fit  rounded-xl">
        {/* <EmployeeProfile employeeData={employeeData}/> */}
        {/* <ProfileHeader employeeData={employeeData} setEmployeeData={setEmployeeData} /> */}
      

  <ProfileHeader 
    employeeData={employeeData} 
    setEmployeeData={setEmployeeData} 
  />
      </div>

      <div className="flex flex-col rounded-md h-full flex-1 gap-4 ">
        <StepHeader
          classname="flex justify-start items-start  px-4 my-2 m-0 *:h-12 min-h-fit max-h-fit  gap-5 border-b border-gray-200 bg-transparent "
          notcurrentsytle="border-gray-50"
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        <div className="flex-1 flex  flex-col gap-3.5 pb-1 ">
          <RenderStepContent
          style=''
          myDocument={true}
            currentStep={currentStep}
            editMode={editMode}
            employeeData={employeeData}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleEditToggle={handleEditToggle}
            handleDocumentUpdate={handleDocumentUpdate}
            editable={{
              general: true,
              job: false,
              payroll: false,
              documents: true,
            }}
          />
          {currentStep === 2 && (
            <MyPayrollPage
              headerfont="text-xl"
              background={'   rounded bg-white'}
            />
          )}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default MyProfile;
