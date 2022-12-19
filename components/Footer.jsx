import Link from 'next/link';
import React from 'react';
import { AiFillInstagram, AiOutlineFacebook, } from 'react-icons/ai';
import {FaTiktok} from 'react-icons/fa';
const Footer = () => {
  return (
    
    <div className="footer-container">
       <p>2022 Toni-C Richardson All right reserved</p>
       <p className="icons">

         <a href="https://instagram.com/vioricaancuta?igshid=YmMyMTA2M2Y=">
         <AiFillInstagram
         icon={AiFillInstagram}>
         </AiFillInstagram>
         </a>
         <a href="https://www.facebook.com/carcu.vioricaancuta">
         <AiOutlineFacebook 
         icon={AiOutlineFacebook}>
         </AiOutlineFacebook>
         </a>
         <a href="https://www.tiktok.com/@ancutavioricacarcu?_r=1&_t=8W4W2Ww3GiM&lang=ro-RO">
          <FaTiktok
          icon={FaTiktok}>
          </FaTiktok>
          </a>






       </p>
    </div>
  )
}

export default Footer