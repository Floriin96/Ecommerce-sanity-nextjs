import React from 'react';
import periuta1 from '../public/periuta1.jpeg'
import periuta2 from '../public/periuta2.jpeg'
// import periutaHer from '../public/periutaher.avi'
// import periutaHim from '../public/periutahim.avi'

const FooterBanner = ({ footerBanner: { } }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <video src="/periutaher.mp4" className="footer-banner-image" muted loop autoPlay></video>
          { <img layout="intrinsic"
            src={periuta1.src} className="footer-banner-image9" /> }
        </div>
        <div className="right">
        <video src="/periutahim.mp4" className="footer-banner-image2" muted loop autoPlay></video>

          { <img layout="intrinsic"
            src={periuta2.src} className="footer-banner-image8"
          /> }
        </div>
      </div>
    </div>
  )
}

export default FooterBanner