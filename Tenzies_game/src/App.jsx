import React, { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = useState(0);
  const [bestTime, setBestTime] = useState(0);
  const [click, setClick] = useState(1);

  const bestScore = JSON.parse(localStorage.getItem("bestScore"));

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      const time = getTime();

      setBestTime((old) => time - old);

      if (bestScore === null || time - bestTime < bestScore) {
        localStorage.setItem("bestScore", JSON.stringify(time - bestTime));
      }
    }
  }, [dice]);

  function getTime() {
    const time = new Date();
    const sec = time.getSeconds();
    const min = time.getMinutes() * 60;
    return min + sec;
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setRolls((oldValue) => oldValue + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setBestTime(0);
      setClick(1);
      setTenzies(false);
      setDice(allNewDice());
      setRolls(0);
    }
  }

  function holdDice(id) {
    if (click === 1) {
      setBestTime(() => {
        return getTime();
      });
      setClick((old) => old + 1);
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
        <div className="dice-dots">
          <div className="dots-container">
            <div className="dice dot-1"></div>
            <div className="dice dot-2"></div>
            <div className="dice dot-3"></div>
            <div className="dice dot-4"></div>
            <div className="dice dot-5"></div>
            <div className="dice dot-6"></div>
          </div>
        </div>
      </button>
      <div className="scoreboard">
        <div className="rolls">No. of rolls: {rolls}</div>
        <div className="best-time">
          Time taken: {bestTime > 0 && tenzies ? ` ${bestTime}` : "--"} seconds
        </div>
        <div className="bestTime">
          Best time: {bestScore === null ? "--" : ` ${bestScore}`} seconds
        </div>
      </div>
    </main>
  );
}
