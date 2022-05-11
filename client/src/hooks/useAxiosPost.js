import axios from 'axios';
import { useEffect, useState } from 'react'

axios.defaults.baseURL = "http://127.0.0.1:8000/get_movies/"


const useAxiosPost = ({ url, header=null, body=null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchData = () => {
          axios 
          .post(url, JSON.parse(body), JSON.parse(header))
          .then(res => {setResponse(res.data)})
          .catch(err => setError(err))
          .finally(() => setLoading(false))
      }
      fetchData();
    }, [url, header, body])

    return { response, error, loading }
}

export default useAxiosPost
