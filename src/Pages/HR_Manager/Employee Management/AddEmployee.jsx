import React from 'react'
import useForm from '../../../Hooks/useForm';
import Dropdown from '../../../Components/Dropdown';
function AddEmployee() {

    const Department=["HR Management","Payroll officer","Employee"]
    const JobTitle=["HR Management","Payroll officer","Employee"]
    const Role=["HR Management","Payroll officer","Employee"]


    const handleselect = (value)=>{
        console.log("selected: ",value)}
            
        
  const handleLogin = async (formData) => {
    try {
      await login(data);
      
    } catch (err) {
        console.log(err);
      } finally {
    }
  };
    const { values, handleChange, handleSubmit } = useForm(
    { username: '', password: '' },
    handleLogin
  );
    const formContainer = (
    <div
      id="form_container"
      className="justify-center flex-1   flex flex-col p-8  bg-white text-black"
    >
      <form
        onSubmit={handleSubmit}
        className="  flex-1 flex flex-col items-center p-7 "
        action=""
      >
        <div className=" flex flex-col justify-center  flex-1 w-full ">
         {/* .......................................... Full Name ............................................ */}
          <div className="py-2">
            <label className="w-full text-xs font-semibold " htmlFor="Full Name">
              Full Name <span className="text-red-700">*</span>
            </label>
            <div className='flex gap-2.5'>
              <input className="my-1 border border-gray-300 p-2 rounded w-full" type="text" onChange={handleChange} value={values.email} name="firstname" id="firstname" placeholder="First name" />
              <input className="my-1 border border-gray-300 p-2 rounded w-full" type="text" onChange={handleChange} value={values.email} name="lastname" id="lastname" placeholder="Last Name" />
            </div>
          </div>
         {/* .......................................... Employee ID ............................................ */}
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="employeeid">
              Employee ID <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="text" name="employeeid" onChange={handleChange} value={values.password} 
              id="employeeid"
              placeholder="Employee ID"
            />
          </div>
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="email">
              Email <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="email" name="email" onChange={handleChange} value={values.password} 
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="phonenumber">
              Phone number <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="number" name="phonenumber" onChange={handleChange} value={values.password} 
              id="phonenumber"
              placeholder="Phone Number"
            />
          </div>
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="address">
              Address <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="text" name="address" onChange={handleChange} value={values.password} 
              id="address"
              placeholder="Address"
            />
          </div>
          <div className='flex w-full justify-between'>
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="department">
              Department <span className="text-red-700">*</span>
            </label>
            <Dropdown options={Department} placeholder = "choose an option" onChange={handleselect}/>
          </div>
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="department">
              Department <span className="text-red-700">*</span>
            </label>
            <Dropdown options={Department} placeholder = "choose an option" onChange={handleselect}/>
          </div>
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="department">
              Department <span className="text-red-700">*</span>
            </label>
            <Dropdown options={Department} placeholder = "choose an option" onChange={handleselect}/>
          </div></div>
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="joiningdate">
              Joining Date <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="date" name="joiningdate" onChange={handleChange} value={values.password} 
              id="joiningdate"
            />
          </div>
          <div className='flex gap-3.5 w-full justify-around'>
          <button
            type="submit"
            className="items-center justify-center bg-gray-100 inline-flex px-32 py-2.5 rounded-md text-sm font-semibold text-gray-500"
          >
            Submit
          </button>
          <button
            className="items-center justify-center bg-gray-100 inline-flex px-32 py-2.5 rounded-md text-sm font-semibold text-gray-500"
          >
            Reset
          </button></div>
        </div>
      </form>
    </div>
  );
  return (
    <>
    {formContainer}
    </>
  )
}

export default AddEmployee