import React from "react";
import classes from "./style.module.css";

const MarkedImage = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <img {...props} />
      </div>
    </div>
  );
};

export default MarkedImage;
