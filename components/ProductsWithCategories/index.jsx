import React, { useState, useMemo } from "react";
import { Product } from "..";
import classes from "./style.module.css";

const ProductsWithCategories = ({
  defaultCategory,
  categories,
  products,
  className = "",
  ...props
}) => {
  products = products.map((p) => ({ ...p, categories: p.categories || [] }));
  const [category, setCategory] = useState(defaultCategory || null);

  const toogleCategory = (cat) => {
    setCategory(category?._id === cat?._id ? null : cat);
  };

  console.log(category);

  const productsToShow = useMemo(() => {
    return category
      ? products.filter((p) =>
          p?.categories.some((cat) => cat?._ref === category?._id)
        )
      : products;
  }, [category, products]);

  return (
    <div className={`${classes.container} ${className}`} {...props}>
      <nav className={classes.categories}>
        <p
          className={classes.category}
          style={{
            color: category === null ? "#efb810" : "white",
          }}
          onClick={() => toogleCategory(null)}
        >
          All
        </p>
        {categories.map((cat) => (
          <p
            key={cat._id}
            className={classes.category}
            style={{
              color: category?._id === cat?._id ? "#efb810" : "white",
            }}
            onClick={() => toogleCategory(cat)}
          >
            {cat.name}
          </p>
        ))}
      </nav>

      <label className={classes.selectWrapper}>
        <select
          className={classes.select}
          onChange={(e) => {
            const value = e.target.value;
            setCategory(value ? JSON.parse(value) : null);
          }}
          value={category ? JSON.stringify(category) : ""}
        >
          <option value={""}>All</option>
          {categories.map((cat) => (
            <option value={JSON.stringify(cat)} key={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <div className="products-container">
        {productsToShow?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsWithCategories;
