import { useState, useEffect } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [timer, setTimer] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let interval;
    
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRunning(false);
      setIsDone(true);
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
          <button
            onClick={reset}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Cброс
          </button>
        </div>
      )}
    </div>
  );
}