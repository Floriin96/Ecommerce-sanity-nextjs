import React, { useMemo, useState } from "react";

import { client } from "../lib/client";
import {
  Product,
  FooterBanner,
  HeroBanner,
  CardsHome,
  Products,
} from "../components";
import YouTube from "react-youtube";

const Home = ({ products, bannerData, categories }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <CardsHome categories={categories.filter((cat) => cat.showHome)} />

      <div className="products-heading">
        <h2>Toni-C Richardson</h2>
        <p> Best Prestige products</p>
      </div>

      <Products
        products={products}
        categories={categories}
        defaultCategory={null}
      />

      <div className="products-container1">
        <br />
        <YouTube videoId="1H8F6iSpXL0" />
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const categoriesQuery = '*[_type == "category"]';
  const categories = await client.fetch(categoriesQuery);

  return {
    props: { products, bannerData, categories },
  };
};

export default Home;
