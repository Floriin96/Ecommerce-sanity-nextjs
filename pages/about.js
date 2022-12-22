import React from "react";
import { client } from "../lib/client";
import AboutView from "../views/About";

const About = ({ about }) => {
  const sections = about?.sections || [];

  return <AboutView sections={sections} />;
};

export const getServerSideProps = async () => {
  const query = '*[_type == "about" && hidden != true]';
  const abouts = await client.fetch(query);

  const about = abouts.pop() || null;

  return {
    props: { about },
  };
};

export default About;
