import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, comments_data, news_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Footer2 from '../components/Footer2'
import Loader from '../components/Loader'
import {useAppContext} from  '../context/AppContext.jsx'
import toast from 'react-hot-toast'

const News = () => {
  const {id} = useParams()

  const {axios} = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([]) 
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  
  const fetchnewsdata =  async ()=>{
    try {
      const {data} = await axios.get(`/api/news/${id}`)
      data.success ? setData(data.news) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const fetchcomments = async () => {
    try {
      const {  data } = await axios.post('/api/news/comments', {newsId: id})
      if (data.success){
        setComments(data.comments)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const addComment = async (e)=>{
    e.preventDefault();
    try {
      const {  data } = await axios.post('/api/news/comments', {newsId: id , name,content});
      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.messagge);
    }
  }

  useEffect(()=> {
    fetchnewsdata()
    fetchcomments()
  },[])


  return data ? (
    <div className='relative'>      
      <Navbar/>
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Micheal</p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-5'/>
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html:data.description}}></div>

        
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item,index)=> (
              <div key ={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="" className='w-6'/>
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>

        </div>
        {/*comment  section */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4 '>Add Your Comment</p>
          <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>

            <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none'/>
            
            <textarea onChange={(e)=> setContent(e.target.value)} value={content} placeholder='comment' required className='w-full p-2 border border-gray-300 outline-none h-48 '></textarea>
            
            <button type="submit" className='bg-primary text-white roounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>

          </form>

        </div>
        {/* Share Butttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4 ' >Share this Article </p>
          <div className='flex'>
            <img src={assets.facebook_icon} width={50} alt=""/>
            <img src={assets.twitter_icon} width={50} alt=""/>
            <img src={assets.googleplus_icon} width={50} alt=""/>
          </div>
        </div>

      </div>
      <Footer/>
      <Footer2/>

    </div>
  ) : <Loader/>
}

export default News
