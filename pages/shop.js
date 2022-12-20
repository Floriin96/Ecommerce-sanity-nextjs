import React from "react";
import { Products } from "../components";
import { client } from "../lib/client";

const Shop = ({ category, categories, products }) => {
  return (
    <Products
      products={products}
      categories={categories}
      defaultCategory={category}
      style={{ marginTop: "2em" }}
    />
  );
};

export const getServerSideProps = async ({
  query: { category: searchCategory },
}) => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const categoriesQuery = '*[_type == "category"]';
  const categories = await client.fetch(categoriesQuery);

  const category = categories.find(
    (cat) => cat?.name?.toLowerCase() === searchCategory?.toLowerCase()
  );

  return {
    props: JSON.parse(
      JSON.stringify({
        products,
        categories,
        category,
      })
    ),
  };
};

export default Shop;
