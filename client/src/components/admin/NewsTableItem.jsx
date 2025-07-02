import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const NewsTableItem = ({news, fetchNews, index}) => {


    const {title, createdAt} =  news;
    const NewsDate = new Date (createdAt)

    const { axios } = useAppContext();

    const deleteNews = async ()=>{
      const confirm = window.confirm('Are you sure you want to delete this news')
      if(!confirm) return;
      try {
        const { data } = await axios.post('/api/news/delete', {id: news._id})
        if(data.success){
          toast.success(data.message)
          await fetchNews()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const togglePublish = async ()=>{
      try {
        const { data } = await axios.post('/api/news/toggle-publish', {id: news._id})
        if(data.success){
            toast.success(data.message)
            await fetchNews()
          }else{
            toast.error(data.message)
          }
      } catch (error) {
        toast.error(error.message)
      }
    }


  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{ index }</th>
      <td className='px-2 py-4'>{ title }</td>
      <td className='px-2 py-4 max-sm:hidden'> {NewsDate.toDateString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${news.isPublished ? "text-green-600" : "text-orange-700"}`}>{news.isPublished ? 'Published' :'Unpublished'}</p>
      </td>
      <td className='px-2 py-4 flex text-xs gap-3'>
        <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{news.isPublished ? 'Unpublish' :'Publish'}</button>
        <img src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' alt="" onClick={deleteNews} />
      </td>
    </tr>
  )
}

export default NewsTableItem
