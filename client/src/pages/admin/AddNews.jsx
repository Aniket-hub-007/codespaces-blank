import React, { useEffect, useRef, useState } from 'react'
import { assets, newsCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddNews = () => {

  const {axios} = useAppContext()
  const [isAdding, setIsAdding] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('StartUp');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async ()=> {

  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      const news = {
        title, subTitle, description:quillRef.current.root.innerHTML,category, isPublished
      }

      const formData = new FormData();
      formData.append('news',JSON.stringify(news))
      formData.append('image',image)

      const {data} = await axios.post('/api/news/add', formData);

      if(data.success){
        toast.success(data.message);
        setImage(false)
        setTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('StartUp')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsAdding(false)
    }
  }

  useEffect(()=>{
    //initiate quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  },[])

  return (
    <div className='w-full min-h-screen bg-blue-50/50 p-4'>
      <form 
        onSubmit={onSubmitHandler} 
        className='w-full h-full overflow-y-auto text-gray-600'
      >
        <div className='w-full bg-white p-6 shadow rounded'>
          {/* Upload Image */}
          <p>Upload Thumbnail</p>
          <label htmlFor="image" className="block cursor-pointer">
            <img 
              src={!image ? assets.upload_area : URL.createObjectURL(image)} 
              alt="thumbnail" 
              className='mt-2 h-16 rounded' 
            />
            <input 
              onChange={(e) => setImage(e.target.files[0])} 
              type="file" 
              id='image' 
              hidden 
              required 
            />
          </label>

          {/* News Title */}
          <p className='mt-4'>News Title</p>
          <input 
            type="text" 
            placeholder='Type here' 
            required 
            className='w-full mt-2 p-2 border border-gray-300 outline-none rounded' 
            onChange={e => setTitle(e.target.value)} 
            value={title} 
          />

          {/* News Subtitle */}
          <p className='mt-4'>News Sub Title</p>
          <input 
            type="text" 
            placeholder='Type here' 
            required 
            className='w-full mt-2 p-2 border border-gray-300 outline-none rounded' 
            onChange={e => setSubTitle(e.target.value)} 
            value={subTitle} 
          />

          <p className='mt-4'>Description</p>
          <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            <div ref={editorRef}></div>
            <button type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer '>Generate with AI</button>
          </div>

          <p className='mt-4'>Category</p>
          <select onChange={e => setCategory(e.target.value)} name='category' className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
            <option value="">Select category</option>
            {newsCategories.map((item, index)=>{
              return <option key={index} value={item}>{item}</option>
            })}
          </select>
          
          <div className='flex  gap-2 mt-4'>
            <p>Publish Now</p>
            <input type='checkbox' checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIsPublished(e.target.checked)} />
          </div>

          <button type="submit" className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
            {isAdding ? 'Adding' : 'Add News'}
          </button>

        </div>
      </form>
    </div>
  )
}

export default AddNews
