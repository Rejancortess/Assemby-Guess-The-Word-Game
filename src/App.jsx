import { use, useState } from 'react';
import Header from './components/Header';
import NoticeOne from './components/Notice-one';
import NoticeTwo from './components/Notice-two';
import NoticeGameOver from './components/Notice-three';
import { languages } from './languages';

function App() {
  const [word, setWord] = useState('REACT');
  const words = word.split('');
  console.log(words);
  // prettier-ignore
  const letters = ["A","B","C","D","E","F","G","H","I","J","K","L",
    "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  console.log(letters);
  return (
    <>
      <Header />
      <NoticeOne />
      <section className="mt-10 flex w-100 flex-wrap items-center justify-center gap-2">
        {languages.map((language, index) => (
          <span
            key={index}
            className="rounded-lg p-2 font-bold"
            style={{
              background: language.backgroundColor,
              color: language.color,
            }}
          >
            {language.name}
          </span>
        ))}
      </section>
      <section className="mt-10 flex gap-1.5">
        {words.map((word, index) => (
          <div
            key={index}
            className="flex h-20 w-20 items-center justify-center border-b-2 border-white bg-[#323232] text-4xl font-bold text-[#F9F4DA]"
          >
            {word}
          </div>
        ))}
      </section>
      <section className="mt-15 flex w-220 flex-wrap justify-center gap-2">
        {letters.map((letter, index) => (
          <button
            className="h-20 w-20 cursor-pointer rounded-2xl border-2 border-white bg-[#FCBA29] text-3xl font-bold hover:scale-105 active:scale-95"
            key={index}
          >
            {letter}
          </button>
        ))}
      </section>
    </>
  );
}

export default App;
