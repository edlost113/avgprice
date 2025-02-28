import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import setRandomInterval from '../../utils'
import soundFile from '../../assets/craig.mp3'; // Make sure to replace this with the actual path to your sound file

export const Sound = () => {
  let [playbackRate, setPlaybackRate] = useState(0.75);

  const [play] = useSound(soundFile, {
    playbackRate,
    interrupt: true,
  });

  let playSound: Boolean = false;
  useEffect(() => {
    if (!playSound) {
      playSound = true;
      setRandomInterval(() => {
        setPlaybackRate(playbackRate + 0.1);
        const timestamp = new Date().toLocaleString();
        console.log(timestamp);
        play();
      }, 30, 145);
    }
  }, [ play]);

  return (
    <div id="sound">
    </div>
  );
};
