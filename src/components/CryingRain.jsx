import { useEffect, useState } from 'react';

export default function CryingRain() {
  const [tears, setTears] = useState([]);

  useEffect(() => {
    const createTears = () => {
      const tearEmojis = ['😭', '😢', '💧', '😿', '😪'];
      const newTears = [];

      for (let i = 0; i < 15; i++) {
        newTears.push({
          id: i,
          emoji: tearEmojis[Math.floor(Math.random() * tearEmojis.length)],
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 3,
        });
      }

      setTears(newTears);
    };

    createTears();

    const interval = setInterval(createTears, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {tears.map(tear => (
        <div
          key={tear.id}
          className="absolute text-4xl"
          style={{
            left: `${tear.left}%`,
            animationDelay: `${tear.delay}s`,
            animationDuration: `${tear.duration}s`,
            top: '-60px',
            animation: `fall ${tear.duration}s ${tear.delay}s infinite linear`,
          }}
        >
          {tear.emoji}
        </div>
      ))}
    </div>
  );
}
