import React, { useEffect, useState } from "react";
import Image from "next/image";
import arbre from "../../assets/img/arbre.png";

function Arbre() {
  const [maxWidth, setMaxWidht] = useState(1000);
  const [maxHeight, setMaxHeight] = useState(600);
  const min = 75;

  useEffect(() => {
    if (window !== undefined) {
      setMaxWidht(window.innerWidth - min);
      setMaxHeight(window.innerHeight * 0.6);
    }
  }, []);

  return (
    <Image
      alt={"Arbre"}
      className={`absolute object-fill w-20 h-20`}
      src={arbre}
      style={{
        top: Math.round(min + Math.random() * (maxHeight - min)),
        left: Math.round(min + Math.random() * (maxWidth - min)),
      }}
    />
  );
}

const Home: React.FC = () => {
  const item = document.getElementsByClassName("items");

  return (
    <div className={"items"}>
      <Arbre />
    </div>
  );
};

export default Home;
