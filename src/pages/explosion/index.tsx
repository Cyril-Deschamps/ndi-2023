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

// Tableaux d'images pour les ennemis et les alliés
const Ennemie: StaticImageData[] = [
  cigarette,
  nucleaire,
  bouteille,
  toxique,
  petrole,
];
const Alie: StaticImageData[] = [arbre, earth, manchot, whale];

// Interface pour définir la structure d'un élément généré
interface GeneratedItem {
  image: StaticImageData;
  etat: string;
  clicked: boolean;
  position: { top: number; left: number };
}

// Composant pour afficher un élément généré
const Item: React.FC<ItemProps> = ({ image, onClick, clicked, position }) => {
  const [play] = useSound("explo.mp3");

  return (
    <Image
      alt={"Item"}
      className={`absolute object-fill w-20 h-20`}
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

// Fonction pour générer un élément avec une position aléatoire
const GenerateItem = ({
  Ennemie,
  Alie,
}: {
  Ennemie: StaticImageData[];
  Alie: StaticImageData[];
}): GeneratedItem => {
  const ennemieOrAlie = Math.random() < 0.5 ? "Ennemie" : "Alie";
  const sourceArray = ennemieOrAlie === "Ennemie" ? Ennemie : Alie;

  const rand = Math.floor(Math.random() * sourceArray.length);
  const etat = ennemieOrAlie;

  const position = {
    top: Math.round(75 + Math.random() * (window.innerHeight * 0.6 - 75)),
    left: Math.round(75 + Math.random() * (window.innerWidth - 175)),
  };

  return { image: sourceArray[rand], etat, clicked: false, position };
};

// Composant principal de l'application
const Home: React.FC = () => {
  const [items, setItems] = useState<GeneratedItem[]>([]); // État pour stocker les éléments générés
  const [score, setScore] = useState<number>(0); // État pour stocker le score

  // Effet qui se déclenche une seule fois au chargement de la page
  useEffect(() => {
    // Générer un tableau d'éléments et les stocker dans l'état
    const generatedItems = Array.from({ length: 10 }, () =>
      GenerateItem({ Ennemie, Alie }),
    );
    setItems(generatedItems);
  }, []);

  // Fonction appelée lorsqu'un élément est cliqué
  const setOnClick = (index: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const clickedItem = newItems[index];

      if (!clickedItem.clicked) {
        // Vérifiez si l'élément n'a pas déjà été cliqué
        if (clickedItem.etat === "Ennemie") {
          setScore((prevScore) => prevScore + 1); // Augmenter le score si c'est un ennemi
        } else if (clickedItem.etat === "Alie") {
          setScore((prevScore) => prevScore - 1); // Diminuer le score si c'est un allié
        }

        clickedItem.clicked = true; // Marquer l'élément comme cliqué

        // Vérifiez si l'image est "boom" et affichez-la pendant 2 secondes
        if (clickedItem.image === boom) {
          setTimeout(() => {
            // Générer une nouvelle image après 2 secondes
            newItems[index] = GenerateItem({ Ennemie, Alie });
            setItems(newItems);
          }, 2000);
        }
      }

      return newItems;
    });
  };

  // Rendu de l'interface
  return (
    <div>
      <div className={"score"}>Score: {score}</div>
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
    </div>
  );
};

export default Home;
