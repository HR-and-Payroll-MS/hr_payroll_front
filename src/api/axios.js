import axios from "axios";
const BASE = "172.16.27.124:3000/"
export default axios.create(
    {
        baseURL:BASE,
        withCredentials:true
    }
)