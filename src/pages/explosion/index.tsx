import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import boom from "../../assets/img/boom.png";
import arbre from "../../assets/img/arb_9.png";
import cigarette from "../../assets/img/cig_1.png";
import nucleaire from "../../assets/img/nuc_2.png";
import bouteille from "../../assets/img/bot_3.png";
import earth from "../../assets/img/ear_7.png";
import manchot from "../../assets/img/man_6.png";
import petrole from "../../assets/img/pet_5.png";
import toxique from "../../assets/img/tox_4.png";
import whale from "../../assets/img/wha_8.png";

const Ennemie: StaticImageData[] = [
  cigarette,
  nucleaire,
  bouteille,
  toxique,
  petrole,
];
const Alie: StaticImageData[] = [arbre, earth, manchot, whale];

function Item({
  image,
  onClick,
  clicked,
}: {
  image: StaticImageData;
  onClick: () => void;
  clicked: boolean;
}) {
  const [randomPositions] = useState({
    top: Math.round(75 + Math.random() * (window.innerHeight * 0.6 - 75)),
    left: Math.round(75 + Math.random() * (window.innerWidth - 75)),
  });

  return (
    <Image
      alt={"Item"}
      className={`absolute object-fill w-30 h-30`}
      onClick={onClick}
      src={clicked ? boom : image}
      style={{
        top: randomPositions.top,
        left: randomPositions.left,
      }}
    />
  );
}

function GenerateItem({
  Ennemie,
  Alie,
}: {
  Ennemie: StaticImageData[];
  Alie: StaticImageData[];
}): { image: StaticImageData; etat: string } {
  const tableauCombine: StaticImageData[] = [...Ennemie, ...Alie];
  const rand = Math.floor(Math.random() * tableauCombine.length);

  const etat = rand < Ennemie.length ? "Ennemie" : "Alie";

  return { image: tableauCombine[rand], etat };
}

const Home: React.FC = () => {
  const [items, setItems] = useState<
    { image: StaticImageData; etat: string; clicked: boolean }[]
  >([]);

  useEffect(() => {
    const generatedItems: {
      image: StaticImageData;
      etat: string;
      clicked: boolean;
    }[] = [];
    for (let i = 0; i < 10; i++) {
      const { image, etat } = GenerateItem({ Ennemie, Alie });
      generatedItems.push({ image, etat, clicked: false });
    }
    setItems(generatedItems);
  }, []);

  const setOnClick = (index: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].clicked = true;
      return newItems;
    });
  };

  return (
    <div className={"items"}>
      {items.map((item, index) => (
        <Item
          key={index}
          clicked={item.clicked}
          image={item.image}
          onClick={() => setOnClick(index)}
        />
      ))}
    </div>
  );
};

export default Home;
