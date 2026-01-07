import useAuth from '../Context/AuthContext'
import React, { useEffect } from 'react'
import { useState } from 'react'
function UseAxiosExample() {
    const { axiosPrivate } = useAuth();
    const [data, setData] = useState("");

    useEffect(() => {
        let mounted = true;
        axiosPrivate
            .get("/protected")
            .then((res) => mounted && setData(res.data.data))
            .catch((err) => console.error(err))
        return () => (mounted = false);
    }, [axiosPrivate]);

    return <div >Protected Content: {data}</div>
}

export default useAxiosExample