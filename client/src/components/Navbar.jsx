import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const {navigate, token} = useAppContext()

  return (
    <div className='flex justify-between items-centre py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img onClick={() =>navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44' />
      <button onClick={() =>navigate('/admin')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>{token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} className='' alt="arrow" />
      </button>
    </div>
  )
}

export default Navbar
