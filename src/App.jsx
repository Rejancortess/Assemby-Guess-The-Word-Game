import { useState } from 'react';
import Header from './components/Header';
import NoticeOne from './components/Notice-one';
import NoticeTwo from './components/Notice-two';
import NoticeGameOver from './components/Notice-three';
import { languages } from './languages';
import clsx from 'clsx';

function App() {
  const [word, setWord] = useState('REACT');
  const [guessLetters, setGuestLetters] = useState([]);
  const words = word.split('');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const letters = alphabet.toUpperCase().split('');

  const wrongGuestCount = guessLetters.filter(letter => !words.includes(letter)).length;
  console.log(wrongGuestCount);

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
  const guessWord = words.map((letter, index) => (
    <div
      key={index}
      className="flex h-20 w-20 items-center justify-center border-b-2 border-white bg-[#323232] text-4xl font-bold text-white"
    >
      {guessLetters.includes(letter) ? letter : ''}
    </div>
  ));

  const keyBoard = letters.map((letter, index) => {
    const isGuesed = guessLetters.includes(letter);
    const isCorrect = isGuesed && words.includes(letter);
    const isWrong = isGuesed && !words.includes(letter);
    return (
      <button
        onClick={() => handleClick(letter)}
        className={clsx(
          'h-15 w-15 cursor-pointer rounded-2xl border-2 border-white text-2xl font-bold hover:scale-105 active:scale-95',
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
  return (
    <>
      <Header />
      <NoticeOne />
      <section className="mt-10 flex w-100 flex-wrap items-center justify-center gap-2">{listOfLanguages}</section>
      <section className="mt-10 flex gap-1.5">{guessWord}</section>
      <section className="mt-15 flex w-200 flex-wrap justify-center gap-2">{keyBoard}</section>
      <button className="mt-10 rounded-lg border-1 border-white bg-[#11B5E5] px-20 py-5 text-3xl font-semibold active:scale-95">
        New Game
      </button>
    </>
  );
}

export default App;
