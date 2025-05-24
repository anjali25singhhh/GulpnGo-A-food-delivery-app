// import React from 'react'
// import  './Sidebar.css'
// import { assets } from '../../assets/assets'
// import { NavLink } from 'react-router-dom'

// const Sidebar = () => {
//   return (
//     <div className='sidebar'>
//       <div className="sidebar-options">
//         <NavLink to='/add' className="sidebar-option">
//             <img src={assets.add_icon} alt="" />
//             <p>Add Items</p>
//         </NavLink>
//         <NavLink to='/list' className="sidebar-option">
//             <img src={assets.order_icon} alt="" />
//             <p>List Items</p>
//         </NavLink>
//         <NavLink to='/orders' className="sidebar-option">
//             <img src={assets.order_icon} alt="" />
//             <p>Orders</p>
//         </NavLink>
//       </div>
//     </div>
//   )
// }

// export default Sidebar
import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">

        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <img src={assets.order_icon} alt="List Items" />
          <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>

        <NavLink to='/add-restaurant' className="sidebar-option">
          <img src={assets.restaurant_icon || assets.add_icon} alt="Add Restaurant" />
          <p>Add Restaurant</p>
        </NavLink>

        <NavLink to='/restaurants' className="sidebar-option">
          <img src={assets.restaurant_icon || assets.order_icon} alt="List Restaurants" />
          <p>List Restaurants</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
