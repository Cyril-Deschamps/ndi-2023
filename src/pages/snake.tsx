import questionsData from "./questions.json";
import popupMessages from "./popupMessage.json";
import React, { useEffect, useRef, useState } from "react";
import AppleLogo from "../assets/img/icons/applePixels.png";
import useInterval from "../services/snake/useInterval";
import Image from "next/image";
import dynamic from "next/dynamic";

const canvasX = 700;
const canvasY = 700;
const initialSnake = [
  [3, 3],
  [2, 3],
];
const initialApple = [5, 5];
const scale = 50;
const timeDelay = 150;

function Snake() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isFruitLoaded, setIsFruitLoaded] = useState(false);
  const [extraSquares, setExtraSquares] = useState< { id: number; text: string; isCorrect: boolean }[]>([]);
  const [isAlreadySquare, setIsAlreadySquare] = useState<boolean>(false);
  const [squareNumber, setSquareNumber] = useState<number>(0);
  const [questionText, setQuestionText] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [boutonVisible, setBoutonVisible] = useState(true);
  const [pause, setPause] = useState<boolean>(false);
  const [popupContent, setPopupContent] = useState<{
    title: string;
    message: string;
    isCorrect: boolean;
  } | null>(null);

  useInterval(() => (pause ? null : runGame()), delay);

  useEffect(() => {
    const fruit = document.getElementById("fruit") as HTMLImageElement;

    if (canvasRef.current && isFruitLoaded) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#a3d001";
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver, isFruitLoaded]);

  function handleSetScore() {
    if (score > Number(localStorage.getItem("snakeScore"))) {
      localStorage.setItem("snakeScore", JSON.stringify(score));
    }
  }

  const play = () => {
    setBoutonVisible(false);
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
    // Ajoutez cette ligne pour masquer le bouton après le clic
  };

  function checkCollision(head: number[]) {
    for (let i = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * scale >= canvasX) return true;
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function appleAte(newSnake: number[][]) {
    const coord = apple.map(() =>
      Math.floor((Math.random() * canvasX) / scale),
    );
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      const newApple = coord;
      setScore(score + 1);
      setApple(newApple);
      return true;
    }
    return false;
  }

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    newSnake.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
      handleSetScore();
      setBoutonVisible(true);
      setExtraSquares([]);
      setSquareNumber(0);
      setQuestionText("");
    }
    if (!appleAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      changeDirection(e);
    };

    document.body.addEventListener("keydown", handleKeyPress);

    return () => {
      document.body.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function changeDirection(e: React.KeyboardEvent<HTMLCanvasElement>) {
    switch (e.key) {
      case "ArrowLeft":
        setDirection([-1, 0]);
        break;
      case "ArrowUp":
        setDirection([0, -1]);
        break;
      case "ArrowRight":
        setDirection([1, 0]);
        break;
      case "ArrowDown":
        setDirection([0, 1]);
        break;
    }
  }

  const showQuestions = () => {
    const updatedSquares = extraSquares.map((square) => ({
      ...square,
      text:
        questionsData.find((question) => question.id === square.id)?.text || "",
      isCorrect:
        questionsData.find((question) => question.id === square.id)
          ?.isCorrect || false,
    }));
    setExtraSquares(updatedSquares);

    setQuestionText("Parmi ces idées, laquelle est vrai ?");
  };

  const handleButtonClick = (isCorrect: boolean): void => {
    const popupId = isCorrect ? 1 : 4;
    const popupData = popupMessages.find((popup) => popup.id === popupId);
    if (popupData) {
      setShowPopup(true);
      setPopupContent({
        title: popupData.title,
        message: popupData.message,
        isCorrect,
      })
    }
  };

  const handlePopupClose = (): void => {
    // Fermer la pop-up
    setShowPopup(false);
    // Effacer le contenu de la pop-up
    setPopupContent(null);
    // Effacer les carrés
    setExtraSquares([]);
    setSquareNumber(squareNumber - 3);
    setQuestionText("");
  };

  useEffect(() => {
    if (squareNumber >= 3) {
      showQuestions();
    }
  }, [squareNumber]);

  useEffect(() => { 
    const count = score % 3;
    if (score != 0){
      popCarre();
      if (count === 0 && score != 0) {
        setPause(true);
      }

    }
  }, [score]);

  const popCarre = () => { //Fait apparaitre un carré de question
    if (!isAlreadySquare) {
      setIsAlreadySquare(true);
    }

    if (squareNumber < 3) { 
      setSquareNumber(squareNumber + 1);
      const lastSquare = extraSquares[extraSquares.length - 1]?.id || 0;
      setExtraSquares([
        ...extraSquares,
        { id: lastSquare + 1, text: "", isCorrect: false },
      ]);
    }
  };

  if (typeof localStorage === "undefined") return <></>;

  return (
    <>
      <div>
        <Image
          alt={"fruit"}
          className={"hidden"}
          id={"fruit"}
          onLoad={() => setIsFruitLoaded(true)}
          src={AppleLogo}
          width={"30"}
        />
        <canvas
          ref={canvasRef}
          className={"mt-20 ml-20 mb-20 fixed top-43 bg-red-900"}
          height={`${canvasY}px`}
          onKeyDown={(e) => changeDirection(e)}
          tabIndex={0}
          width={`${canvasX}px`}
        />
        {gameOver && (
          <div
            className={
              "fixed top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl"}>
            Game Over
          </div>
        )}
        {boutonVisible && (
          <button
            className={
              "fixed top-1/2 left-1/2 text-white bg-purple-800 border-2 border-white p-10 text-sm shadow-md font-bold tracking-wider uppercase font-cursive"
            }
            onClick={play}
          >
            Play
          </button>
        )}
      </div>

      <div>
        <div className={"extra-squares-container"}>
          {isAlreadySquare &&
            extraSquares.map((square) => (
              <button
                key={square.id}
                className={"extra-square"}
                onClick={() => handleButtonClick(square.isCorrect)}
              >
                {square.text}
              </button>
            ))}
        </div>
        {questionText && <div className={"question"}>{questionText}</div>}
        {showPopup && popupContent && (
          <div
            className={
              popupContent.isCorrect ? "correct-popup" : "incorrect-popup"
            }
          >
            <div className={"popup"}>
              <h2>{popupContent.title}</h2>
              <p>{popupContent.message}</p>
              <button onClick={handlePopupClose}>Retour au menu principal</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Snake));
