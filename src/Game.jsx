import { useState, useEffect } from "react";
import './App.css'
import Derrota from './assets/derrota.png';
import Empate from './assets/empate.png';
import Victoria from './assets/victoria.png';
import Papel from './assets/papel.png';
import Piedra from './assets/piedra.png';
import Tijera from './assets/tijera.png';

const options = [
  { id: 0, name: "Piedra", emoji: Piedra, beats: [2] },
  { id: 1, name: "Papel", emoji: Papel, beats: [0] },
  { id: 2, name: "Tijera", emoji: Tijera, beats: [1] },
];

const getResult = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return 0;
  }

  if (
    userChoice !== null &&
    computerChoice !== null &&
    options[userChoice]?.beats.includes(computerChoice)
  ) {
    return 1;
  }

  return 2;
};


function OptionButton({ option, handlePlay, disabled }) {
  return (
    <div
      className="option-container"
      disabled={disabled}
      onClick={() => handlePlay(option.id)}
      title={option.name}
    >
      <img clasName="option-img" src={option.emoji} alt="emoji de selección" />
    </div>
  );
}

function useChoices() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (userChoice !== null) {
      setUserMessage(
        `Elegiste  ${options[userChoice]?.name}`
      );
    }
  }, [userChoice]);

  useEffect(() => {
    if (computerChoice !== null) {
      setComputerMessage(
        `El ordenador eligió  ${options[computerChoice]?.name}`
      );
    }
  }, [computerChoice]);

  const handlePlay = (choice) => {
    setUserChoice(choice);
    setDisabled(true);
    const randomChoice = Math.floor(Math.random() * 5);

    setTimeout(() => {
      setComputerChoice(randomChoice);
    }, 1500);

    setTimeout(() => {
      setResult(getResult(choice, randomChoice));
    }, 3000);

    clearTimeout();
  };

  const reset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
  };

  return {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset,
  };
}

export default function Game() {
  const {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset,
  } = useChoices();

  return (
    <div className="container">
      <div className="card-container">
        <div className="title-container">
          <h1 className="text-3xl mb-4 text-center font-bold">¡A jugar!</h1>
          <span>Selecciona una opción y espera el turno del ordenador</span>
        </div>
        <div className="row-container">
          {options.map((option) => (
            <OptionButton
              key={option.id}
              option={option}
              handlePlay={handlePlay}
              disabled={disabled}
            />
          ))}
        </div>
        <div className="result-container">
          {userChoice !== null && <p className="text-xl mt-4">{userMessage}</p>}
          {computerChoice !== null && (
            <p className="text-xl mt-4">{computerMessage}</p>
          )}
          {result !== null && (
            <div>
              {result === 0 && 
              <div className="result">
                <img src={Empate} alt="emoji de empate" />
                <p className="text-xl mt-4"> Empate</p>
              </div>
              }
              {result === 1 && (
                <div className="result">
                  <img src={Victoria} alt="emoji de victoria" />
                  <p className="text-xl mt-4">
                    Has ganado con {userChoice !== null && options[userChoice]?.name} contra{" "}
                    {computerChoice !== null && options[computerChoice]?.name}
                  </p>
                </div>
              )}
              {result === 2 && (
                <div className="result">
                  <img src={Derrota} alt="emoji de derrota" />
                  <p className="text-xl mt-4">
                    Has perdido con {userChoice !== null && options[userChoice]?.name} contra{" "}
                    {computerChoice !== null && options[computerChoice]?.name}
                  </p>
                </div>
              )}
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-black font-semibold py-2 px-4 mt-4 border-b-4 border-yellow-700"
                onClick={reset}
              >
                Jugar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}