import { useState, useEffect } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [timer, setTimer] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [motivation, setMotivation] = useState('');


  const motivationPhrases = [
    'Хорош хорош',
    'Невозможно!',
    'Че за лив этот тигр',
    'Красаучик'
  ];

  const getRandomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * motivationPhrases.length);
    return motivationPhrases[randomIndex];
  };
  
  useEffect(() => {
    let interval;
    
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRunning(false);
      setIsDone(true);
      setMotivation(getRandomPhrase());

    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startTimer = () => {
    setIsRunning(true);
    setIsDone(false);
  };

  const reset = () => {
    setTimer(10);
    setIsRunning(false);
    setIsDone(false);
    setName('');
  };

  const tryAgain = () => {
    setTimer(10);
    setIsRunning(false);
    setIsDone(false);
    setMotivation('');
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold mb-6 text-center">Timer</h1>
      
      {!isDone ? (
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

           <div className="text-center">
              {isRunning && name ? (
                <p className="text-lg text-blue-600 mb-2">
                  {name}, осталось {timer} сек
                </p>
              ) : null}
              
            </div>
          
          <h1 className="text-4xl font-bold text-center mb-4">
            {timer}
          </h1>
          
          <button
            onClick={startTimer}
            disabled={!name || isRunning}
            className="w-full bg-blue-500 text-white p-2 rounded mb-2 disabled:bg-gray-300"
          >
            Старт Таймера
          </button>
          
      
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl mb-4">
            Ты справился, {name}!
          </h2>
           <p className="text-lg text-purple-600 font-medium mb-6">
              {motivation}
            </p>
          <div className="space-y-3">
              <button
                onClick={tryAgain}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
              >
                 Попробовать ещё раз
              </button>
              
              <button
                onClick={reset}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg"
              >
                Сброс
              </button>
            </div>
        </div>
      )}
    </div>
  );
}