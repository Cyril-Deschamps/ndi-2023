import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import boom from "../../assets/img/boom.png";

import arbre from "../../assets/img/arbre.png";
import cigarette from "../../assets/img/cig_1.png";
import nucleaire from "../../assets/img/nuc_2.png";
import bouteille from "../../assets/img/bot_3.png";

const Alie: StaticImageData[] = [cigarette, nucleaire, bouteille];
const Ennemie: StaticImageData[] = [arbre];

function Item() {
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

function GenerateItem(Ennemie: StaticImageData[], Alie: StaticImageData) {
  const [randomImage] = useState(imgs[]);
  
  const min = 0;
  const max = Ennemie.length + Alie.length; 
  let rand = min + (Math.random() * (max-min));
  
}

const Home: React.FC = () => {
  return (
    <div className={"items"}>
      <GenerateItem />
    </div>
  );
};

export default Home;
