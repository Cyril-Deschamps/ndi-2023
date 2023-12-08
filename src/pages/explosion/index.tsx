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
import useSound from "use-sound";

const Ennemie: StaticImageData[] = [
  cigarette,
  nucleaire,
  bouteille,
  toxique,
  petrole,
];
const Alie: StaticImageData[] = [arbre, earth, manchot, whale];

interface ItemProps {
  image: StaticImageData;
  onClick: () => void;
  clicked: boolean;
  position: { top: number; left: number };
}

const Item: React.FC<ItemProps> = ({ image, onClick, clicked, position }) => {
  const [play] = useSound("boom_sound.mp3");

  return (
    <Image
      alt={"Item"}
      className={`absolute object-fill w-30 h-30`}
      onClick={() => {
        onClick();
        play();
      }}
      src={clicked ? boom : image}
      style={{
        top: position.top,
        left: position.left,
      }}
    />
  );
};

interface GeneratedItem {
  image: StaticImageData;
  etat: string;
  clicked: boolean;
  position: { top: number; left: number };
}

const GenerateItem = ({
  Ennemie,
  Alie,
}: {
  Ennemie: StaticImageData[];
  Alie: StaticImageData[];
}): GeneratedItem => {
  const tableauCombine: StaticImageData[] = [...Ennemie, ...Alie];
  const rand = Math.floor(Math.random() * tableauCombine.length);
  const etat = rand < Ennemie.length ? "Ennemie" : "Alie";

  const position = {
    top: Math.round(75 + Math.random() * (window.innerHeight * 0.6 - 75)),
    left: Math.round(75 + Math.random() * (window.innerWidth - 75)),
  };

  return { image: tableauCombine[rand], etat, clicked: false, position };
};

const Home: React.FC = () => {
  const [items, setItems] = useState<GeneratedItem[]>([]);

  useEffect(() => {
    const generatedItems = Array.from({ length: 10 }, () =>
      GenerateItem({ Ennemie, Alie }),
    );
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
          position={item.position}
        />
      ))}
    </div>
  );
};

export default Home;
