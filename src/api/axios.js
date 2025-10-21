import axios from "axios";
const BASE = "http://localhost:5000"
export default axios.create(
    {
        baseURL:BASE,
        withCredentials:true
    }
)