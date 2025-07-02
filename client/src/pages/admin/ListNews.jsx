import React, { useEffect, useState } from 'react'
import { news_data } from '../../assets/assets'
import NewsTableItem from '../../components/admin/NewsTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ListNews = () => {

  const [news, setNews] = useState([])
  const {axios} = useAppContext()

  const fetchNews = async ()=> {
    try {
      const {data} = await axios.get('/api/admin/news')
      if(data.success){
        setNews(data.news)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchNews()
  },[])


  return (
    <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1>All News</h1>

      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                <th scope='col' className='px-2 py-4'>News Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'> Date </th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'> Status </th>
                <th scope='col' className='px-2 py-4'> Action </th>
              </tr>
            </thead>
            <tbody>
              {news.map((news, index)=>{
                return <NewsTableItem key={news._id} news={news} fetchNews={fetchNews} index={index + 1 }/>
              })}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ListNews
