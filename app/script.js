import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';


const formatTime = (value) => {
  let minutes = Math.floor(value % 3600 / 60);
  let seconds = Math.floor(value % 3600 % 60);

  let formatedSec = seconds < 10 ? '0' + seconds : seconds;
  let formatedMin = minutes < 10 ? '0' + minutes : minutes;

  return formatedMin + ':' + formatedSec;
};


const App = () => {
  const [status, setStatus] = useState('off');
  
  const [time, setTime] = useState(1200);

  const startTimer = () => {
    setStatus('work');
    setTime(1200);
  }

  const stopTimer = () => {
    setStatus('off');
  }

  const bellAudio = new Audio('./sounds/bell.wav');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(prevTime => prevTime - 1); 
    }, 1000);
    return () => {
      window.clearInterval(timer) ;
    };
  }, []);

  useEffect(() => {
    if(time <= 0 && status === 'work'){
      setStatus('rest');
      setTime(20);
      bellAudio.play();
    } else if (time <= 0 && status === 'rest'){
      startTimer();
      bellAudio.play();
    };
  })

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' ? 
      <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
      : null}
      {status === 'work' ? <img src="./images/work.png" /> : null}
      {status === 'rest' ? <img src="./images/rest.png" /> : null}
      {status === 'work' || status === 'rest' ? 
      <div className="timer">
        {formatTime(time)}
      </div>
      : null}
      {status === 'off' ? <button className="btn" onClick={() => startTimer()}>Start</button> : null}
      {status === 'work' || status === 'rest' ? <button className="btn" onClick={() => stopTimer()}>Stop</button> : null}
      <button className="btn btn-close" onClick={() => window.close()}>X</button>
    </div>
  )
}


render(<App />, document.querySelector('#app'));
