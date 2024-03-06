import React, { useState, useEffect, useRef } from 'react';

export const DrumMachineApp = () => {
  const drumPads = [
    { key: 'Q', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', description: 'Heater 1' },
    { key: 'W', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', description: 'Heater 2' },
    { key: 'E', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', description: 'Heater 3' },
    { key: 'A', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', description: 'Heater 4' },
    { key: 'S', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', description: 'Clap' },
    { key: 'D', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', description: 'Open-HH' },
    { key: 'Z', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', description: 'Kick-n`-Hat' },
    { key: 'X', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', description: 'Kick' },
    { key: 'C', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', description: 'Closed-HH' },
  ];

  const [displayText, setDisplayText] = useState('');
  const audioRefs = useRef([]);

  const handleClick = (drumPad) => {
    setDisplayText(drumPad.description);
    const audio = audioRefs.current[drumPad.key];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const drumPad = drumPads.find(pad => pad.key === event.key.toUpperCase());
      if (drumPad) handleClick(drumPad);
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  

  return (
    <div id="drum-machine">
      <h1>Drum Machine</h1>
      <div id="display">
        {displayText}
      </div>
      {drumPads.map((drumPad, index) => (
        <button 
          key={index} 
          id={`drum-pad-${drumPad.key}`} 
          className="drum-pad"
          onClick={() => handleClick(drumPad)}
        >
          {drumPad.key}
          <audio 
            ref={ref => audioRefs.current[drumPad.key] = ref}
            id={drumPad.key} 
            className="clip" 
            src={drumPad.url}
          />
        </button>
      ))}
    </div>
  )
}