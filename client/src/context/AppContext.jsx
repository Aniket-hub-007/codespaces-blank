import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children })=>{

    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    const [news, setNews] = useState([])
    const [input, setInput] = useState("")

    const fetchNews = async ()=>{
        try {
            const {data} = await axios.get('/api/news/all');
            data.success ? setNews(data.news) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchNews();
        const token = localStorage.getItem('token')
        if(token){
            setToken(token)
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    },[])

    const value = {
        axios, navigate, token, setToken, news, setNews, input, setInput
    }
    
    return(
        <AppContext.Provider value = {value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
};