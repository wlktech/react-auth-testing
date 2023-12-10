import { useEffect, useState } from 'react'

const useFetch = (url) => {
  
    let [data, setData] = useState([]);
    let [page, setPage] = useState([]);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);

    useEffect(()=>{
        let abortController = new AbortController();
        let signal = abortController.signal;

        setLoading(true)
        fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization' : "Bearer " + localStorage.getItem('token')
              // Other headers if required
            }, signal
        })
        .then(res => {
            if(!res.ok){
                throw Error("Something Went Wrong!")
            }
            return res.json()
        })
        .then(data => {
            setData(data.blogs.data);
            console.log(data.blogs.links);
            setPage(data.blogs.links);
            setLoading(false)
        })
        .catch(e =>{
            setError(e.message)
        })

        //cleanup function
        return () =>{
            abortController.abort();
        }

    }, [url])

    return {data, page, loading, error}
}

export default useFetch