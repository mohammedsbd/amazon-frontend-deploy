import React from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import './header.css'

const LowerHeader = () => {
  return (
    <div className='lowwer__container'>
      <ul>
        <li className='all'>
            < MenuIcon/>
            <p >All</p></li>

            
        <li>Todays Deals</li>
        <li>Customer Services</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader
