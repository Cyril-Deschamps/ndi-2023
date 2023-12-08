import React, { useState, useEffect } from "react";
import questionsData from "./questions.json";
import popupMessages from "./popupMessage.json";

const Snake: React.FC = () => {
  const [extraSquares, setExtraSquares] = useState<
    { id: number; text: string; isCorrect: boolean }[]
  >([]);
  const [isAlreadySquare, setIsAlreadySquare] = useState<boolean>(false);
  const [squareNumber, setSquareNumber] = useState<number>(0);
  const [questionText, setQuestionText] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupContent, setPopupContent] = useState<{
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (squareNumber >= 3) {
      showQuestions();
    }
  }, [squareNumber]);

  const popCarre = () => {
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
    const popupId = isCorrect ? 1 : 2;
    const popupData = popupMessages.find((popup) => popup.id === popupId);

    if (popupData) {
      setShowPopup(true);
      setPopupContent(popupData);
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

  return (
    <div>
      <div className={"center"}>
        <button onClick={popCarre}>Cliquer</button>
      </div>
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
            <button onClick={handlePopupClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Snake;
