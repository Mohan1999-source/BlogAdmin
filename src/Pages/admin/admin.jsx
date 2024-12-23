import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddBlog from '../../components/AddBlog/AddBlog';
import ListBlog from '../../components/ListBlog/ListBlog';
import './admin.css'

const Admin = () => {
  return (
    <div className='admin'>
       <Sidebar/>
       <Routes>
          <Route path='/addblog' element={<AddBlog/>}/>
          <Route path='/listblog' element={<ListBlog/>}/>
       </Routes>
    </div>
  )
}

export default Admin;
