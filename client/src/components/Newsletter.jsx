import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32 '>
      <h1 className='md:text-4xl text-2xl font-semibold'>Never miss an Opportunity!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get latest news, exxclusive opportunities, new tech and startups</p>
      <form className='flex item-center justify-between max-w-2xl w-full md:h-13 h-12'>
        <input className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' type="text" placeholder='Enter Your Email ID ' required />
        <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-1-none'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter
