import { useState, useEffect } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [timer, setTimer] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const [selectedTime, setSelectedTime] = useState(10);


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
  
  const progressPercent = ((selectedTime - timer) / selectedTime) * 100;

  useEffect(() => {
    const savedName = localStorage.getItem('timerName');
    if (savedName) setName(savedName);
  }, []);

  useEffect(() => {
    let interval;
    
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);
      setIsDone(true);
      setMotivation(getRandomPhrase());
      setCompletedCount(prev => prev + 1);
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    localStorage.setItem('timerName', e.target.value);
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsDone(false);
    setTimer(selectedTime);
  };

  const reset = () => {
    setIsRunning(false);
    setIsDone(false);
    setName('');
    setTimer(selectedTime);

  };

  const tryAgain = () => {
    setTimer(selectedTime);
    setIsRunning(false);
    setIsDone(false);
    setMotivation('');
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold mb-6 text-center">Timer</h1>

      {completedCount > 0 && (
        <p className="text-green-600 mb-4">Завершено: {completedCount} раз </p>
      )}

      {!isDone ? (
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={handleNameChange}
            className="w-full p-2 border rounded mb-4"
          />

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(Number(e.target.value))}
            disabled={isRunning}
            className="w-full p-2 border rounded mb-4 disabled:bg-gray-200"
          >
            <option value={10}>10 секунд</option>
            <option value={20}>20 секунд</option>
            <option value={30}>30 секунд</option>
          </select>

           <div className="text-center">
              {isRunning && name ? (
                <p className="text-lg text-blue-600 mb-2">
                  {name}, осталось {timer} сек
                </p>
              ) : null}
              
            </div>
          
          {isRunning && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          )}

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
          <div className="text-6xl mb-4 animate-bounce">Congrats!</div>


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