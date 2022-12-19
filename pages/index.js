import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import YouTube from 'react-youtube';

const Home = ({ products, bannerData, }) => (

  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    <div className="products-heading">
      <h2>Toni-C Richardson</h2>
      <p> Best Prestige products</p>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <div className="products-container1">
      <br />
      <YouTube videoId="1H8F6iSpXL0" />
    </div>
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>

);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;
