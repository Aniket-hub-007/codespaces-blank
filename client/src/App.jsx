import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import News from './pages/News'
import Dashboard from './pages/admin/Dashboard'
import Layout from './pages/admin/Layout'
import AddNews from './pages/admin/AddNews'
import ListNews from './pages/admin/ListNews'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const {token} = useAppContext()

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/news/:id' element={<News/>}/>
        <Route path='/admin' element={token ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='addNews' element={<AddNews/>}/>
          <Route path='listNews' element={<ListNews/>}/>
          <Route path='comments' element={<Comments/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
