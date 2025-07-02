import React, { useState } from 'react'
import { motion } from "motion/react"
import { news_data , newsCategories } from '../assets/assets'
import NewsCard from './NewsCard'
import {useAppContext} from  '../context/AppContext.jsx'

const Newslist = () => {
  const [menu, setMenu] = useState("All")
  const {news, input} = useAppContext()

  const filteredNews = ()=>{
    if(input === ''){
      return news
    }
    return news.filter((news)=> news.title.toLowerCase().includes(input.toLowerCase()) || news.category.toLowerCase().includes(input.toLowerCase()))
  }
  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {newsCategories.map((item)=>(
          <div key ={item} className='relative'>
            <button onClick={()=> setMenu(item)} className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
              {item}
              {menu === item && (
                <motion.div layoutId='underline' transition ={{type: 'spring', stiffness:500, damping:30}} className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'>
              </motion.div>
              )}
              
            </button>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filteredNews().filter((news)=> menu ==="All" ? true : news.category === menu).
        map((news)=> <NewsCard key={news._id} news={news} />)}
      </div>
    </div>
  )
}

export default Newslist
