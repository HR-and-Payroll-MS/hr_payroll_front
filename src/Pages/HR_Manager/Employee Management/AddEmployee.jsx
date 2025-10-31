import React from 'react'
import useForm from '../../../Hooks/useForm';
import Dropdown from '../../../Components/Dropdown';
import Header from '../../../Components/Header';
function AddEmployee() {

    const Department=["HR Management","Payroll officer","Employee"]
    const JobTitle=["HR Management","Payroll officer","Employee"]
    const Role=["HR Management","Payroll officer","Employee"]


    const handleselect = (value)=>{
        console.log("selected: ",value)}
            
        
  const handleForm = async (formData) => {
    console.log(formData)
    // try {
    //   await login(data);
      
    // } catch (err) {
    //     console.log(err);
    //   } finally {
    // }
  };
    const { values, handleChange, handleSubmit } = useForm(
    { firstname: '', lastname: '' ,employeeid:'',email:'',phonenumber:'',address:'',joiningdate:'',department:'',basesalary:'',allowance:'',bonus:''},
    handleForm
  );
    const formContainer = (
    <div
      id="form_container"
      className="justify-center flex-1   flex flex-col p-8 dark:bg-slate-800 dark:*:text-slate-300  bg-white text-black"
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
              <input className="my-1 border border-gray-300 p-2 rounded w-full" type="text" onChange={handleChange} value={values.firstname} name="firstname" id="firstname" placeholder="First name" />
              <input className="my-1 border border-gray-300 p-2 rounded w-full" type="text" onChange={handleChange} value={values.lastname} name="lastname" id="lastname" placeholder="Last Name" />
            </div>
          </div>
         {/* .......................................... Employee ID ............................................ */}
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="employeeid">
              Employee ID <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="text" name="employeeid" onChange={handleChange} value={values.employeeid} 
              id="employeeid"
              placeholder="Employee ID"
            />
          </div>
         {/* .......................................... Email ............................................ */}
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="email">
              Email <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="email" name="email" onChange={handleChange} value={values.email} 
              id="email"
              placeholder="Email"
            />
          </div>
         {/* .......................................... Phone Number ............................................ */}
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="phonenumber">
              Phone number <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="number" name="phonenumber" onChange={handleChange} value={values.phonenumber} 
              id="phonenumber"
              placeholder="Phone Number"
            />
          </div>
         {/* .......................................... Address ............................................ */}
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="address">
              Address <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="text" name="address" onChange={handleChange} value={values.address} 
              id="address"
              placeholder="Address"
            />
          </div>
          <div className='flex gap-4 w-full justify-between'>
          <div className="py-2 flex-1">
            <label className="w-full text-xs font-semibold" htmlFor="department">
              Job Title <span className="text-red-700">*</span>
            </label>
            <Dropdown options={Department} placeholder = "choose an option" name="department" onChange={handleChange}/>
          </div>
          <div className="py-2 flex-1">
            <label className="w-full text-xs font-semibold" htmlFor="department">
              Department <span className="text-red-700">*</span>
            </label>
            <Dropdown options={Department} placeholder = "choose an option" onChange={handleselect}/>
          </div>
          <div className="py-2 flex-1">
            <label className="w-full text-xs font-semibold" htmlFor="department">
              Role / Permision level <span className="text-red-700">*</span>
            </label>
            <Dropdown options={Department} placeholder = "choose an option" onChange={handleselect}/>
          </div></div>
         {/* .......................................... Joining Date ............................................ */}
          <div className="py-2">
            <label className="w-full text-xs font-semibold" htmlFor="joiningdate">
              Joining Date <span className="text-red-700">*</span>
            </label>
            <input className="my-1 border  border-gray-300  p-2 rounded w-full" type="date" name="joiningdate" onChange={handleChange} value={values.joiningdate} 
              id="joiningdate"
            />
          </div>         
          {/* .......................................... Full Name ............................................ */}
          <div className="py-2">
            <label className="w-full text-xs font-semibold " htmlFor="Full Name">
              Salary Details <span className="text-red-700">*</span>
            </label>
            <div className='flex flex-col gap-2.5'>
              <input className="my-1 border border-gray-300 p-2 rounded w-full" type="text" onChange={handleChange} value={values.basesalary} name="basesalary" id="basesalary" placeholder="Base Salary" />
              <input className="my-1 border border-gray-300 p-2 rounded w-full" type="text" onChange={handleChange} value={values.allowance} name="allowance" id="allowance" placeholder="Allowance" />
              <input className="my-1 border border-gray-300 p-2 rounded w-full" type="text" onChange={handleChange} value={values.bonus} name="bonus" id="bonus" placeholder="Bonus" />
            </div>
          </div>
          <div className='flex gap-3.5 w-full justify-around'>
          <button
            type="submit"
            className="items-center justify-center dark:bg-slate-400 dark:text-slate-800 bg-slate-800 inline-flex px-32 py-2.5 rounded-md text-sm font-semibold text-slate-100"
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
    <Header className="bg-gray-50 p-2.5" Title="Add employees"  Breadcrumb={"this is the path to the employee thing"}/>
    {formContainer}
    </>
  )
}

export default AddEmployee