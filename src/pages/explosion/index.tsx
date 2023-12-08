import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import boomImage from "../../assets/img/boom.png";
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

interface GeneratedItem {
  image: StaticImageData;
  etat: string;
  clicked: boolean;
  position: { top: number; left: number };
}

const Item: React.FC<{ item: GeneratedItem; onClick: () => void }> = ({
  item,
  onClick,
}) => {
  const [play] = useSound("explo.mp3");

  useEffect(() => {
    if (item.clicked && item.image === boomImage) {
      play();
    }
  }, [item.clicked, item.image, play]);

  return (
    <Image
      alt={"Item"}
      className={`absolute object-fill w-20 h-20 ${
        item.clicked && item.image === boomImage ? "hidden" : ""
      }`}
      onClick={() => {
        onClick(), play();
      }}
      src={item.clicked ? boomImage : item.image}
      style={{ top: item.position.top, left: item.position.left }}
    />
  );
};

const generateItem = (
  Ennemie: StaticImageData[],
  Alie: StaticImageData[],
): GeneratedItem => {
  const ennemieOrAlie = Math.random() < 0.5 ? "Ennemie" : "Alie";
  const sourceArray = ennemieOrAlie === "Ennemie" ? Ennemie : Alie;
  const rand = Math.floor(Math.random() * sourceArray.length);

  return {
    image: sourceArray[rand],
    etat: ennemieOrAlie,
    clicked: false,
    position: {
      top: Math.round(75 + Math.random() * (500 - 75)),
      left: Math.round(75 + Math.random() * (800 - 75)),
    },
  };
};

const Home: React.FC = () => {
  const [items, setItems] = useState<GeneratedItem[]>([]);
  const [score, setScore] = useState<number>(0);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  useEffect(() => {
    const generatedItems = Array.from({ length: 10 }, () =>
      generateItem(Ennemie, Alie),
    );
    setItems(generatedItems);
  }, []);

  const setOnClick = (index: number) => {
    setClickedIndex(index);

    setItems((prevItems) => {
      const newItems = [...prevItems];
      const clickedItem = newItems[index];

      if (!clickedItem.clicked) {
        if (clickedItem.etat === "Ennemie") {
          setScore((prevScore) => prevScore + 1);
        } else if (clickedItem.etat === "Alie") {
          setScore((prevScore) => prevScore - 1);
        }

        clickedItem.clicked = true;

        // Régénérer seulement l'élément cliqué après 2 secondes
        setTimeout(() => {
          setItems((prevItems) => {
            return prevItems.map((item, i) => {
              if (i === index) {
                const newPosition = {
                  top: Math.round(75 + Math.random() * (500 - 75)),
                  left: Math.round(75 + Math.random() * (800 - 75)),
                };

                const ennemieOrAlie = Math.random() < 0.5 ? "Ennemie" : "Alie";
                const sourceArray =
                  ennemieOrAlie === "Ennemie" ? Ennemie : Alie;
                const rand = Math.floor(Math.random() * sourceArray.length);

                return {
                  ...item,
                  clicked: false,
                  position: newPosition,
                  image: sourceArray[rand],
                  etat: ennemieOrAlie,
                };
              }

              return item;
            });
          });
        }, 500);
      }

      return newItems;
    });
  };

  const isVictory = score === 10 || items.every((item) => item.etat === "Alie");

  const defeat = score < 0;

  return (
    <div
      className={
        "bg-[url('https://media.moddb.com/images/games/1/16/15935/screenshot_20229089.jpg')] w-screen h-screen bg-cover"
      }
    >
      {isVictory ? (
        <div
          className={"grid h-screen place-items-center text-5xl font-medium"}
        >
          <p>VOUS AVEZ SAUVE LA ZONE !</p>
          <p className={"text-red-500"}>INDICE : "ARI"</p>
          <button
            className={
              "bg-blue-500 hover:bg-red-400-700 text-white font-bold py-2 px-4 rounded-full"
            }
          >
            <a href={""}>PROCHAINE DESTINATION</a>
          </button>
        </div>
      ) : (
        <>
          <div className={"score text-4xl"}>Score: {score}</div>
          <div className={"items"}>
            {items.map((item, index) => (
              <Item key={index} item={item} onClick={() => setOnClick(index)} />
            ))}
          </div>
        </>
      )}
      {defeat && (
        <p className={"grid h-screen place-items-center text-5xl font-medium"}>
          Vous avez perdu !<a href={""}>REESSAYER</a>
        </p>
      )}
    </div>
  );
};

export default Home;
