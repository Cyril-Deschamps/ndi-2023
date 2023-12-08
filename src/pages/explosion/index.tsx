import React, { useEffect, useState } from "react";
import Image from "next/image";
import arbre from "../../assets/img/arbre.png";
import boom from "../../assets/img/boom.png";

function Arbre() {
  const [maxWidth, setMaxWidht] = useState(1000);
  const [maxHeight, setMaxHeight] = useState(600);
  const [clicked, setClicked] = useState(false);
  const [randomPositions] = useState({
    top: Math.round(75 + Math.random() * (maxHeight - 75)),
    left: Math.round(75 + Math.random() * (maxWidth - 75)),
  });

  useEffect(() => {
    if (window !== undefined) {
      setMaxWidht(window.innerWidth - 75);
      setMaxHeight(window.innerHeight * 0.6);
    }
  }, []);

  return (
    <Image
      alt={"Arbre"}
      className={`absolute object-fill w-20 h-20`}
      onClick={() => setClicked(true)}
      src={clicked ? boom : arbre}
      style={{
        top: randomPositions.top,
        left: randomPositions.left,
      }}
    />
  );
}

const Home: React.FC = () => {
  return (
    <div className={"items"}>
      <Arbre />
      <Arbre />
      <Arbre />
      <Arbre />
      <Arbre />
      <Arbre />
      <Arbre />
      <Arbre />
    </div>
  );
};

export default Home;
