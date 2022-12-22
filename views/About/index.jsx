import React from "react";
import { MarkedImage } from "../../components";
import { urlFor } from "../../lib/client";
import { PortableText } from "@portabletext/react";
import classes from "./style.module.css";

const AboutView = ({ sections }) => {
  return (
    <div>
      <h1 className={classes.title}>Despre noi</h1>
      {sections
        .filter(({ content, image, title }) => content || image || title)
        .map(({ _key, content, image, title, right }) => (
          <section
            className={`${classes.section} ${right ? classes.right : ""}`}
            key={_key}
          >
            <div className={classes.sectionContent}>
              {title && <h3>{title}</h3>}
              {content && <PortableText value={content} />}
            </div>
            {image && (
              <MarkedImage src={urlFor(image)} style={{ width: "300px" }} />
            )}
          </section>
        ))}
    </div>
  );
};

export default AboutView;
