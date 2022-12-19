import React from 'react';
import Link from 'next/link';
import periuta1 from '../public/periuta1.jpeg'
import periuta2 from '../public/periuta2.jpeg'

import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner: {discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
       <div className="left">
        <img layout="intrinsic"
          src={periuta1.src} className="footer-banner-image2"> 
        </img>
        </div>
        <div className="right">
        <img layout="intrinsic"
          src={periuta2.src}  className="footer-banner-image"
        />
        </div>
      </div>
    </div>
  )
}

export default FooterBanner