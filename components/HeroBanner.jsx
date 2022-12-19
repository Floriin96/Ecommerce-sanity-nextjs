import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
const HeroBanner = ({ heroBanner}) => {
  return (
    <div>
      <div className="primaImagine">
      <img layout="intrinsic" src={urlFor(heroBanner.image)} />
      </div>
      <div className="hero-banner-container">

        <div>
          <p className="periute de dinti"></p>
          <h3>{heroBanner.midText}</h3>
          <h1>{heroBanner.largeText1}</h1>
          <img src={urlFor(heroBanner.image)} alt="periute de dinti" className="hero-banner-image"/>

          <div>
            <Link href={`/product/${heroBanner.product}`}>
              <button type="button">{heroBanner.buttonText}</button>
            </Link>
            <div className="desc">
              <h2>Viorica Ancuta Carcu</h2>
              <p>{heroBanner.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default HeroBanner