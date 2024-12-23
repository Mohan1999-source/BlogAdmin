import React from 'react';
import './Sidebar.css';
import add_product_icon from '../../assets/Product_Cart.svg';
import { Link } from 'react-router-dom';
import list_product_icon from '../../assets/listicon.png';


const Sidebar = () => {
  return (
    <div className='sidebar' >
         <Link to={'/addblog'} style={{textDecoration:"none"}} >
         <div className='sidebar-item'>
             <img src={add_product_icon}  alt='addproduct-icon'/>
             <p>Add Blog</p>
         </div>
         </Link>
         <Link to={'/listblog'} style={{textDecoration:"none"}} >
         <div className='sidebar-item'>
             <img src={list_product_icon}  alt='addproduct-icon'/>
             <p>Blog List</p>
         </div>
         </Link>
    </div>
  )
}

export default Sidebar;
