import { useEffect, useState } from "react"
import useAuth from "../Context/AuthContext";

export const usePagination = (url, limit=10,exdata,totPag) =>{
    const [data, setData] = useState([]);
    const {axiosPrivate} = useAuth()
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        // const fetchData =  () => {
        const fetchData = async () => {
            setLoading(true);
            try{
                // console.log(exdata)
                setTotalPages(totPag)
                if(url){
                // const res = await axios.get(`${url}?page=${page}&limit=${limit}`)
                const res = await axiosPrivate.get(url)
                // const res = await axiosPrivate.get(`${url}?page=${page}&limit=${limit}`)
                // console.log(res.data)
                setData(res.data.results)
                }
                else{
                setData(exdata)}
                // setTotalPages(res.data.totalPages)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
            fetchData()
    },[url,page,exdata,limit])


return {data, page, setPage, totalPages, loading}



}