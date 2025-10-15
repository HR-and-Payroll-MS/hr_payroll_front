import React from 'react'
import useAuth from '../../Hooks/useAuth'

function log() {

    const {login}=useAuth();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (formData) => {
        setLoading(true);
        setMessage("");
        try{
            // login returns accessToken and user, and backend sets refresh cookie
            const res =await axios.post("http://localhost:4000/login",formData,{withCredentials:true});
            const {accessToken, user} = res.data;
            login({accessToken, user });
            message("Login successfull")
        } catch(err) {
            setMessage(err.response?.data?.message|| err.message);
        } finally {
            setLoading(false);
        }
    };

    const { values, handleChange, handleSubmit } = useForm({email:"",password:""},handleLogin)
  return (
    <div>
        {/*
    const {values, handleChange, handleSubmit} = useForm({email:"",Password:""},(data)=>{console.log("form submiteted:", data);});

    return {
    <form onSubmit={handleSubmit}>
        <input 
            name = "email"
            value= {values.email}
            onChange = {handleChange}
            placeholder= "Email" />

    </form>
    }
*/}
    </div>
  )
}

export default log