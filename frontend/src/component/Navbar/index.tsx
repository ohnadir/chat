import React from 'react'
import "./Navbar.scss"
import { FaFacebookMessenger } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <div className='desktop-brand-name'>Chat</div>
        <div className='mobile-brand-name'>CC</div>
        <div className='right-container'>
          <FaFacebookMessenger size={20}/>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Navbar