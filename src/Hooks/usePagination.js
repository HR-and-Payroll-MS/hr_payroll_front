import { useEffect, useState } from "react"

export const usePagination = (url, limit=10) =>{
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try{
                const res = await axios.get(`${url}?page=${page}&limit=${limit}`)
                setData(res.data.data)
                setTotalPages(res.data.totalPages)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
            fetchData()
        }
    },[url,page,limit])


return {data, page, setPage, totalPages, loading}



}