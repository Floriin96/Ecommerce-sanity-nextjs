import React from "react";
import { urlFor } from "../../lib/client";
import classes from "./style.module.css";
import { useRouter } from "next/router";

const CardsHome = ({ categories }) => {
  const router = useRouter();
  return (
    <div className={classes.container}>
      {categories.map((cat) => (
        <div
          key={cat._id}
          className={classes.cardContainer}
          style={{
            backgroundImage: `url(${urlFor(cat.image.asset)})`,
          }}
          onClick={() => router.push("/shop?category=" + cat.name)}
        >
          <div className={classes.cardInner}>
            <span className={classes.cardContent}>{cat.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsHome;
