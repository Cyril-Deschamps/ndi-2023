import React from "react";
import Image from "next/image";
import arbre from "../../assets/img/arbre.png";

const Home: React.FC = () => {
  function MyButton() {
    return <button>I'm a button</button>;
  }

  function Arbre() {
    return (
      <Image
        alt={"Arbre"}
        className={"absolute top-0 left-0 object-fill w-20 h-20"}
        src={arbre}
      />
    );
  }

  const item = "Bonjour les homosapiens";

  return (
    <div>
      <h1>{item}</h1>
      <MyButton />
      <Arbre />
    </div>
  );
};

export default Home;
