import React, { useMemo, useState } from "react";

import { client } from "../lib/client";
import {
  FooterBanner,
  HeroBanner,
  CardsHome,
  Products,
  Product,
} from "../components";
import YouTube from "react-youtube";

const Home = ({ products, bannerData, categories }) => {
  products = products.map((p) => ({ ...p, categories: p.categories || [] }));

  const bestSellerCategory = categories.find(
    (cat) => cat?.name?.toLowerCase().trim() === "best sellers"
  );
  const productsToShow = products.filter((p) =>
    p.categories.find((cat) => cat?._ref === bestSellerCategory?._id)
  );

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <h2
        style={{ textAlign: "center", color: "var(--gold)", marginTop: "2em" }}
      >
        Raypath Catalog
      </h2>

      <CardsHome categories={categories.filter((cat) => cat.showHome)} />

      <div className="products-heading">
        <h2>Toni-C Richardson</h2>
        <p> Best Sellers products</p>
      </div>

      <div className="products-container">
        {productsToShow?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <div className="products-container1">
        <br />
        <YouTube videoId="1H8F6iSpXL0" />
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product" && hidden != true]';
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
