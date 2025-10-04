import { useState } from 'react';
import Header from './components/Header';
import NoticeOne from './components/Notice-one';
import NoticeTwo from './components/Notice-two';
import NoticeGameOver from './components/Notice-three';
import CryingRain from './components/CryingRain';
import { languages } from './languages';
import clsx from 'clsx';
import { getFarewellText, randomWords } from './utils';
import Confetti from 'react-confetti';

function App() {
  const [word, setWord] = useState(() => randomWords());
  const [guessLetters, setGuestLetters] = useState([]);
  let words = word.split('');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const letters = alphabet.toUpperCase().split('');

  const wrongGuestCount = guessLetters.filter(letter => !words.includes(letter)).length;
  const isGameWon = words.every(letter => guessLetters.includes(letter));
  const isGameLost = wrongGuestCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessletter = guessLetters[guessLetters.length - 1];
  const isLastGuessletterWrong = lastGuessletter && !words.includes(lastGuessletter);
  const handleClick = letter =>
    setGuestLetters(prevLetter => (prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]));
  const listOfLanguages = languages.map((language, index) => {
    const isLost = index < wrongGuestCount;
    return (
      <span
        key={index}
        className={clsx('relative rounded-lg p-2 font-bold', isLost && 'languages')}
        style={{
          background: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });
  const guessWord = words.map((letter, index) => {
    console.log(letter);
    return (
      <div
        key={index}
        className={clsx(
          'flex h-20 w-20 items-center justify-center border-b-2 border-white bg-[#323232] text-4xl font-bold text-white'
        )}
      >
        <span className={clsx(!guessLetters.includes(letter) && isGameLost && 'text-red-400')}>
          {guessLetters.includes(letter) ? letter : isGameOver && letter}
        </span>
      </div>
    );
  });

  const keyBoard = letters.map((letter, index) => {
    const isGuesed = guessLetters.includes(letter);
    const isCorrect = isGuesed && words.includes(letter);
    const isWrong = isGuesed && !words.includes(letter);
    return (
      <button
        disabled={isGameOver}
        onClick={() => handleClick(letter)}
        className={clsx(
          'h-15 w-15 cursor-pointer rounded-2xl border-2 border-white text-2xl font-bold hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
          !isGuesed && 'bg-[#FCBA29]',
          isCorrect && 'bg-[#10A95B]',
          isWrong && 'bg-[#EC5D49]'
        )}
        key={index}
      >
        {letter}
      </button>
    );
  });

  const notice = () => {
    if (isLastGuessletterWrong) {
      return <NoticeOne lang={getFarewellText(languages[wrongGuestCount - 1].name)} />;
    } else {
      return <div className="mt-10 h-25"></div>;
    }
  };

  function resetGame() {
    setGuestLetters(() => []);
    setWord(() => randomWords());
  }
  return (
    <>
      {isGameLost && <CryingRain initialVelocityY={4} gravity={0.3} width={1620} />}
      {isGameWon && <Confetti />}
      <Header />
      {isGameOver ? isGameWon ? <NoticeTwo /> : <NoticeGameOver /> : notice()}
      <section className="mt-10 flex w-100 flex-wrap items-center justify-center gap-2">{listOfLanguages}</section>
      <section className="mt-10 flex gap-1.5">{guessWord}</section>
      <section className="mt-15 flex w-200 flex-wrap justify-center gap-2">{keyBoard}</section>
      {isGameOver && (
        <button
          onClick={() => resetGame()}
          className="mt-10 rounded-lg border-1 border-white bg-[#11B5E5] px-20 py-5 text-3xl font-semibold active:scale-95"
        >
          New Game
        </button>
      )}
    </>
  );
}

export default App;
